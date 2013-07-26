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
		console.log('fbAuth', response);
		fbUser	= response;
		if(response.status === 'connected') {
			if(+response.authResponse.userID !== L2P_global.fb_id) {
				var hasTriedAutologin	= sessionStorage.getItem('l2p_fb_autologin');
				if(hasTriedAutologin !== 'true') {
					require(['fM'], function (fM) {
						FB.api('/me', function (user) {
							console.log('tryLogin', user);
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
				} else {
					console.log('skipped autologin');
				}

				sessionStorage.setItem('l2p_fb_autologin', 'true');
			} else {
				FB.api('/me', function (user) {
					console.log('logged in', user);
				});
			}
		}

		FB.Event.subscribe('auth.authResponseChange', FBAuth);
	}

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
				if(script) {
					requireScripts.push('dialog/action/'+script);
				}
				require(requireScripts, function (fM, modalText, infoScript) {
					L2P.$modal	= $(modalText).addClass('modal-action');
					L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
					L2P.$modal.find('.modal-body').html(html);
					if(submitText === '') {
						L2P.$modal.find('.modal-footer button.btn-primary').remove();
					} else {
						L2P.$modal.find('.modal-footer button.btn-primary').html(submitText);
					}
					L2P.$modal.find('button.btn[data-dismiss]').text(L2P_global.lang.global_button_close);

					FB.XFBML.parse(L2P.$modal.find('.modal-body')[0]);

					var	action	= url || document.location.pathname;
					if(location.search.substring(1) !== '')
					{
						action += "?" + location.search.substring(1);
					}

					L2P.$modal.attr('action', action).attr('method', 'post');

					function onSubmit(e) {
						e.preventDefault();

						var	data	= fM.form.getElements.call(this);

						L2P.$modal.off('hide');
						fM.link.navigate(L2P.$modal.attr('action'), 'Magic Tune', {
							title:	'Magic Tune',
							data:	data
						});
					}

					L2P.$modal.modal('show');
					L2P.$modal.on('submit', onSubmit);

					var	pathname	= location.pathname;
					L2P.$modal.on('hide', function (e) {
						if(!$(e.target).hasClass('tour-step-backdrop')) {
							if(location.pathname === pathname) {
								fM.link.navigate('/');
							}
						}
					});

					fM.form.autofocus(L2P.$modal);

					fM.link.navigated(url, title, {
						is_dialog:	true
					});
					var	parent	= fM.link.getParent();
					if(parent && parent.is_dialog) {
						L2P.$modal
							.find('.modal-header-back-icon')
								.addClass('modal-header-back-icon--clickable')
								.on('click', function () {
									window.history.back();
								});
					}

					L2P.form.inputValidation.error();
					if(infoScript) {
						infoScript(L2P.$modal);
					}

					if(tour && tour.tour) {
						tour.tour.next();
					}
				});
			},
			info: function (url, title, html, color, buttons, script) {
				var	requireScripts	= ['fM', 'text!templates/info.html'];
				if(script) {
					requireScripts.push('dialog/info/'+script);
				}
				require(requireScripts, function (fM, modalText, infoScript) {
					L2P.$modal	= $(modalText).addClass('modal-info');
					L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
					L2P.$modal.find('.modal-body').html(html);
					var	$modalFooter	= L2P.$modal.find('.modal-footer');
					if(buttons) {
						buttons.forEach(function (button) {
							$modalFooter.prepend('<button class="btn">'+button+'</button>');
						});
					}
					L2P.$modal.find('button.btn[data-dismiss]').text(L2P_global.lang.global_button_close);

					var	pathname	= location.pathname;
					L2P.$modal.on('hide', function (e) {
						if(!$(e.target).hasClass('tour-step-backdrop')) {
							if(location.pathname === pathname) {
								fM.link.navigate('/');
							}
						}
					});

					fM.link.navigated(url, title, {
						is_dialog:	true
					});
					var	parent	= fM.link.getParent();
					if(parent && parent.is_dialog) {
						L2P.$modal
							.find('.modal-header-back-icon')
								.addClass('modal-header-back-icon--clickable')
								.on('click', function () {
									window.history.back();
								});
					}

					L2P.$modal.modal('show');

					if(infoScript) {
						infoScript(L2P.$modal);
					}
					if(tour && tour.tour) {
						tour.tour.next();
					}
				});
			},
			game: function (url, title, data, type, octave, callback) {
				var	$body_container	= $('body'),
					$game_container	= $('#game_container'),
					then;

				if(L2P.$modal && L2P.$modal.is(':visible')) {
					//L2P.$modal.trigger('hide-no-back');
				}

				require(['fM', 'text!templates/game.html', 'game/game-controller', 'game/sound', 'sound-input', 'compass', 'underscore-min'], function (fM, gameText, GameController, Sound, SoundInput, Compass) {
					var	generate	= !L2P.gameController,
						$compassBox	= $('div.ContentBoxGameCompass'),
						compass		= new Compass($compassBox),
						state		= fM.link.getCurrentNavigate() || {};

					L2P.resetBoxText($('#song_title'));
					L2P.resetBoxText($('#scale_title'));

					state.is_game	= true;

					if(generate) {
						$game_container.html(gameText);
					}
					$body_container.addClass('ShowGame');
					$body_container.addClass(type);
					$body_container.removeClass(type === 'song' ? 'scale' : 'song');

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

					$game_title.html(title);

					if(generate) {
						if(!sound) {
							sound	= new Sound();
						}

						L2P.gameController			= new GameController(svgContainer);
						L2P.gameController.sound	= sound;
					}

					compass.setTone(options.tones.names[4]['A']);
					compass.show();
					L2P.gameController.compass	= compass;

					$speed.on('change', function () {
						L2P.gameController.setGameSpeed(+this.value);
					});
					if(generate) {
						$(L2P.gameController).on({
							gameLoadSpeedChange:	function (e, speed) {
								$speed.val(speed).trigger('change');
							},
							gameStart:	function () {},
							gameEnd:	function (e, gameInfo) {
								var	currentState	= fM.link.getCurrent() || {};

								if(!currentState || !currentState.from_playlist) {
									api.get.statistic_uuid(function (data) {
										fM.link.navigate('/user/'+L2P_global.username+'/statistics/'+data.uuid+'/');
									}, {
										game_history_ids:	gameInfo.game_history_id
									});
								}
								ControllerSet('restart');
							},
							notePoints:	function (note) {

							}
						});

						$startGame.on('click', $.proxy(L2P.gameController.startGame, L2P.gameController));
						$stopGame.on('click', $.proxy(L2P.gameController.stopGame, L2P.gameController));
						$toggleGame.on('click', function (e) {
							if(L2P.gameController.game && !L2P.gameController.game.running) {
								L2P.gameController.startGame();

								ControllerSet('pause');
							} else {
								L2P.gameController.stopGame();

								ControllerSet('play');
							}
						});
					}

					ControllerSet('play');

					L2P.gameController.importGame(data, title, octave);
					if(url) {
						L2P.gameController.permlink	= url.match(/\/game\/([^\/]+)/g)[0].substr(6);
					} else {
						L2P.gameController.permlink	= location.href.match(/\/game\/([^\/]+)/g)[0].substr(6);
					}

					if(generate) {
						tuner	= new SoundInput(function (e) {
							// console.log(e);
						}, $.proxy(L2P.gameController.soundInput, L2P.gameController), $.proxy(L2P.gameController.expectedTone, L2P.gameController));
						$(tuner).on('tick', $.proxy(L2P.gameController.soundInput, L2P.gameController));

						$(L2P).trigger('got_tuner', [tuner]);
					}

					state.is_game	= true;
					fM.link.navigated(url, title, state);

					if(state) {
						if(state.autostart) {
							L2P.gameController.useCountdown	= state.use_countdown || state.use_countdown === undefined;
							L2P.gameController.startGame();
						}
						if(state.onstart) {
							$(L2P).trigger(state.onstart, [L2P.gameController]);
						}
					}

					if(callback) {
						callback(L2P.gameController);
					}
				});
			}
		},
		facebook:	{
			login:	function (callback) {
				FB.login(function (response) {
					fbUser	= response;
					callback(fbUser);
				}, {scope: 'email'});
			},
			api:	FB.api
		},
		form:	{
			inputValidation:	{
				error:	function (inputName) {
					$('input[data-content][data-content!=""]' + (inputName ? '[name="'+inputName+'"]' : '')).each(function () {
						var	that		= this,
							clientRects	= this.getClientRects();

						if(clientRects.length > 0) {
							var	placement	= (clientRects[0].right + 240) > document.width ? 'left' : 'right';

							$(this).popover({
								trigger:	'focus',
								placement:	placement,
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
		resetBoxText:	function ($box) {
			$box.html($box.attr('data-default-text'));
		},
		navigate:	{
			home:	function (e) {
				var	$body_container		= $('body'),
					$CenteringContainer	= $('#CenteringContainer'),
					title				= $CenteringContainer.attr('data-default-title');

				require(['fM'], function (fM) {
					L2P.resetBoxText($('#song_title'));
					L2P.resetBoxText($('#scale_title'));
					$body_container.removeClass('ShowGame');
					$body_container.removeClass('song');
					$body_container.removeClass('scale');

					fM.link.navigated('/', title, {
						title:	title
					});
				});

				if(tour && !tour.callback('/')) {
					tour.kill();
				} else if(tour && tour.tour) {
					tour.tour.next();
				}
			},
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

					console.log('nav', urlAjax, data);

					getAjax(urlAjax, data, function (data) {
						console.log(data);
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

								if(that && that.nodeName === 'IMG') {
									L2P.get.playlist(null, function () {
										playlist.addGame(url, data.title, data.data, data.type);
									});
								} else {
									L2P.dialog.game(url, data.title, data.data, data.type, data.octave);
								}
								break;
							case 'redirect':
								if(L2P_global.language_code !== data.user.language_code || data.force_reload) {
									location.href	= data.url;
									return;
								} else {
									var	concert_pitch	= L2P_global.concert_pitch !== data.user.concert_pitch;

									$.each(data.user, function (key, value) {
										L2P_global[key]	= value;
									});

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

			if(options.background_color) {
				$overlay
					.css('background-color', options.background_color);
			}
			if(options.css) {
				$.each(options.css, function (name, value) {
					$countdown.css(name, value);
				});
			}
			if(options.classList && options.classList.length > 0) {
				options.classList.forEach(function (className) {
					$countdown.addClass(className);
				});
			}

			for(var i = sec; i > 0; i -= 1) {
				items.push({
					text:	i,
					sec:	1
				});
			}
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

				if(item.type) {
					$elem.addClass('countdown-type--'+item.type);
				}
				if(item.css) {
					$.each(item.css, function (name, value) {
						$elem.css(name, value);
					});
				}
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
			if(options.bottom) {
				$('<div class="bottom"></div>')
					.html(options.bottom)
					.appendTo($countdown);
			}

			if(illustration) {
				$('<div class="illustration"></div>')
					.html(illustration)
					.appendTo($countdown);
			}

			$overlay
				.empty()
				.append($countdown)
				.removeClass('hide');

			countdown.reload();

			return countdown;
		},
		funcs:	{
			tones:	{
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
				getCloseTone:	function (freq, defTone, tone) {
					var	octav, tempTone, diff, closestTone, closestDiff, closestFreq, newTone, newFreq, octavDiff, defToneType, defTonePos, defToneClose;

					if(defTone && tone && defTone.name !== tone.name && defTone.name.length === 2) {
						defToneType	= defTone.name.substr(1, 1);
						defTonePos	= options.tones.all.indexOf(defTone);

						if(defToneType === '#') {
							defToneClose	= options.tones.all[defTonePos + 1];
						} else if(defToneType === 'b') {
							defToneClose	= options.tones.all[defTonePos - 1];
						}

						if(defToneClose.name === tone.name) {
							defTone	= defToneClose;
						}
					}

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
						for(namespace in data) {
							if(data.hasOwnProperty(namespace)) {
								for(name in data[namespace]) {
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

				if(fromPing && localStorage.getItem(this.namespace) === JSON.stringify(this._storage)) {
					return;
				}
				// console.log('save', fromPing, this._storage);
				localStorage.setItem(this.namespace, JSON.stringify(this._storage));

				containers[this.namespace].forEach(function ($storage, i) {
					if($storage !== that.$this || fromPing) {
						$storage[0].reload();
						$storage.trigger('update', [name]);
					}
				});

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
							game	= $this.parents('tr').data('game')

						playlist.removeGame(game);
					});

					var	$loops	= this.$container.find('[name="loops"]');
					for(var loop_no = 1; loop_no <= 10; loop_no += 1) {
						$('<option></option>')
							.attr('value', loop_no)
							.text(loop_no)
							.appendTo($loops);
					}

					api.get.lang(function (lang) {
						that.lang			= lang;

						that.$container
							.find('form[name="play_options"] label').text(lang.browse_loops);

						that.render.call(that);
					}, ['global_delete', 'browse_loops']);

					that.reloadProxy	= $.proxy(that.reload, that);

					playlist.$this.on('update', this.reloadProxy);
				}, function () {
					var	that	= this;
					this.$tbody.empty();

					this.$container
						.find('div > div')
						.text(playlist.name);

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
				}, function () {
					playlist.$this.off('update', this.reloadProxy);
				});
			}
		},
		click:	{
			on:		function (e) {
				e.preventDefault();
				e.stopPropagation();
				var	$elem	= $(this),
					$item	= $elem.is('a') ? $elem : $elem.parents('a').first(),
					data	= $item.data(),
					is_add	= $elem.is('[data-action="add-to-playlist"]'),
					urlRaw	= $item.attr('href'),
					url		= urlRaw+(urlRaw.indexOf('?') === -1 ? (urlRaw.substr(urlRaw.length - 1, 1) === '/' ? '' : '/') : ''),
					title	= data.title;

				if(is_add) {
					L2P.get.playlist(null, function () {
						playlist.addGame(url, title);
					});
				} else {
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
				require(['playlist'], function (Playlist) {
					if(!playlist || id) {
						if(id === 'new') {
							id	= undefined;
						} else if(!playlist) {
							var	playlists	= L2P.get.playlists();
							for(id in playlists) {
								break;
							}
						}
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
		io:		function () {
			if(!socket) {
				socket	= io.connect('http://l2p.fmads.dk:10001');
			}

			return socket;
		},
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
				console.log(lang);
				if(tour && tour.tour) {
					tour.tour.start();
					return;
				}
				tour	= (function () {
					var	empty		= function (url) {
							return url === '/guided_tour/';
						},
						controller	= {};

					function tourGame(tuner) {
						tuner.$tuner.one('noise_ok', function () {
							controller.tour.start(true);
						});
					}
					function tourGameTick(e, freq) {
						if(freq !== -1) {
							$(tuner).off('tick', tourGameTick);

							controller.tour.next();
						}
					}

					controller.callback	= empty;
					controller.kill		= function () {
						if(controller.tour) {
							controller.tour.end();
							controller.tour	= null;
						}
					};
					controller.tour		= new Tour({
						useLocalStorage:	true,
						container:			'body',
						debug:				true,
						labels:		{
							next:	'<button class="btn">'+lang.tour_button_got_it+'</button>',
							prev:	'',
							end:	'<button class="btn">'+lang.tour_button_end_tour+'</button>',
						},
						keyboard:	false,
						template:	function (i, step) {
							if(step.labelsOff) {
								return '<div class="popover tour popover--no-labels"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div>';
							} else {
								return '<div class="popover tour"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div>';
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
						placement:	'left',
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
							controller.callback	= function (url) {
								if(url === '/user/settings/') {
									tour.hideStep(tour._current);

									return true;
								}
								return false;
							}
						}
					});

					(function (tour) {
						[null, 'concert_pitch', 'color_nodes', 'language', 'kiddie_mode', 'countdown_time', 'metronome'].forEach(function (name, i) {
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
						title:		lang.tour_1_7_title,
						content:	lang.tour_1_7,
						placement:	'left',
						container:	'.modal-action.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							controller.callback	= function (url) {
								console.log('callback test', url, url === '/');
								if(url === '/') {
									return true;
								}
								return false;
							}
						}
					});

					controller.tour.addStep({
						element:	'a[href="/browse/scales/"]',
						title:		lang.tour_2_0_title,
						content:	lang.tour_2_0,
						placement:	'left',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							controller.callback	= function (url) {
								if(url === '/browse/scales/') {
									tour.hideStep(tour._current);
									L2P.get.playlist('new', function (playlist) {
										console.log(playlist);
									}, lang.tour_0_0_title);

									return true;
								}
								return false;
							}
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #list a[href="/game/a-major/4"]',
						title:		lang['tour_2_1_title'],
						content:	lang['tour_2_1'],
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							L2P.get.playlist(null, function (playlist) {
								playlist.$this.one('addgame', function () {
									controller.tour.next();
								});
							});
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #info div[data-content="illustration"]',
						title:		lang.tour_2_2_title,
						content:	lang.tour_2_2,
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true
					});

					controller.tour.addStep({
						element:	'.modal-info.in #list a[href="/game/b-major/4"]',
						title:		lang['tour_2_3_title'],
						content:	lang['tour_2_3'],
						placement:	'right',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							L2P.get.playlist(null, function (playlist) {
								playlist.$this.one('addgame', function () {
									controller.tour.next();
								});
							});
						}
					});

					controller.tour.addStep({
						element:	'.modal-info.in #PlaylistContainer img.playPlaylist',
						title:		lang.tour_2_4_title,
						content:	lang.tour_2_4,
						placement:	'left',
						container:	'.modal-info.in',
						backdrop:	true,
						labelsOff:	true,
						onShow:		function (tour) {
							controller.callback = function (url) {
								if(url === '/game/a-major/4/') {
									if(tuner) {
										controller.tour.next();
									} else {
										controller.tour.end();

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
							setTimeout(function () {
								if(tour.current === current) {
									$('div.ContentBoxGameCompass')
										.data('popover')
											.$tip
												.find('.popover-content span')
													.show();
								}
							}, 4000);

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

					controller.tour.setCurrentStep(0);
					controller.tour.start(true);

					console.log(controller.tour);

					return controller;
				}());
			});
		}
	};
	var t;

	return L2P;
});