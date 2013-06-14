define(['jquery', 'api', 'game/options', 'bootstrap.min'], function ($, api, options) {
	function goBack(e, doGoBack) {
		if(doGoBack !== false) {
			window.history.back();
		}
	}
	function getAjax(urlAjax, callback) {
		$.get(urlAjax, callback);
	}

	var	gameController,
		svgContainer,
		sound,
		playlist,
		socket,
		$controller,
		$toggleGame;

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
			//$toggleGame.find('.ContentBoxGameControl-playpause').text(L2P_global.lang.global_play);
			//$toggleGame.find('img').attr('src', '/img/icons/play-white.svg');
			$toggleGame.removeClass('can_pause');
		} else if(type === 'restart') {
			//$toggleGame.find('.ContentBoxGameControl-playpause').text(L2P_global.lang.global_play_again);
			//$toggleGame.find('img').attr('src', '/img/icons/play-white.svg');
			$toggleGame.removeClass('can_pause');
		} else if(type === 'pause') {
			//$toggleGame.find('.ContentBoxGameControl-playpause').text(L2P_global.lang.global_pause);
			//$toggleGame.find('img').attr('src', '/img/icons/pause-white.svg');
			$toggleGame.addClass('can_pause');
		}
	}

	var	L2P	= {
		$modal:	undefined,
		gameController:	undefined,
		dialog:	{
			action:	function (url, title, html, color, submitText, normalPost, callback) {
				api.get.lang(function (lang) {
					require(['fM', 'text!templates/modal.html'], function (fM, modalText) {
						L2P.$modal	= $(modalText).addClass('modal-action');
						L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
						L2P.$modal.find('.modal-body').html(html);
						if(submitText === '') {
							L2P.$modal.find('.modal-footer button.btn-primary').remove();
						} else {
							L2P.$modal.find('.modal-footer button.btn-primary').html(submitText);
						}
						L2P.$modal.find('button.btn[data-dismiss]').text(lang.global_button_close);

						if(normalPost) {

							var	action	= url || document.location.pathname;
							if(location.search.substring(1) !== '')
							{
								action += "?" + getQuerlocation.search.substring(1);
							}

							L2P.$modal.attr('action', action).attr('method', 'post');
						}

						function onSubmit(a, b, c) {
							if(callback) {
								var	response	= callback.call(this, a, b, c);
								if(response !== false && typeof(response) !== 'function') {
									//L2P.$modal.modal('hide');
								} else if(typeof(response) === 'function') {
									response(function (shouldHide) {
										if(shouldHide) {
											//L2P.$modal.modal('hide');
										}
									});
								}
							}
							return normalPost ? true : false;
						}

						L2P.$modal.modal('show');
						L2P.$modal.on('submit', onSubmit);

						var	pathname	= location.pathname;
						L2P.$modal.on('hide', function () {
							if(location.pathname === pathname) {
								fM.link.navigate('/');
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
					});
				}, ['global_button_close']);
			},
			info: function (url, title, html, color, buttons, script) {
				api.get.lang(function (lang) {
					var	requireScripts	= ['fM', 'text!templates/info.html'];
					if(script) {
						requireScripts.push('dialog/info/'+script);
					}
					require(requireScripts, function (fM, modalText, infoScript) {
						if(L2P.$modal) {
							//L2P.$modal.off('hide').modal('hide');
						}
						L2P.$modal	= $(modalText).addClass('modal-info');
						L2P.$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
						L2P.$modal.find('.modal-body').html(html);
						var	$modalFooter	= L2P.$modal.find('.modal-footer');
						if(buttons) {
							buttons.forEach(function (button) {
								$modalFooter.prepend('<button class="btn">'+button+'</button>');
							});
						}
						L2P.$modal.find('button.btn[data-dismiss]').text(lang.global_button_close);

						var	pathname	= location.pathname;
						L2P.$modal.on('hide', function () {
							if(location.pathname === pathname) {
								fM.link.navigate('/');
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
					});
				}, ['global_button_close']);
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
								//console.log(note);
							}
						});

						$startGame.on('click', $.proxy(L2P.gameController.startGame, L2P.gameController));
						$stopGame.on('click', $.proxy(L2P.gameController.stopGame, L2P.gameController));
						$toggleGame.on('click', function () {
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
						SoundInput(function (e) {
							console.log(e);
						}, $.proxy(L2P.gameController.soundInput, L2P.gameController), $.proxy(L2P.gameController.expectedTone, L2P.gameController));
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
								placement:	placement
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

					if(L2P.$modal && false) {
						//L2P.$modal.off('hide', goBack);
						//L2P.$modal.modal('hide');
					}
				});
			},
			url:	function (url) {
				var	that	= this,
					urlAjax	= '/dialog'+url;

				getAjax(urlAjax, function (data) {
					switch(data.dialogType) {
						case 'action':
							L2P.dialog.action(url, data.title, data.body, data.color, data.submitText, true);
							break;
						case 'info':
							L2P.dialog.info(url, data.title, data.body, data.color, data.buttons, data.script);
							break;
						case 'game':
							if(that && that.nodeName === 'IMG') {
								L2P.get.playlist(null, function () {
									playlist.addGame(url, data.title, data.data, data.type);
								});
							} else {
								L2P.dialog.game(url, data.title, data.data, data.type, data.octave);
							}
							break;
					}
				});
			}
		},
		countdown: function (sec, text, next, illustration, callback) {
			var	$countdownBox	= $('body > div.countdown-box').remove(),
				i				= sec;

			$countdownBox	= $('body').append('<div class="countdown-box opacity0"><div class="countdown-number animateCountdown"></div><div class="countdown-next"></div><div class="countdown-illustration"></div></div>').find('> div.countdown-box');

			var	$textBox	= $countdownBox.css('opacity', 1).addClass('countdown').find('> div.countdown-number').text(i),
				$nextBox	= $countdownBox.find('> div.countdown-next').text(next),
				$illuBox	= $countdownBox.find('> div.countdown-illustration').html(illustration),
				interval;

			function decrement() {
				i	-= 1;
				if(i === 0) {
					clearInterval(interval);
					$textBox.text(text).removeClass('animateCountdown');
					setTimeout(function () {
						$countdownBox.css('opacity', 0);

						setTimeout(function () {
							callback();
						}, 250);
						setTimeout(function () {
							$countdownBox.hide().removeClass('countdown');
						}, 1000);
					}, 500);
				} else {
					$textBox.text(i);
				}
			}
			interval	= setInterval(decrement, 1000);
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
				console.log('save', fromPing, this._storage);
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
				var	that		= this,
					$this		= that.nodeName === 'IMG' ? $(this).next() : $(this),
					urlRaw		= $this.attr('href'),
					url			= urlRaw+(urlRaw.indexOf('?') === -1 ? (urlRaw.substr(urlRaw.length - 1, 1) === '/' ? '' : '/') : ''),
					title		= $this.attr('data-title');

				require(['fM'], function (fM) {
					if(that && that.nodeName === 'IMG') {
						L2P.get.playlist(null, function () {
							playlist.addGame(url, title);
						});
					} else {
						fM.link.navigate(url, 'Play.now', {
							title:	'Play.now'
						});
					}
				});
			},
			set:	function ($container) {
				$container.on('click', 'a[data-dialog], img.addToPlaylist', L2P.click.on);
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
						//console.log(id);
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
				text:		'Perfect',
				color:		'#090'
			},
			{
				percent:	80,
				factor:		0.95,
				text:		'Good',
				color:		'#0D0'
			},
			{
				percent:	60,
				factor:		0.9,
				text:		'Fair',
				color:		'#FF0'
			},
			{
				percent:	45,
				factor:		0.8,
				text:		'Average',
				color:		'#990'
			},
			{
				percent:	30,
				factor:		0.65,
				text:		'Poor',
				color:		'#F90'
			},
			{
				percent:	10,
				factor:		0.65,
				text:		'Rubbish',
				color:		'#C60'
			},
			{
				percent:	0,
				factor:		0.65,
				text:		'Miserable',
				color:		'#900'
			}
		]
	};

	return L2P;
});