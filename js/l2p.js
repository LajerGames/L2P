define(['jquery', 'api', 'game/options', 'facebook', 'bootstrap'], function ($, api, options) {
	function goBack(e, doGoBack) {
		if(doGoBack !== false) {
			window.history.back();
		}
	}
	function getAjax(urlAjax, data, callback) {
		if(data) {
			$.post(urlAjax, data, callback);
		} else {
			$.get(urlAjax, callback);
		}
	}

	function FBAuth(response) {
		fbUser	= response;

		// If we are connected to Facebook
		if(response.status === 'connected') {
			// If the logged in FacebookUser is the same as the logged in MagicTune users
			if(+response.authResponse.userID !== L2P_global.fb_id) {
				// Only autologin once per session
				var hasTriedAutologin	= sessionStorage.getItem('l2p_fb_autologin');
				if(hasTriedAutologin !== 'true') {
					require(['fM'], function (fM) {
						// Get info about the user
						FB.api('/me', function (user) {
							// Redirect to the Login/UserCreate page
							// We use the same page for both - if the user has given MagicTune access to Facebook, we know we are allowed to create a user
							fM.link.navigate('/user/create/', 'Magic-Tune', {
								title:	'Magic-Tune',
								data:	{
									mode:			'login',
									type:			'fb',
									user:			user,
									accessToken:	fbUser.authResponse.accessToken
								}
							});
						});
					});
				}

				// Make sure we only autologin once
				sessionStorage.setItem('l2p_fb_autologin', 'true');
			}
		}

		// "Subscribe" to changes in the user logged in to facebook
		FB.Event.subscribe('auth.authResponseChange', FBAuth);
	}

	// Initialize Facebook
	FB.init({
    	appId      : '178214939022167',
    	channelUrl : '//magic-tune.com/channel.php',
    	status:		true,
    	cookie:		true
  	});
  	FB.getLoginStatus(FBAuth);

	var	gameController,
		svgContainer,
		tuner,
		sound,
		playlist,
		socket,
		$controller,
		$toggleGame,
		tour,
		fbUser	= {};

	function Render($container, loader, render, kill) {
		this.$container	= $container;
		this.loader		= loader;
		this.render		= render;
		this.kill		= kill;
		this.updates	= [];

		this.loader.call(this);
	}
	Render.prototype.reload	= function () {
		var	render	= this;
		this.render.call(this);
		this.updates.forEach(function (update) {
			update.call(render);
		});
	};
	Render.prototype.kill	= function () {
		this.kill.call(this);
	};
	Render.prototype.onUpdate	= function (func) {
		this.updates.push(func);
	};

	function ControllerSet(type) {
		if($toggleGame === undefined) {
			if($controller === undefined) {
				$controller	= $('.ContentBoxGameControl');
			}
			$toggleGame	= $controller.find('td[data-action="toggle-game"]');
		}
		if(type === 'play') {
			$toggleGame.removeClass('can_pause');
		} else if(type === 'restart') {
			$toggleGame.removeClass('can_pause');
		} else if(type === 'pause') {
			$toggleGame.addClass('can_pause');
		}
	}

	var	L2P	= {
		$modal:	undefined,
		gameController:	undefined,
		dialog:	{
			action:	function (url, title, html, color, submitText, script) {
				var	requireScripts	= ['fM', 'text!templates/modal.html'];

				// If this dialog has a js-file we need to include
				if(script) {
					requireScripts.push('dialog/action/'+script);
				}
				require(requireScripts, function (fM, modalText, infoScript) {
					// Set up the Modal
					L2P.$modal	= $(modalText).addClass('modal-action');
					L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
					L2P.$modal.find('.modal-body').html(html);

					// Set the submit button
					if(submitText === '') {
						L2P.$modal.find('.modal-footer button.btn-primary').remove();
					} else {
						L2P.$modal.find('.modal-footer button.btn-primary').html(submitText);
					}
					L2P.$modal.find('button.btn[data-dismiss]').text(L2P_global.lang.global_button_close);

					// Parse the modal-content with some Facebook functions
					FB.XFBML.parse(L2P.$modal.find('.modal-body')[0]);

					// Crappy fix for correct posting of the form
					var	action	= url || document.location.pathname;
					if(location.search.substring(1) !== '')
					{
						action += "?" + location.search.substring(1);
					}

					L2P.$modal.attr('action', action).attr('method', 'post');

					// Post the form via Ajax
					function onSubmit(e) {
						e.preventDefault();

						var	data	= fM.form.getElements.call(this);

						// Make sure we don't close the modal multiple times
						L2P.$modal.off('hide.bs.modal');
						// Post the form
						fM.link.navigate(L2P.$modal.attr('action'), 'Magic Tune', {
							title:	'Magic Tune',
							data:	data
						});
					}

					L2P.$modal
						.on('submit', onSubmit);

					// Fix/Hack for not opening/closing the modal multiple times
					L2P.$modal
						.on('hide.bs.modal', function (e) {
							if(!$(e.target).hasClass('tour-step-backdrop')) {
								fM.link.navigate('/');
							}
						})
						.on('shown.bs.modal', function (e) {
							$('.modal-backdrop').on('click', function (e) {
								L2P.$modal.modal('hide');
							});
						});

					// Autofocus first field
					fM.form.autofocus(L2P.$modal);

					// Update our history
					fM.link.navigated(url, title, {
						is_dialog:	true
					});

					// Set the back-button (if needed)
					var	parent	= fM.link.getParent();
					if(parent && parent.is_dialog) {
						L2P.$modal
							.find('.modal-header-back-icon')
								.addClass('modal-header-back-icon--clickable')
								.on('click', function () {
									window.history.back();
								});
					}

					// Show the modal
					L2P.$modal.modal('show');

					// Show any validation errors
					L2P.form.inputValidation.error(null, L2P.$modal);

					// If we have an extra script, run it now
					if(infoScript) {
						infoScript(L2P.$modal);
					}

					// If we are on a tour, go to next step
					if(tour && tour.tour) {
						tour.tour.next();
					}
				});
			},
			info: function (url, title, html, color, buttons, script) {
				var	requireScripts	= ['fM', 'text!templates/info.html'];

				// If this dialog has a js-file we need to include
				if(script) {
					requireScripts.push('dialog/info/'+script);
				}
				require(requireScripts, function (fM, modalText, infoScript) {
					// Set up the Modal
					L2P.$modal	= $(modalText).addClass('modal-info');
					L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
					L2P.$modal.find('.modal-body').html(html);
					var	$modalFooter	= L2P.$modal.find('.modal-footer');

					// Set the buttons
					if(buttons) {
						buttons.forEach(function (button) {
							$modalFooter.prepend('<button class="btn btn-default">'+button+'</button>');
						});
					}
					L2P.$modal.find('button.btn[data-dismiss]').text(L2P_global.lang.global_button_close);

					// Update our history
					fM.link.navigated(url, title, {
						is_dialog:	true
					});

					// Fix/Hack for not opening/closing the modal multiple times
					L2P.$modal
						.on('hide.bs.modal', function (e) {
							L2P.$modal.off('hide.bs.modal');

							if(!$(e.target).hasClass('tour-step-backdrop')) {
								fM.link.navigate('/');
							}
						})
						.on('shown.bs.modal', function (e) {
							$('.modal-backdrop').on('click', function (e) {
								L2P.$modal.modal('hide');
							});
						});

					// Set the back-button (if needed)
					var	parent	= fM.link.getParent();
					if(parent && parent.is_dialog) {
						L2P.$modal
							.find('.modal-header-back-icon')
								.addClass('modal-header-back-icon--clickable')
								.on('click', function () {
									window.history.back();
								});
					}

					// Show the modal
					L2P.$modal.modal('show');

					// If we have an extra script, run it now
					if(infoScript) {
						infoScript(L2P.$modal);
					}

					// If we are on a tour, go to next step
					if(tour && tour.tour) {
						tour.tour.next();
					}
				});
			},
			game: function (url, title, data, type, octave, callback) {
				var	$body_container	= $('body'),
					$game_container	= $('#game_container'),
					then;

				require(['fM', 'text!templates/game.html', 'game/game-controller', 'game/sound', 'sound-input', 'compass', 'underscore-min'], function (fM, gameText, GameController, Sound, SoundInput, Compass) {
					var	generate	= !L2P.gameController,
						$compassBox	= $('div.ContentBoxGameCompass'),
						compass		= new Compass($compassBox),
						state		= fM.link.getCurrentNavigate() || {},
						// Get some info from the url
						urlItems	= (url || location.href).split('/'),
						fingerpos	= urlItems.length >= 5 ? (/[0-9]+/.test(urlItems[4]) ? +/[0-9]+/.exec(urlItems[4])[0] : null) : null;

					// Reset the text in the Song and Scale container-header
					L2P.resetBoxText($('#song_title'));
					L2P.resetBoxText($('#scale_title'));

					// Mark our history as is_game
					state.is_game	= true;

					// Insert the svg-elements (if first time)
					if(generate) {
						$game_container.html(gameText);
					}

					// Update our html, so it will show the game
					$body_container.addClass('ShowGame');
					$body_container.addClass(type);
					$body_container.removeClass(type === 'song' ? 'scale' : 'song');

					// Find some elements
					svgContainer	= $game_container.find('#svg_container')[0];
					if($controller === undefined) {
						$controller	= $('.ContentBoxGameControl');
					}
					if($toggleGame === undefined) {
						$toggleGame	= $controller.find('td[data-action="toggle-game"]');
					}
					var	$speed		= $controller.find('input[name="bpm"]'),
						$speedShow	= $game_container.find('#speedShow'),
						$startGame	= $game_container.find('#startGame'),
						$stopGame	= $game_container.find('#stopGame'),
						$game_title	= type === 'song' ? $('#song_title') : $('#scale_title');

					// Set the game-title
					$game_title.html(title);

					// Generate the gameController and Sound
					if(generate) {
						if(!sound) {
							sound	= new Sound();
						}

						L2P.gameController			= new GameController(svgContainer);
						L2P.gameController.sound	= sound;
					}

					// Reset any edit-info on the gameController
					L2P.gameController.isEdit	= false;
					L2P.gameController.edit		= null;

					// Reset our compass
					compass.setTone(options.tones.names[4]['A']);
					compass.enable();
					L2P.gameController.compass	= compass;

					$speed.on('change', function () {
						L2P.gameController.setGameSpeed(+this.value);
					});
					if(generate) {
						// Subscribe to some events
						$(L2P.gameController).on({
							// Update the speed in the visual box
							gameLoadSpeedChange:	function (e, speed) {
								$speed.val(speed).trigger('change');
							},
							gameEnd:	function (e, gameInfo) {
								var	currentState	= fM.link.getCurrent() || {};

								if(L2P.gameController.isEdit) {
									L2P.gameController.moveToTact(-1);
								} else {
									// If we didn't come from a playlist, we just go to statistics
									if(!currentState || !currentState.from_playlist) {
										api.get.statistic_uuid(function (data) {
											fM.link.navigate('/user/'+L2P_global.username+'/statistics/'+data.uuid+'/');
										}, {
											game_history_ids:	gameInfo.game_history_id
										});
									}
								}

								// Update the play/pause/restart button
								ControllerSet('restart');
							}
						});

						$startGame.on('click', $.proxy(L2P.gameController.startGame, L2P.gameController));
						$stopGame.on('click', $.proxy(L2P.gameController.stopGame, L2P.gameController));
						$toggleGame.on('click', function (e) {
							if(L2P.gameController.game && !L2P.gameController.game.running) {
								L2P.gameController.startGame();

								// Update the play/pause/restart button
								ControllerSet('pause');
							} else {
								L2P.gameController.stopGame();

								// Update the play/pause/restart button
								ControllerSet('play');
							}
						});
					}

					// Update the play/pause/restart button
					ControllerSet('play');

					// Import the game into the gameController
					L2P.gameController.importGame(data, title, octave, fingerpos);
					// Update the permlink in the gameController
					if(url) {
						L2P.gameController.permlink	= url.match(/\/game\/([^\/]+)/g)[0].substr(6);
					} else {
						L2P.gameController.permlink	= location.href.match(/\/game\/([^\/]+)/g)[0].substr(6);
					}

					if(generate) {
						// Subscribe to soundInput
						tuner	= new SoundInput(function (e) {
							// console.log(e);
						}, $.proxy(L2P.gameController.soundInput, L2P.gameController), $.proxy(L2P.gameController.expectedTone, L2P.gameController));
						$(tuner).on('tick', $.proxy(L2P.gameController.soundInput, L2P.gameController));

						$(L2P).trigger('got_tuner', [tuner]);
					}

					state.is_game	= true;
					fM.link.navigated(url, title, state);

					// State comes from the playlist and describe some options for the game
					if(state) {
						if(state.autostart) {
							L2P.gameController.useCountdown	= state.use_countdown || state.use_countdown === undefined;
							L2P.gameController.startGame();
						}
						if(state.onstart) {
							$(L2P).trigger(state.onstart, [L2P.gameController]);
						}
					}

					// If we should edit
					if(urlItems[3] === 'edit') {
						L2P.create();
					} else if(L2P_global.is_god) {
						$(window)
							.off('keyup', L2P.game_key)
							.on('keyup', L2P.game_key);
					}

					if(callback) {
						callback(L2P.gameController);
					}
				});
			}
		},
		game_key:	function (e) {
			if(e.altKey && e.ctrlKey && e.which === 69) {
				$(window).off('keyup', L2P.game_key);

				require(['fM'], function (fM) {
					fM.link.navigate('/game/'+L2P.gameController.permlink+'/edit/');
				});
			}
		},
		facebook:	{
			login:	function (callback) {
				// Will login or ask for permissions
				FB.login(function (response) {
					fbUser	= response;
					callback(fbUser);
				}, {scope: 'email'});
			},
			api:	FB.api
		},
		form:	{
			inputValidation:	{
				// Will show validation errors for a form
				error:	function (inputName, context) {
					$('input[data-content][data-content!=""]' + (inputName ? '[name="'+inputName+'"]' : ''), context || 'body').each(function () {
						var	that		= this,
							clientRects	= this.getClientRects();

						if(clientRects.length > 0) {
							var	placement	= (clientRects[0].right + 240) > document.width ? 'left' : 'right';

							$(this).popover({
								trigger:	'focus',
								placement:	placement,
								container:	'body',
								template:	'<div class="popover validation-error"><div class="arrow"></div><div class="popover-content"><p></p></div></div>'
							}).popover('show');
						} else { // We most sure have a dialog
							if(inputName === undefined) { // Only do this once
								setTimeout(function () {
									L2P.form.inputValidation.error(that.name);
								}, 200);
							}
						}
					});
				}
			}
		},
		// Will reset a container to its original text
		resetBoxText:	function ($box) {
			$box.html($box.attr('data-default-text'));
		},
		navigate:	{
			// Navigate to frontpage
			home:	function (e) {
				var	$body_container		= $('body'),
					$CenteringContainer	= $('#CenteringContainer'),
					title				= $CenteringContainer.attr('data-default-title');

				require(['fM'], function (fM) {
					// Reset some titles
					L2P.resetBoxText($('#song_title'));
					L2P.resetBoxText($('#scale_title'));
					$body_container.removeClass('ShowGame');
					$body_container.removeClass('song');
					$body_container.removeClass('scale');

					fM.link.navigated('/', title, {
						title:	title
					});
				});

				// Stop or continue the tour
				if(tour && !tour.callback('/')) {
					tour.kill();
				} else if(tour && tour.tour) {
					tour.tour.next();
				}
			},
			// Start guided tour
			guided_tour:	function (e) {
				var	$body_container		= $('body');

				L2P.resetBoxText($('#song_title'));
				L2P.resetBoxText($('#scale_title'));
				$body_container.removeClass('ShowGame');
				$body_container.removeClass('song');
				$body_container.removeClass('scale');

				L2P.guided_tour();
			},
			url:	function (url, data) {
				var	that	= this,
					urlAjax	= '/dialog'+url;

				require(['fM'], function (fM) {
					var	current	= fM.link.getCurrentNavigate();
					data	= data || current && current.data;

					getAjax(urlAjax, data, function (data) {
						switch(data.dialogType) {
							case 'action':
								if(tour && !tour.callback(url)) {
									tour.kill();
								}

								L2P.dialog.action(url, data.title, data.body, data.color, data.submitText, data.script);
								break;
							case 'info':
								if(tour && !tour.callback(url)) {
									tour.kill();
								}

								L2P.dialog.info(url, data.title, data.body, data.color, data.buttons, data.script);
								break;
							case 'game':
								if(tour && !tour.callback(url)) {
									tour.kill();
								}

								// Crappy hack for adding a song to the playlist instead of playing it now
								if(that && that.nodeName === 'IMG') {
									L2P.get.playlist(null, function () {
										playlist.addGame(url, data.title, data.data, data.type);
									});
								} else {
									L2P.dialog.game(url, data.title, data.data, data.type, data.octave);
								}
								break;
							case 'redirect': // This is sent after a ajax-post and will update userinfo (or reload the page)
								if(L2P_global.language_code !== data.user.language_code || data.force_reload) {
									location.href	= data.url;
									return;
								} else {
									var	concert_pitch	= L2P_global.concert_pitch !== data.user.concert_pitch;

									$.each(data.user, function (key, value) {
										L2P_global[key]	= value;
									});

									// Reload the tones, if our convert pitch has changed
									if(concert_pitch) {
										options.generateTones();
									}
								}
								fM.link.navigate(data.url, 'Magic Tune');
								break;
						}
					});
				});
			}
		},
		countdown: function (sec, text, next, illustration, callback, options) {
			var	$overlay	= $('#overlay').css('background-color', ''),
				$countdown	= $('<div class="countdown"></div>'),
				items		= [],
				delay		= 0,
				done		= false,
				countdown	= {
					kill:	function () {
						// Make sure we can't kill it multiple times
						if(done) {
							return;
						}
						done	= true;
						$overlay
							.on('webkitAnimationEnd', function () {
								$countdown.remove();
							})
							.addClass('hide');
					},
					// Reset the countdown
					reload:	function () {
						$overlay
							.find('div.number')
								.removeClass('run')
						setTimeout(function () {
							$overlay
								.find('div.number')
									.addClass('run');
						}, 0);
					}
				};

			options	= options || {};

			// Change the background color
			if(options.background_color) {
				$overlay
					.css('background-color', options.background_color);
			}

			// Set some CSS info
			if(options.css) {
				$.each(options.css, function (name, value) {
					$countdown.css(name, value);
				});
			}

			// Set some classes
			if(options.classList && options.classList.length > 0) {
				options.classList.forEach(function (className) {
					$countdown.addClass(className);
				});
			}

			// Generate the seconds
			for(var i = sec; i > 0; i -= 1) {
				items.push({
					text:	i,
					sec:	1
				});
			}

			// We got some different ways to call this function - here we do the right ting
			if($.isArray(text)) {
				items	= items.concat(text);
			} else if(text && text.text) {
				items.push(text);
			} else if(text) {
				items.push({
					text:	text,
					sec:	1
				});
			}

			// Insert all the countdown-elements
			items.forEach(function (item, i) {
				var	$elem;

				item.sec	= item.sec || 1;

				$elem	=
					$('<div class="number"></div>')
						.html(item.text)
						.css('-webkit-animation-delay', delay+'s')
						.css('-webkit-animation-duration', item.sec+'s')
						.css('-webkit-transition-delay', delay+'s')
						.css('-webkit-transition-duration', item.sec+'s')
						.appendTo($countdown);

				// Set the correct countdown-type (animation-type)
				if(item.type) {
					$elem.addClass('countdown-type--'+item.type);
				}
				if(item.css) {
					$.each(item.css, function (name, value) {
						$elem.css(name, value);
					});
				}

				// If this is the last element, we subscribe for its animation-end
				if(i === items.length - 1) {
					$elem.on('webkitAnimationEnd', function () {
						done	= true;
						if(!options.lazyHide || !callback) {
							$overlay.addClass('hide');
						}

						if(callback) {
							callback.call(countdown, function () {
								$overlay.addClass('hide');
							});
						}
					});
				}

				delay	+= item.sec;
			});

			// Insert the "next"-text (above the countdown)
			if(next) {
				if(next.text) {
					var	$elem	=
						$('<div class="next"></div>')
							.text(next.text)
							.appendTo($countdown);

					if(next.css) {
						$.each(next.css, function (name, value) {
							$elem.css(name, value);
						});
					}
					if(next.classList) {
						next.classList.forEach(function (className) {
							$elem.addClass(className);
						});
					}
				} else {
					$('<div class="next"></div>')
						.text(next)
						.appendTo($countdown);
				}
			}

			// Insert the "bottom"-text
			if(options.bottom) {
				$('<div class="bottom"></div>')
					.html(options.bottom)
					.appendTo($countdown);
			}

			// Insert the illustration
			if(illustration) {
				$('<div class="illustration"></div>')
					.html(illustration)
					.appendTo($countdown);
			}

			// Insert the countdown
			$overlay
				.empty()
				.append($countdown)
				.removeClass('hide');

			// Start the countdown
			countdown.reload();

			return countdown;
		},
		funcs:	{
			tones:	{
				// Will return the difference between a freq and a tone
				freqDiffToTone: function (tone, freq, rel) {
					var	diff		= tone.hz - freq,
						diffAbs		= Math.abs(diff),
						otherTone,
						toneDiffs,
						ratio,
						ratioRel;

					otherTone	= L2P.funcs.tones.getClosestTone(tone, diff < 0);

					toneDiffs	= Math.abs(otherTone.hz - tone.hz),
					ratio		= diff / toneDiffs,
					ratioRel	= (diffAbs - rel) / (toneDiffs - rel);

					return {
						toneAbove:	diff < 0,
						diff:		diff,
						diffAbs:	diffAbs,
						otherTone:	otherTone,
						toneDiffs:	toneDiffs,
						ratio:		ratio,
						ratioRel:	ratioRel
					}
				},
				// Will return the closest tone next to a tone
				getClosestTone:	function (tone, higher) {
					var	pos	= options.tones.all.indexOf(tone),
						t;

					if(higher) {
						t	= options.tones.all[pos - 1];
						if(t) {
							if(t.hz === tone.hz) {
								t	= options.tones.all[pos - 2]
							}
						} else {
							t	= tone;
						}
					} else {
						t	= options.tones.all[pos + 1];
						if(t) {
							if(t.hz === tone.hz) {
								t	= options.tones.all[pos + 2]
							}
						} else {
							t	= tone;
						}
					}

					return t;
				},
				// Will return the tone in the octave closest to provided freq
				getCloseTone:	function (freq, defTone, tone) {
					var	octav, tempTone, diff, closestTone, closestDiff, closestFreq, newTone, newFreq, octavDiff, defToneType, defTonePos, defToneClose;

					// If we haven't the correct tone, but instead a sharp/flat tone, we find a base-tone
					if(defTone && tone && defTone.name !== tone.name && defTone.name.length === 2) {
						defToneType	= defTone.name.substr(1, 1); // sharp/flat
						defTonePos	= options.tones.all.indexOf(defTone);

						// Will find the correct base-tone
						if(defToneType === '#') {
							defToneClose	= options.tones.all[defTonePos + 1];
						} else if(defToneType === 'b') {
							defToneClose	= options.tones.all[defTonePos - 1];
						}

						if(defToneClose.name === tone.name) {
							defTone	= defToneClose;
						}
					}

					// Loop through the octaves and find the closest tone
					for(octav = 3; octav <= 6; octav += 1) {
						tempTone	= options.tones.names[octav][tone.name];
						if(tempTone) {
							diff	= Math.abs(tempTone.hz - freq);
							if(closestDiff === undefined || diff < closestDiff) {
								closestDiff	= diff;
								closestTone	= tempTone;
							}
						}
					}

					if(closestTone && defTone) {
						octavDiff	= tone.octav - closestTone.octav;
						if(options.tones.names[defTone.octav + octavDiff] === undefined) {
							console.error('TONE NOT FOUND', defTone.octav, octavDiff, defTone.octav + octavDiff);
						}
						newTone	= options.tones.names[defTone.octav + octavDiff][defTone.name];
						newFreq	= freq * Math.pow(2, octavDiff)
					}

					return {
						tone:	newTone || defTone,
						freq:	newFreq || freq
					}
				},
				// Will return the stepFactor (percent-step)
				getStepFactor:	function (percent) {
					var	stepFactor;
					L2P.steps.forEach(function (step) {
						if(!stepFactor && percent >= step.percent) {
							stepFactor	= step;
						}
					});

					return stepFactor;
				}
			}
		},
		storage: (function () {
			var	containers	= {},
				lastPing	= 0;

			// Check for updates
			function ping() {
				var	namespaces	= [],
					namespace;
				for(namespace in containers) {
					if(containers.hasOwnProperty(namespace)) {
						namespaces.push(namespace);
					}
				}

				if(namespaces.length > 0) {
					$.get('/api/get.storage.php', {
						namespaces:	namespaces
					}, function (data) {
						var	name;

						// Loop through the data
						for(namespace in data) {
							if(data.hasOwnProperty(namespace)) {
								for(name in data[namespace]) {
									// Set the data
									containers[namespace][0][0].set(name, data[namespace][name], true);
								}
							}
						}
					});
				}
			}
			setInterval(ping, 2000);

			function Storage(namespace) {
				this.namespace	= namespace;
				this.$this		= $(this);
				this.reload();
			}
			Storage.prototype.reload	= function () {
				this._storage	= JSON.parse(localStorage.getItem(this.namespace) || '{}');
			};
			Storage.prototype.set		= function (name, value, fromPing) {
				var	that				= this;

				if(value === null) {
					delete this._storage[name];
				} else {
					this._storage[name]		= value;
				}

				// If we came from ping and didn't have any change, we just return
				if(fromPing && localStorage.getItem(this.namespace) === JSON.stringify(this._storage)) {
					return;
				}

				// Else set the data in localstorage
				localStorage.setItem(this.namespace, JSON.stringify(this._storage));

				// Update the containers
				containers[this.namespace].forEach(function ($storage, i) {
					if($storage !== that.$this || fromPing) {
						$storage[0].reload();
						$storage.trigger('update', [name]);
					}
				});

				// Save to MySQL (if we didn't get this data from MySQL ;-)
				if(!fromPing) {
					$.post('/api/save.storage.php', {
						namespace:	this.namespace,
						data:		this._storage
					});
				}

				return this;
			};
			Storage.prototype.get		= function (name, doReload) {
				if(doReload) {
					this.reload();
				}
				return this._storage[name];
			};
			Storage.prototype.getAll	= function (doReload) {
				if(doReload) {
					this.reload();
				}
				return this._storage;
			};

			var	storage	= (function (namespace) {
				var	storage				= new Storage(namespace),
					storageContainer	= containers[namespace] || [];

				storageContainer.push(storage.$this);

				containers[namespace]	= storageContainer;

				return storage;
			});

			return storage;
		}()),
		render:	{
			playlist:	function (playlist, $container) {
				return new Render($container, function () {
					var	that	= this,
						lang	= {};
					this.$container
						.html([
							'<div>',
								'<div></div>',
								'<table>',
									'<tbody>',
									'</tbody>',
								'</table>',
							'</div>',
							'<form class="form-inline" name="play_options">',
								'<label></label>',
								'<select name="loops"></select>',
							'</div>'
						].join(''));

					this.$tbody	= $container.find('tbody');
					this.$tbody.on('click', '.removeFromPlaylist', function () {
						var	$this	= $(this),
							game	= $this.parents('tr').data('game');

						// If we are on a tour, we are not allowed to remove games from the playlist
						if($this.parents('.tour-step-backdrop').length > 0) {
							return;
						}

						// Remove the game from the playlist
						playlist.removeGame(game);
					});

					// Generate the "loops" select firled
					var	$loops	= this.$container.find('[name="loops"]');
					for(var loop_no = 1; loop_no <= 10; loop_no += 1) {
						$('<option></option>')
							.attr('value', loop_no)
							.text(loop_no)
							.appendTo($loops);
					}

					// Update text with localized text
					api.get.lang(function (lang) {
						that.lang			= lang;

						that.$container
							.find('form[name="play_options"] label').text(lang.browse_loops);

						that.render.call(that);
					}, ['global_delete', 'browse_loops']);

					that.reloadProxy	= $.proxy(that.reload, that);

					playlist.$this.on('update', this.reloadProxy);
				}, function () { // Update-function (called on first render and on update to the playlist)
					var	that	= this;
					this.$tbody.empty();

					this.$container
						.find('div > div')
						.text(playlist.name);

					// Render the games
					playlist.games.forEach(function (game) {
						var	urlInfo	= game.url.split('/'),
							octave	= urlInfo[3] || 0;
						$([
							'<tr>',
								'<td>',
									'<a data-dialog="game">',
										'<span class="octave"></span>',
										'<span class="title"></span>',
									'</a>',
								'</td>',
								'<td><img src="/img/icons/trash.svg" class="removeFromPlaylist" /></td>',
							'</tr>',
						].join(''))
						.data('game', game)
						.appendTo(that.$tbody)
						.find('a[data-dialog="game"]')
							.attr('href', game.url)
							.find('span.octave')
								.text(octave === 0 ? '' : '(Octave '+octave+') ')
								.end()
							.find('span.title')
								.text(game.title)
								.end()
							.end()
						.find('img.removeFromPlaylist')
							.attr('title', that.lang.global_delete)
							.end();
					});
				}, function () { // Kill-functions (called on modal-close)
					playlist.$this.off('update', this.reloadProxy);
				});
			}
		},
		click:	{
			// The default click-method for game-items (handles goto game and add game to playlist)
			on:		function (e) {
				e.preventDefault();
				e.stopPropagation();
				var	$elem	= $(this),
					$item	= $elem.is('a') ? $elem : $elem.parents('a').first(),
					data	= $item.data(),
					is_add	= $elem.is('[data-action="add-to-playlist"]'),
					urlRaw	= $item.attr('href'),
					url		= urlRaw+(urlRaw.indexOf('?') === -1 ? (urlRaw.substr(urlRaw.length - 1, 1) === '/' ? '' : '/') : ''),
					title	= data.title,
					is_guided_tour_item	= $item.is('a[data-dialog="game"]') && ($item.is('.tour-step-backdrop') || $item.parents('.tour-step-backdrop').length > 0);

				if(is_add) {
					L2P.get.playlist(null, function () {
						playlist.addGame(url, title);
					});
				} else if(!is_guided_tour_item) {
					require(['fM'], function (fM) {
						fM.link.navigate(url, 'Magic Tune', {
							title:	'Magic Tune'
						});
					});
				}
			},
			set:	function ($container) {
				$container.on('click', 'a[data-dialog], [data-action="add-to-playlist"]', L2P.click.on);
			}
		},
		get:	{
			playlist:	function (id, callback, name) {
				// Returns a playlist
				require(['playlist'], function (Playlist) {
					// If we don't have a playlist, or we got an id
					if(!playlist || id) {
						// If the id is "new" (hack!), create a new one
						if(id === 'new') {
							id	= undefined;
						} else if(!playlist) { // else load the playlist with our id
							var	playlists	= L2P.get.playlists();
							for(id in playlists) {
								break;
							}
						}

						// Create the playlist-object
						playlist	= new Playlist({}, id, name);
					}

					callback(playlist);
				});
			},
			playlists:	function () {
				var	storage	= L2P.storage('PlayList');

				return storage.getAll(true);
			}
		},
		// NOT IN USE
		io:		function () {
			if(!socket) {
				socket	= io.connect('http://l2p.fmads.dk:10001');
			}

			return socket;
		},
		// Stepfactors
		steps: [
			{
				percent:	95,
				factor:		1,
				text:		L2P_global.lang.game_grade_perfect,
				color:		'#090'
			},
			{
				percent:	80,
				factor:		0.95,
				text:		L2P_global.lang.game_grade_good,
				color:		'#0D0'
			},
			{
				percent:	60,
				factor:		0.9,
				text:		L2P_global.lang.game_grade_fair,
				color:		'#DD0'
			},
			{
				percent:	45,
				factor:		0.8,
				text:		L2P_global.lang.game_grade_average,
				color:		'#990'
			},
			{
				percent:	30,
				factor:		0.65,
				text:		L2P_global.lang.game_grade_poor,
				color:		'#F90'
			},
			{
				percent:	10,
				factor:		0.65,
				text:		L2P_global.lang.game_grade_rubbish,
				color:		'#C60'
			},
			{
				percent:	0,
				factor:		0.65,
				text:		L2P_global.lang.game_grade_miserable,
				color:		'#900'
			}
		],
		guided_tour:	function () {
			require(['fM', 'tour', 'json!lang/guided_tour.php'], function (fM, Tour, lang) {
				// Only initialize one tour-object
				if(tour && tour.tour) {
					tour.tour.start();
					return;
				}
				tour	= (function () {
					var	empty		= function (url) { // helper function for url-loads
							return url === '/guided_tour/';
						},
						controller	= {};

					// Helper-function for loading the tuner
					function tourGame(tuner) {
						tuner.$tuner.one('noise_ok', function () {
							controller.tour.removeState('end');
							controller.tour.start(true);
						});
					}
					// Helper-function for waiting for a tick with sound
					function tourGameTick(e, freq) {
						if(freq !== -1) {
							$(tuner).off('tick', tourGameTick);

							controller.tour.next();
						}
					}

					// Helper functions
					controller.callback	= empty;
					controller.kill		= function () {
						if(controller.tour) {
							controller.tour.end();
							controller.tour	= null;
						}
					};

					// Generate the tour
					controller.tour		= new Tour({
						useLocalStorage:	true,	// Save our state in localStorage (this is JUST for keeping the tour from saving in cookie)
						container:			'body',
						debug:				false,
						labels:		{
							next:	'<button class="btn btn-primary">'+lang.tour_button_got_it+'</button>',
							prev:	'',
							end:	'<button class="btn btn-default">'+lang.tour_button_end_tour+'</button>',
						},
						keyboard:	false,
						template:	function (i, step) {
							// Two templates - one without labels and one with
							if(step.labelsOff) {
								return [
									'<div class="popover tour">',
										'<div class="arrow"></div>',
										'<h3 class="popover-title"></h3>',
										'<div class="popover-content-box">',
											'<div class="popover-content"></div>',
											'<div class="popover-content-buttons">',
												'<button class="btn btn-default" data-role="end">'+lang.tour_button_end_tour+'</button>',
											'</div>',
										'</div>',
									'</div>'
								].join('');
							} else {
								return [
									'<div class="popover tour">',
										'<div class="arrow"></div>',
										'<h3 class="popover-title"></h3>',
										'<div class="popover-content-box">',
											'<div class="popover-content"></div>',
											'<div class="popover-content-buttons">',
												'<button class="btn btn-default" data-role="end">'+lang.tour_button_end_tour+'</button>',
												'<button class="btn btn-primary pull-right" data-role="next">'+lang.tour_button_got_it+'</button>',
											'</div>',
										'</div>',
									'</div>'
								].join('');
							}
						},
						onShow:		function (tour) {
							controller.callback	= empty;
						},
						onEnd:		function (tour) {
							if(empty(location.pathname)) {
								fM.link.navigate('/');
							}
						}
					});

					controller.tour.addStep({
						element:	'#guide',
						title:		lang.tour_0_0_title,
						content:	lang.tour_0_0,
						placement:	'bottom',
						backdrop:	true
					});

					controller.tour.addStep({
						element:	'a[href="/user/settings/"]',
						title:		lang.tour_1_0_title,
						content:	lang.tour_1_0,
						placement:	'left',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							// When navigation, we wan't to keep the tour-object, if we navigated to the correct url (else exit the tour)
							controller.callback	= function (url) {
								if(url === '/user/settings/') {
									tour.hideStep(tour._current);

									return true;
								}
								return false;
							}
						}
					});

					// Generate tour-steps for all settings
					(function (tour) {
						[null, 'concert_pitch', 'color_nodes', 'language', 'kiddie_mode', 'countdown_time', 'metronome', 'blind_mode'].forEach(function (name, i) {
							if(name) {
								tour.addStep({
									element:	'.modal-action.in table.FormTable [name="'+name+'"]',
									title:		lang['tour_1_'+i+'_title'],
									content:	lang['tour_1_'+i],
									placement:	'right',
									container:	'.modal-action.in',
									backdrop:	true
								});
							}
						});
					}(controller.tour));

					controller.tour.addStep({
						element:	'.modal-action.in .modal-footer .btn.btn-primary',
						title:		lang.tour_1_8_title,
						content:	lang.tour_1_8,
						placement:	'top',
						container:	'.modal-action.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							// When navigation, we wan't to keep the tour-object, if we navigated to the correct url (else exit the tour)
							controller.callback	= function (url) {
								if(url === '/') {
									return true;
								}
								return false;
							}
						}
					});

					controller.tour.addStep({
						element:	'a[href="/browse/scales/position1/"]',
						title:		lang.tour_2_0_title,
						content:	lang.tour_2_0,
						placement:	'left',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							// When navigation, we wan't to keep the tour-object, if we navigated to the correct url (else exit the tour)
							controller.callback	= function (url) {
								if(url === '/browse/scales/position1/') {
									tour.hideStep(tour._current);
									// Generate a new playlist for the tour
									L2P.get.playlist('new', function () {}, lang.tour_0_0_title);

									return true;
								}
								return false;
							}
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #list a[href="/game/a-major/4/1"]',
						title:		lang.tour_2_1_title,
						content:	lang.tour_2_1,
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							L2P.get.playlist(null, function (playlist) {
								// Wait for the added game to the playlist, before continuing the tour
								playlist.$this.one('addgame', function () {
									controller.tour.next();
								});
							});
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #PlaylistContainer #PlaylistItems > div',
						title:		lang.tour_2_2_title,
						content:	lang.tour_2_2,
						placement:	'left',
						container:	'.modal-info.in',
						backdrop:	true,

						// Fix for background (backdrop)
						onShow:		function () {
							$('.modal-info.in #PlaylistContainer #PlaylistInfoContainerInner').addClass('tour-step-backdrop');
						},
						onHide:		function () {
							$('.modal-info.in #PlaylistContainer #PlaylistInfoContainerInner').removeClass('tour-step-backdrop');
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #info div[data-box="illustration"]',
						title:		lang.tour_2_3_title,
						content:	lang.tour_2_3,
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true
					});

					controller.tour.addStep({
						element:	'.modal-info.in #list a[href="/game/b-major/4/1"]',
						title:		lang.tour_2_4_title,
						content:	lang.tour_2_4,
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							L2P.get.playlist(null, function (playlist) {
								// Wait for the added game to the playlist, before continuing the tour
								playlist.$this.one('addgame', function () {
									controller.tour.next();
								});
							});
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #PlaylistContainer img.playPlaylist',
						title:		lang.tour_2_5_title,
						content:	lang.tour_2_5,
						placement:	'left',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							$('.modal-info.in #PlaylistItems [name="loops"]').val(1);

							// When navigation, we wan't to keep the tour-object, if we navigated to the correct url (else exit the tour)
							controller.callback = function (url) {
								if(url === '/game/a-major/4/1/') {
									// If we already got a the tuner (SoundInput) just continue - else wait for the tuner to be initialized
									if(tuner) {
										controller.tour.next();
									} else {
										controller.tour.end();

										// When we got the tuner, continue the tour
										$(L2P).one('got_tuner', function (e, tuner) {
											tourGame(tuner);
										});
									}

									return true;
								}
								return false;
							};
						}
					});

					controller.tour.addStep({
						element:	'div.ContentBoxGameCompass',
						title:		lang.tour_4_0_title,
						content:	lang.tour_4_0,
						placement:	'right',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							var	current		= tour.current;

							// Show more info after 4 sec
							setTimeout(function () {
								if(tour.current === current) {
									$('div.ContentBoxGameCompass')
										.data('bs.popover')
											.$tip
												.find('.popover-content span')
													.show();
								}
							}, 4000);

							// Wait for a tick before continuing the tour
							$(tuner).on('tick', tourGameTick);
						}
					});

					controller.tour.addStep({
						element:	'div.ContentBoxGameCompass',
						title:		lang.tour_4_1_title,
						content:	lang.tour_4_1,
						placement:	'right',
						backdrop:	true
					});

					controller.tour.addStep({
						element:	'div.ContentBoxGameCompass',
						title:		lang.tour_5_0_title,
						content:	lang.tour_5_0,
						placement:	'right',
						backdrop:	true
					});

					// Make sure the tour always starts from first step
					controller.tour.removeState('end');
					controller.tour.setCurrentStep(0);
					controller.tour.start(true);

					return controller;
				}());
			});
		},
		create: function () {
			require(['game/edit'], function (Edit) {
				// Start the edit mode
				new Edit(L2P.gameController);
			});
		}
	};

	function login(e) {
		e.preventDefault();

		// Allow autologin
		sessionStorage.removeItem('l2p_fb_autologin');

		// Start the login-process
		L2P.facebook.login(function (user) {
			L2P.$modal.off('hide');
		});
	}

	// Login-box
	$('#frontpage_container [name="facebook_login"]').on('click', function (e) {
		e.preventDefault();

		sessionStorage.removeItem('l2p_fb_autologin');

		L2P.facebook.login(function () {});
	});
	$('#frontpage_container [name="custom_login"]').on('click', function (e) {
		e.preventDefault();

		$(this).parents('#LoginContainer').first().addClass('login-container-custom');
	});
	$('#frontpage_container [name="custom_login_back"]').on('click', function (e) {
		e.preventDefault();

		$(this).parents('#LoginContainer').first().removeClass('login-container-custom');
	});

	return L2P;
});
