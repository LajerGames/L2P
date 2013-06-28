var tuner;
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
							console.log(e);
						}, $.proxy(L2P.gameController.soundInput, L2P.gameController), $.proxy(L2P.gameController.expectedTone, L2P.gameController));
						$(tuner).on('tick', $.proxy(L2P.gameController.soundInput, L2P.gameController));
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
		countdown_test:	 function () {
			var	start	= new Date(),
				to		= new Date('2013-07-05 22:00:00 GMT'),
				d		= new Date(),
				secLeft	= Math.ceil((to.getTime() - d.getTime()) / 1000),
				realDelay,
				items	= [],
				itemsB	= [],
				item;

			secLeft	= Math.min(secLeft, 8);

			if(Date.now() > to) {
				console.log('skip countdown');
				return;
			}

			start.setMilliseconds(0);

			for(var i = secLeft; i > 0; i -= 1) {
				items.push({
					text:	i,
					sec:	1
				});
			}
			itemsB.push({
				text:	'We\'re',
				sec:	2,
				type:	'long'
			});
			itemsB.push({
				text:	'now',
				sec:	2,
				type:	'long'
			});
			itemsB.push({
				text:	'LIVE',
				sec:	3,
				type:	'long'
			});
			itemsB.push({
				text:	'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin-top: -20vmin;width: 96vw;height: 75vh;" x="0px" y="0px" width="720px" height="122px" viewBox="0 0 960 162.058" enable-background="new 0 0 960 162.058" xml:space="preserve"><g><path fill="#FFF" d="M213.521,38.61v10.726c8.362-8.363,16.181-12.362,23.816-12.362c10.363,0,18.908,5.091,24.363,14.727 c7.09-7.999,15.635-14.727,27.271-14.727c16.545,0,27.09,12.726,27.09,31.997v51.271h-16.181V69.698 c0-12.362-7.637-19.089-16.909-19.089c-5.271-0.182-12.362,4.363-18.181,10.362v59.271H248.61V69.515 c0-13.272-6.728-18.907-14.727-18.907c-8.182,0-13.636,2.545-20.363,10.362v59.271H197.34V38.608h16.182V38.61z"></path><path fill="#FFF" d="M399.87,115.515c-7.454,4.907-10.545,6.362-15.636,6.362c-7.092,0-10.909-2.545-12.363-8.362 c-7.091,5.636-14.545,8.362-21.999,8.362c-12,0-20-9.455-20-19.998c0-16.183,14.727-21.092,27.817-25.818l14.362-5.09v-4.363 c0-10.183-4.909-14.362-14.727-14.362c-8.908,0-17.999,4.18-25.817,13.453V48.062c6.364-7.452,15.272-11.089,27.09-11.089 c16.544,0,29.636,8.363,29.636,26.908v41.997c0,3.092,1.09,4.184,3.09,4.184c1.636,0,4.909-1.637,8.545-4.364v9.818H399.87z M372.053,79.879c-13.816,4.727-25.816,9.453-25.816,19.09c0,6.728,4.908,11.455,11.636,11.455c5.09,0,9.817-2.547,14.181-6.728 V79.879z"></path><path fill="#FFF" d="M505.096,51.154h-44.145c6.363,6.363,8.545,10.909,8.545,17.817c0,6.728-3.818,14.546-7.636,18.363 c-10.909,11.635-33.089,5.816-33.089,15.453c0,4.545,8.545,7.272,24.907,10.545c17.454,3.455,23.635,12.362,23.635,22.726 c0,16.182-14.363,26-38.542,26c-22,0-37.636-10.362-37.636-24.728c0-11.998,6.363-19.09,20.544-22.543 c-5.636-3.455-8.181-6.728-8.181-10.365c0-5.271,5.09-9.816,12.909-11.635v-0.363c-6-2.545-10.545-6-13.636-10.362 c-2.909-4.183-4.364-9.272-4.364-15.272c0-17.454,13.636-28.18,35.635-28.18h61.053V51.154z M434.953,124.241 c-10.908,0-18.544,5.092-18.544,12.363c0,8.182,8,12.545,22.726,12.545c14.183,0,22.545-4.363,22.545-11.816 C461.679,126.969,444.952,124.241,434.953,124.241z M439.134,52.608c-8.908,0-16.181,6.728-16.181,14.729 c0,8.906,6.545,14.907,16.363,14.907c9.091,0,15.635-6.362,15.635-15.271C454.952,59.154,447.68,52.608,439.134,52.608z"></path><path fill="#FFF" d="M505.125,120.243h-16.18V64.685h16.18V120.243z"></path><path fill="#FFF" d="M586.756,59.881c-9.271-6.182-15.453-7.999-22.543-7.999c-14.727,0-24.908,11.089-24.908,27.634 c0,16.908,10.908,27.09,27.635,27.09c6.908,0,13.453-1.818,21.635-5.455v16c-5.453,2.546-15.816,4.729-24.361,4.729 c-24.363,0-41.453-16.91-41.453-40.908c0-26.907,15.635-43.997,40.361-43.997c9.455,0,15.816,2.182,23.635,5.636V59.881z"></path><path fill="#FFF" d="M672.563,38.61h56.408v14.544h-56.408v41.815c0,9.636,6.908,12.363,11.637,12.363 c5.816,0,11.816-2,18.361-6v15.09c-5.637,3.092-14.363,5.455-19.635,5.455c-17.637,0-26.545-10.908-26.545-25.637V53.153h-14.18 v-1.818L672.563,21.7V38.61z"></path><path fill="#FFF" d="M764.373,120.243v-10.363c-6.729,7.271-16.18,12-24.18,12c-16.545,0-28.182-11.817-28.182-32.545V64.686 h16.182v25.74c0,11.453,5.635,18,16.727,18c7.271,0,14.182-4.002,19.453-11.455v-58.36h16.182v81.634h-16.182V120.243z"></path><path fill="#FFF" d="M817.641,49.336h0.361c6.184-7.817,15.273-12.362,24.363-12.362c15.453,0,27.816,10.545,27.816,32.907 v50.361H854V69.698c0-11.999-6.182-19.816-16-19.816c-7.09,0-12.725,3.272-20.361,11.817v58.544h-16.182V38.61h16.182v10.726 H817.641z"></path><path fill="#FFF" d="M959.266,112.242c-9.816,6.546-18.727,9.638-32.543,9.638c-25.455,0-39.637-20.91-39.637-43.453 c0-24.727,15.637-41.452,38.182-41.452c21.635,0,35.453,14.727,35.453,44.907h-57.453c2.547,16.181,11.818,24.543,27.453,24.543 c9.818,0,19.09-3.637,28.545-9.817V112.242L959.266,112.242z M944.721,71.153c-0.545-12.362-7.637-20.181-19.09-20.181 c-12.363,0-19.818,7.271-22,20.181H944.721z"></path></g><g><path fill="#FFF" d="M94.404,141.6c-7.867-17.328-7.938-38.852,1.684-54.75c10.923-18.047,26.561-28.658,46.117-32.729 c-3.263-12.452-9.752-23.598-18.52-32.492c-0.215,0.099-0.43,0.193-0.645,0.292c-19.941,9.265-38.215,21.103-51.938,38.736 c-15.911,20.449-23.955,43.287-17.583,69.204c1.22,4.961,2.806,9.604,4.719,13.956c4.459,0.857,9.061,1.313,13.77,1.313 C79.824,145.129,87.35,143.889,94.404,141.6z"></path><path fill="#FFF" d="M44.29,139.642c-3.076-8.517-5.209-17.741-6.396-27.646C32.592,67.788,48.221,31.288,83.196,3.356 c0.865-0.691,1.738-1.368,2.612-2.04C81.34,0.455,76.727,0,72.008,0C31.932,0-0.556,32.488-0.556,72.564 C-0.557,102.824,17.966,128.752,44.29,139.642z"></path><path fill="#FFF" d="M142.979,87.738c-10.028,0.532-21.638,5.623-29.525,13.187c-11.212,10.757-14.875,24.226-10.684,37.375 C123.045,128.795,138.202,110.189,142.979,87.738z"></path></g></svg>',
				sec:	4,
				type:	'long_rebounce'
			});

			var	options	= {
				background_color:	'#71C211',
				bottom:				'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="720px" height="122px" viewBox="0 0 960 162.058" enable-background="new 0 0 960 162.058" xml:space="preserve"><g><path fill="#FFF" d="M213.521,38.61v10.726c8.362-8.363,16.181-12.362,23.816-12.362c10.363,0,18.908,5.091,24.363,14.727 c7.09-7.999,15.635-14.727,27.271-14.727c16.545,0,27.09,12.726,27.09,31.997v51.271h-16.181V69.698 c0-12.362-7.637-19.089-16.909-19.089c-5.271-0.182-12.362,4.363-18.181,10.362v59.271H248.61V69.515 c0-13.272-6.728-18.907-14.727-18.907c-8.182,0-13.636,2.545-20.363,10.362v59.271H197.34V38.608h16.182V38.61z"></path><path fill="#FFF" d="M399.87,115.515c-7.454,4.907-10.545,6.362-15.636,6.362c-7.092,0-10.909-2.545-12.363-8.362 c-7.091,5.636-14.545,8.362-21.999,8.362c-12,0-20-9.455-20-19.998c0-16.183,14.727-21.092,27.817-25.818l14.362-5.09v-4.363 c0-10.183-4.909-14.362-14.727-14.362c-8.908,0-17.999,4.18-25.817,13.453V48.062c6.364-7.452,15.272-11.089,27.09-11.089 c16.544,0,29.636,8.363,29.636,26.908v41.997c0,3.092,1.09,4.184,3.09,4.184c1.636,0,4.909-1.637,8.545-4.364v9.818H399.87z M372.053,79.879c-13.816,4.727-25.816,9.453-25.816,19.09c0,6.728,4.908,11.455,11.636,11.455c5.09,0,9.817-2.547,14.181-6.728 V79.879z"></path><path fill="#FFF" d="M505.096,51.154h-44.145c6.363,6.363,8.545,10.909,8.545,17.817c0,6.728-3.818,14.546-7.636,18.363 c-10.909,11.635-33.089,5.816-33.089,15.453c0,4.545,8.545,7.272,24.907,10.545c17.454,3.455,23.635,12.362,23.635,22.726 c0,16.182-14.363,26-38.542,26c-22,0-37.636-10.362-37.636-24.728c0-11.998,6.363-19.09,20.544-22.543 c-5.636-3.455-8.181-6.728-8.181-10.365c0-5.271,5.09-9.816,12.909-11.635v-0.363c-6-2.545-10.545-6-13.636-10.362 c-2.909-4.183-4.364-9.272-4.364-15.272c0-17.454,13.636-28.18,35.635-28.18h61.053V51.154z M434.953,124.241 c-10.908,0-18.544,5.092-18.544,12.363c0,8.182,8,12.545,22.726,12.545c14.183,0,22.545-4.363,22.545-11.816 C461.679,126.969,444.952,124.241,434.953,124.241z M439.134,52.608c-8.908,0-16.181,6.728-16.181,14.729 c0,8.906,6.545,14.907,16.363,14.907c9.091,0,15.635-6.362,15.635-15.271C454.952,59.154,447.68,52.608,439.134,52.608z"></path><path fill="#FFF" d="M505.125,120.243h-16.18V64.685h16.18V120.243z"></path><path fill="#FFF" d="M586.756,59.881c-9.271-6.182-15.453-7.999-22.543-7.999c-14.727,0-24.908,11.089-24.908,27.634 c0,16.908,10.908,27.09,27.635,27.09c6.908,0,13.453-1.818,21.635-5.455v16c-5.453,2.546-15.816,4.729-24.361,4.729 c-24.363,0-41.453-16.91-41.453-40.908c0-26.907,15.635-43.997,40.361-43.997c9.455,0,15.816,2.182,23.635,5.636V59.881z"></path><path fill="#FFF" d="M672.563,38.61h56.408v14.544h-56.408v41.815c0,9.636,6.908,12.363,11.637,12.363 c5.816,0,11.816-2,18.361-6v15.09c-5.637,3.092-14.363,5.455-19.635,5.455c-17.637,0-26.545-10.908-26.545-25.637V53.153h-14.18 v-1.818L672.563,21.7V38.61z"></path><path fill="#FFF" d="M764.373,120.243v-10.363c-6.729,7.271-16.18,12-24.18,12c-16.545,0-28.182-11.817-28.182-32.545V64.686 h16.182v25.74c0,11.453,5.635,18,16.727,18c7.271,0,14.182-4.002,19.453-11.455v-58.36h16.182v81.634h-16.182V120.243z"></path><path fill="#FFF" d="M817.641,49.336h0.361c6.184-7.817,15.273-12.362,24.363-12.362c15.453,0,27.816,10.545,27.816,32.907 v50.361H854V69.698c0-11.999-6.182-19.816-16-19.816c-7.09,0-12.725,3.272-20.361,11.817v58.544h-16.182V38.61h16.182v10.726 H817.641z"></path><path fill="#FFF" d="M959.266,112.242c-9.816,6.546-18.727,9.638-32.543,9.638c-25.455,0-39.637-20.91-39.637-43.453 c0-24.727,15.637-41.452,38.182-41.452c21.635,0,35.453,14.727,35.453,44.907h-57.453c2.547,16.181,11.818,24.543,27.453,24.543 c9.818,0,19.09-3.637,28.545-9.817V112.242L959.266,112.242z M944.721,71.153c-0.545-12.362-7.637-20.181-19.09-20.181 c-12.363,0-19.818,7.271-22,20.181H944.721z"></path></g><g><path fill="#FFF" d="M94.404,141.6c-7.867-17.328-7.938-38.852,1.684-54.75c10.923-18.047,26.561-28.658,46.117-32.729 c-3.263-12.452-9.752-23.598-18.52-32.492c-0.215,0.099-0.43,0.193-0.645,0.292c-19.941,9.265-38.215,21.103-51.938,38.736 c-15.911,20.449-23.955,43.287-17.583,69.204c1.22,4.961,2.806,9.604,4.719,13.956c4.459,0.857,9.061,1.313,13.77,1.313 C79.824,145.129,87.35,143.889,94.404,141.6z"></path><path fill="#FFF" d="M44.29,139.642c-3.076-8.517-5.209-17.741-6.396-27.646C32.592,67.788,48.221,31.288,83.196,3.356 c0.865-0.691,1.738-1.368,2.612-2.04C81.34,0.455,76.727,0,72.008,0C31.932,0-0.556,32.488-0.556,72.564 C-0.557,102.824,17.966,128.752,44.29,139.642z"></path><path fill="#FFF" d="M142.979,87.738c-10.028,0.532-21.638,5.623-29.525,13.187c-11.212,10.757-14.875,24.226-10.684,37.375 C123.045,128.795,138.202,110.189,142.979,87.738z"></path></g></svg>'
			};

			var	run	= function () {
				realDelay	= (Date.now() - start) % 1000;

				if(items.length > 0) {

					if(realDelay > 100) {
						delay	= Math.floor(realDelay / 100) / 10;
						items[0].sec	= (items[0].sec || 1) - delay;
					} else {
						items[0].sec	= items[0].sec || 1;
					}

					L2P.countdown(0, items.splice(0, 5), 'Launching in', '', run, options);
				} else if(itemsB.length > 0) {
					if(realDelay > 100) {
						delay	= Math.floor(realDelay / 100) / 10;
						itemsB[0].sec	= (itemsB[0].sec || 1) - delay;
					} else {
						itemsB[0].sec	= itemsB[0].sec || 1;
					}

					L2P.countdown(0, itemsB.splice(0, 10), '', '', run, {
						background_color:	'#71C211'
					});
				}
			};
			run();
		}
	};
	var t;

	return L2P;
});