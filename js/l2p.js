define(['jquery', 'api', 'game/options', '/bootstrap/js/bootstrap.min.js'], function ($, api, options) {
	function goBack(e, doGoBack) {
		if(doGoBack !== false) {
			window.history.back();
		}
	}
	var	gameController,
		svgContainer,
		$modal,
		sound,
		playlist;

	function Render($container, loader, render, kill) {
		this.$container	= $container;
		this.loader		= loader;
		this.render		= render;
		this.kill		= kill;

		this.loader.call(this);
		this.reload();
	}
	Render.prototype.reload	= function () {
		this.render.call(this);
	};
	Render.prototype.kill	= function () {
		this.kill.call(this);
	};

	var	L2P	= {
		gameController:	undefined,
		dialog:	{
			action:	function (url, title, html, color, submitText, normalPost, callback) {
				api.get.lang(function (lang) {
					require(['fM', 'text!/templates/modal.html', '/bootstrap/js/bootstrap.min.js'], function (fM, modalText) {
						$modal	= $(modalText).addClass('modal-action');
						$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
						$modal.find('.modal-body').html(html);
						$modal.find('.modal-footer button.btn-primary').html(submitText);
						$modal.find('button.btn[data-dismiss]').text(lang.global_button_close);

						$modal.on('hide', goBack);

						if(normalPost) {

							var	action	= url || document.location.pathname;
							if(getQueryString() !== '')
							{
								action += "?" + getQueryString();
							}

							$modal.attr('action', action).attr('method', 'post');
						}

						function onSubmit(a, b, c) {
							if(callback) {
								var	response	= callback.call(this, a, b, c);
								if(response !== false && typeof(response) !== 'function') {
									$modal.modal('hide');
								} else if(typeof(response) === 'function') {
									response(function (shouldHide) {
										if(shouldHide) {
											$modal.modal('hide');
										}
									});
								}
							}
							return normalPost ? true : false;
						}

						$modal.modal('show');
						$modal.on('submit', onSubmit);

						fM.form.autofocus($modal);

						fM.link.navigate(url, title, {
							title:	'Play.now - '+title
						});
					});
				}, ['global_button_close']);
			},
			info: function (url, title, html, color, buttons, script) {
				api.get.lang(function (lang) {
					var	requireScripts	= ['fM', 'text!/templates/info.html', '/bootstrap/js/bootstrap.min.js'];
					if(script) {
						requireScripts.push('dialog/info/'+script);
					}
					require(requireScripts, function (fM, modalText, UNUSE, infoScript) {
						$modal	= $(modalText).addClass('modal-info');
						$modal.find('.modal-header').css('background-color', color).find(' h2').text(title);
						$modal.find('.modal-body').html(html);

						var	$modalFooter	= $modal.find('.modal-footer');
						if(buttons) {
							buttons.forEach(function (button) {
								$modalFooter.prepend('<button class="btn">'+button+'</button>');
							});
						}
						$modal.find('button.btn[data-dismiss]').text(lang.global_button_close);

						$modal.on('hide', goBack);
						$modal.on('hide-no-back', function () {
							$modal.off('hide').modal('hide');
						});

						$modal.modal('show');

						if(infoScript) {
							infoScript($modal);
						}

						fM.link.navigate(url, title, {
							title:	'Play.now - '+title
						});
					});
				}, ['global_button_close']);
			},
			game: function (url, title, data, type, callback) {
				var	$body_container	= $('body'),
					$game_container	= $('#game_container'),
					then;

				if($modal && $modal.is(':visible')) {
					console.log('close modal');
					$modal.trigger('hide-no-back');
				}

				require(['fM', 'text!/templates/game.html', 'game/game-controller', 'game/sound', 'sound-input', 'compass', '/bootstrap/js/bootstrap.min.js', 'underscore-min'], function (fM, gameText, GameController, Sound, SoundInput, Compass) {
					var	generate	= !L2P.gameController,
						compassBox	= $('div.ContentBoxOrange div.CompassOuter'),
						compass		= new Compass(compassBox);

						console.log('generate', generate);
					if(generate) {
						$game_container.html(gameText);
					}
					$body_container.addClass('ShowGame');
					$body_container.addClass(type);
					$body_container.removeClass(type === 'song' ? 'scale' : 'song');

					svgContainer	= $game_container.find('#svg_container')[0];
					var	$speed		= $game_container.find('#speed'),
						$speedShow	= $game_container.find('#speedShow'),
						$startGame	= $game_container.find('#startGame'),
						$stopGame	= $game_container.find('#stopGame'),
						$song_title	= $('#song_title');

					$song_title.html(title);

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
						$speedShow.html(this.value);
					});
					$(L2P.gameController).on({
						gameLoadSpeedChange:	function (e, speed) {
							$speed.val(speed).trigger('change');
						},
						gameStart:	function () {
							compass.show();
						},
						gameStop:	function () {
							compass.hide();
						},
						notePoints:	function (note) {
							//console.log(note);
						}
					});

					$startGame.on('click', $.proxy(L2P.gameController.startGame, L2P.gameController));
					$stopGame.on('click', $.proxy(L2P.gameController.stopGame, L2P.gameController));

					L2P.gameController.importGame(data, title);
					if(url) {
						L2P.gameController.permlink	= url.match(/\/game\/([^\/]+)/g)[0].substr(6);
					} else {
						L2P.gameController.permlink	= location.href.match(/\/game\/([^\/]+)/g)[0].substr(6);
					}

					if(generate) {
						SoundInput(function (e) {
							console.log(e);
						}, $.proxy(L2P.gameController.soundInput, L2P.gameController));
					}

					fM.link.navigate(url, title, {
						title:	'Play.now - '+title
					});

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
					$body_container.removeClass('ShowGame');
					$body_container.removeClass('song');
					$body_container.removeClass('scale');

					fM.link.navigate('/', title, {
						title:	title
					});

					if($modal) {
						$modal.off('hide', goBack);
						$modal.modal('hide');
					}
				});
			}
		},
		countdown: function (sec, text, next, callback) {
			var	countdownBox	= $('body > div.countdown-box').show(),
				i				= sec;
			if(countdownBox.length === 0) {
				countdownBox	= $('body').append('<div class="countdown-box opacity0"><div class="countdown-number animateCountdown"></div><div class="countdown-next"></div></div>').find('> div.countdown-box');
			}

			var	textBox	= countdownBox.css('opacity', 1).addClass('countdown').find('> div.countdown-number').text(i),
				nextBox	= countdownBox.find('> div.countdown-next').text(next),
				interval;

			function decrement() {
				i	-= 1;
				if(i === 0) {
					clearInterval(interval);
					textBox.text(text).removeClass('animateCountdown');
					setTimeout(function () {
						countdownBox.css('opacity', 0);

						setTimeout(function () {
							callback();
						}, 250);
						setTimeout(function () {
							countdownBox.hide().removeClass('countdown');
						}, 1000);
					}, 500);
				} else {
					textBox.text(i);
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
						if(t.hz === tone.hz) {
							t	= options.tones.all[pos - 2]
						}
					} else {
						t	= options.tones.all[pos + 1];
						if(t.hz === tone.hz) {
							t	= options.tones.all[pos + 2]
						}
					}

					return t;
				},
				getCloseTone:	function (freq, defTone, tone) {
					var	octav, tempTone, diff, closestTone, closestDiff, closestFreq, newTone, newFreq, octavDiff;

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
						newTone	= options.tones.names[defTone.octav + octavDiff][defTone.name];
						newFreq	= freq * Math.pow(2, octavDiff)
					}

					return {
						tone:	newTone || defTone,
						freq:	newFreq || freq
					}
				}
			}
		},
		storage: (function () {
			var	containers	= {};

			function Storage(namespace) {
				this.namespace	= namespace;
				this.$this		= $(this);
				this.reload();
			}
			Storage.prototype.reload	= function () {
				this._storage	= JSON.parse(localStorage.getItem(this.namespace) || '{}');
			};
			Storage.prototype.set		= function (name, value) {
				var	that				= this;
				this._storage[name]		= value;
				localStorage.setItem(this.namespace, JSON.stringify(this._storage));

				containers[this.namespace].forEach(function ($storage, i) {
					if($storage !== that.$this) {
						$storage.trigger('update', [name]);
					}
				});

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
					var	that	= this;
					this.$container
						.html([
							'<table>',
								'<tbody>',
								'</tbody>',
							'</table>'
						].join(''))

					this.$tbody	= $container.find('tbody');
					this.$tbody.on('click', '.removeFromPlaylist', function () {
						var	$this	= $(this),
							game	= $this.parents('tr').data('game')

						playlist.removeGame(game);
					});

					this.reloadProxy	= $.proxy(this.reload, this);

					playlist.$this.on('update', this.reloadProxy);
				}, function () {
					var	that	= this;
					this.$tbody.empty();

					api.get.lang(function (lang) {
						playlist.games.forEach(function (game) {
							$([
								'<tr>',
									'<td><a data-dialog="game"></a></td>',
									'<td><img src="/img/icons/trash.svg" class="removeFromPlaylist" /></td>',
								'</tr>',
							].join(''))
							.data('game', game)
							.appendTo(that.$tbody)
							.find('a[data-dialog="game"]')
								.attr('href', game.url)
								.text(game.title)
								.end()
							.find('img.removeFromPlaylist')
								.attr('title', lang.global_delete)
								.end();
						});
					}, ['global_delete']);
				}, function () {
					playlist.$this.off('update', this.reloadProxy);
				});
			}
		},
		click:	{
			on:		function (e) {
				e.preventDefault();
				console.log(this);
				var	that		= this,
					$this		= that.nodeName === 'IMG' ? $(this).next() : $(this),
					urlRaw		= $this.attr('href'),
					url			= urlRaw+(urlRaw.indexOf('?') === -1 ? (urlRaw.substr(urlRaw.length - 1, 1) === '/' ? '' : '/') : '')
					urlAjax		= '/dialog'+url;

				$.get(urlAjax, function (data) {
					switch(data.dialogType) {
						case 'action':
							L2P.dialog[data.dialogType](url, data.title, data.body, data.color, data.submitText, true);
							break;
						case 'info':
							L2P.dialog[data.dialogType](url, data.title, data.body, data.color, data.buttons, data.script);
							break;
						case 'game':
							if(that.nodeName === 'IMG') {
								L2P.get.playlist(null, function () {
									playlist.addGame(url, data.title, data.data, data.type);
								});
							} else {
								L2P.dialog[data.dialogType](url, data.title, data.data, data.type);
							}
							break;
					}
				});
			},
			set:	function ($container) {
				$container.on('click', 'a[data-dialog], img.addToPlaylist', L2P.click.on);
			}
		},
		get:	{
			playlist:	function (id, callback) {
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
						console.log(id);
						playlist	= new Playlist({}, id);
					}

					callback(playlist);
				});
			},
			playlists:	function () {
				var	storage	= L2P.storage('PlayList');

				return storage.getAll(true);
			}
		}
	};

	return L2P;
});