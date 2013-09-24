define(['jquery', 'svg', 'game/options', 'fM', 'api', 'l2p', 'game/tick'], function ($, SVGElement, options, fM, api, L2P, Tick) {
	function getImagePath(note, connect, coloredNotes, colorName) {
		var	path		= options.gameImagePath;

		colorName		= colorName	|| '';
		coloredNotes	= coloredNotes || [];

		if(note.isRest) {
			path	+= note.type.name.substr(4, 1).toLowerCase() + note.type.name.substr(5) + 'rest';
		} else if(note.isPeriod) {
			if(connect) {
				path	+= 'quarternote';
			} else {
				path	+= note.type.name.substr(0, note.type.name.length - 6) + 'note';
			}
		} else {
			if(connect) {
				path	+= 'quarternote';
			} else {
				path	+= note.type.name + 'note';
			}
		}

		if(!note.isRest && colorName === '') {
			for(var colorNo = 0; colorNo < coloredNotes.length; colorNo += 1) {
				if(coloredNotes[colorNo].pos <= note.tone.pos) {
					colorName	= coloredNotes[colorNo].color;
					break;
				}
			}
		}

		return path + colorName + options.gameImageType;
	}
	function flipNote(note) {
		note.svgElement.node.style.webkitTransform	+= ' scaleY(-1)';
		note.svgElement.options.flip				= true;
	}
	function makeConnections(tact, connections) {
		if(connections.length > 0) {
			var	note1	= connections[0],
				note2	= connections[connections.length - 1],

				flipped	= note1.svgElement.options.flip,

				y		= (flipped ? 2 * 84 : 16 + 2) - 8,

				y1		= note1.svgElement.y + y,

				x1		= note1.svgElement.x + 25 - 1,
				x2		= note2.svgElement.x + 25 + 1,

				deltaX	= x2 - x1,

				moveY	= 0,
				lastNote;

			connections.forEach(function (note) {
				var	diffY	= note1.svgElement.y - note.svgElement.y;

				if(flipped && diffY < 0 && diffY < -moveY) {
					moveY	= -diffY;
				} else if(!flipped && diffY > 0 && diffY > -moveY) {
					moveY	= -diffY;
				}
			});

			new	SVGElement('line')
				.setRef(connections)
				.setLine(x1, y1 + moveY, x2, y1 + moveY)
				.setStroke('#000', 5)
				.appendTo(tact.svgElement.node);

			connections.forEach(function (note, i) {
				if(note.svgElement.y !== note1.svgElement.y + moveY) {
					new SVGElement('line')
						.setLine(note.svgElement.x + 25, note.svgElement.y + y, note.svgElement.x + 25, y1 + moveY)
						.setStroke('#000', 2)
						.appendTo(tact.svgElement.node);
				}

				if(note.type.length <= 1/16 * 1.5) {
					if(lastNote && lastNote.type.length <= 1/16 * 1.5) {
						new	SVGElement('line')
							.setRef(connections)
							.setLine(lastNote.svgElement.x + 24, y1 + moveY + (flipped ? -10 : 10), note.svgElement.x + 26, y1 + moveY + (flipped ? -10 : 10))
							.setStroke('#000', 5)
							.appendTo(tact.svgElement.node);
					} else if(lastNote && i === connections.length - 1) {
						new	SVGElement('line')
							.setRef(connections)
							.setLine(note.svgElement.x + 4, y1 + moveY + (flipped ? -10 : 10), note.svgElement.x + 26, y1 + moveY + (flipped ? -10 : 10))
							.setStroke('#000', 5)
							.appendTo(tact.svgElement.node);
					}
				} else if(lastNote && lastNote.type.length <= 1/16 * 1.5) {
					if(i === 1) {
						new	SVGElement('line')
							.setRef(connections)
							.setLine(lastNote.svgElement.x + 25, y1 + moveY + (flipped ? -10 : 10), lastNote.svgElement.x + 2 * 25 - 4, y1 + moveY + (flipped ? -10 : 10))
							.setStroke('#000', 5)
							.appendTo(tact.svgElement.node);
					} else {
						new	SVGElement('line')
							.setRef(connections)
							.setLine(lastNote.svgElement.x + 4, y1 + moveY + (flipped ? -10 : 10), lastNote.svgElement.x + 26, y1 + moveY + (flipped ? -10 : 10))
							.setStroke('#000', 5)
							.appendTo(tact.svgElement.node);
					}
				}

				lastNote	= note;
			});

			connections.splice(0);
		}
	}

	var	GameController	= function (svg) {
		var	that	= this;
		this.$this			= $(this);
		this.svg			= svg;
		this.svgBackground	= svg.querySelector('#background');
		this.SVGBackground	= new SVGElement(this.svgBackground);
		this.svgNotes		= svg.querySelector('#notes');
		this.svgNotes		= document.getElementById('svg_container_notes');
		this.gameContainerDiv	= document.getElementById('game_container_div');
		this.pointContainerDiv	= document.createElement('div');
		this.pointContainerDiv.style.width				= '130px';
		this.pointContainerDiv.style.height				= '10vmin';
		this.pointContainerDiv.style.borderRadius		= '5px';
		this.pointContainerDiv.style.position			= 'absolute';
		this.pointContainerDiv.style.top				= '0';
		this.pointContainerDiv.style.textAlign			= 'center';
		this.pointContainerDiv.style.padding			= '2vmin 0';
		this.pointContainerDiv.style.webkitTransform	= 'translate3d(145px, 150px, 0)';
		this.SVGNotes		= new SVGElement(this.svgNotes);
		this.svgStart		= svg.querySelector('#start');
		this.SVGStart		= new SVGElement(this.svgStart);
		this.permlink		= '';
		this.sound;
		this.game;
		this.lastPos		= 0;
		this.playSound		= false;
		this.useCountdown	= true;
		this.currentNote;
		this.currentTact;
		this.paused			= false;
		this.lastLeft		= -1;
		this.isEdit			= false;
		this.fingerpos		= null;

		$(fM.visibility).on('change', function (e, visibility) {
			if(visibility.hidden) {
				that.stopGame();
			}
		});

		for(var i = 50 + options.lineHeight; i <= 50 + options.lineHeight * 5; i += options.lineHeight) {
			var	g	= new SVGElement('g')
				.appendTo(this.svgBackground);

			g.node.setAttribute('transform', 'translate(0, '+(i + options.topPos)+')');
			new SVGElement('line')
				.setLine(0, 0, '100%', 0)
				.setStroke('#000')
				.appendTo(g);
		}
		new SVGElement('image')
			.setLink('/img/game/g-key.svg')
			.setPos(5, options.topPos + options.lineHeight)
			.setDimensions(63, 190)
			.appendTo(this.svgStart);
		this.svgStartContainer =
			new SVGElement('g')
				.appendTo(this.svgStart);
		var	g	=
			new SVGElement('g')
				.appendTo(this.svgStart);
		g.node.setAttribute('transform', 'translate('+(options.leftMargin + options.markerPos)+', '+(options.topPos + 25 + options.lineHeight)+')');
		this.svgLine =
			new SVGElement('line')
				.setLine(0, 0, 0, options.topPos + 50 + options.lineHeight * 6 - (options.topPos + 25 + options.lineHeight))
				.setStroke('#090', 3)
				.appendTo(g);
		this.svgPointer	=
			new SVGElement('use')
				.setLink('#pointer')
				.setPos(options.leftMargin + options.markerPos, options.topPos + 50 + options.lineHeight * (4 / 2 - 0.5) - 0.85 * options.lineHeight * 0.5 + 1.5)
				.setFill('#090')
				.appendTo(this.svgStart);
		new SVGElement('rect')
				.setPos(200, 200)
				.setDimensions(50, 50)
				.setFill('#000')
				.setOpacity(0)
				.addClass('animate-spinning-infinite')
				.appendTo(this.svgStart);

		this.setPointerPos(1);

		this.factor;
		this.defWidth;
		this.startPos;
		this.setFactor(1);
	};
	GameController.prototype.showPointBox	= function (points, stepFactor) {
		var	div						= this.pointContainerDiv.cloneNode();
		stepFactor					= stepFactor || L2P.steps[L2P.steps.length - 1];
		div.innerHTML				= stepFactor.text+'<br>'+points+' Points';
		div.style.backgroundColor	= stepFactor.color;
		div.style.webkitTransition	= '1s';
		setTimeout(function () {
			div.style.webkitTransform	= 'translate3d(145px, 100px, 0)';
			div.style.opacity			= '0';
			setTimeout(function () {
				//div.remove();
			}, 1000);
		}, 0);

		this.gameContainerDiv.appendChild(div);
	};
	GameController.prototype.setFactor	= function (factor) {
		this.factor		= factor;
		this.defWidth	= 750 * this.factor;
		this.startPos	= options.leftMargin + this.defWidth;
	};
	GameController.prototype.setGame	= function (game) {
		game.controller	= this;
		this.game		= game;
		this.point		= 0;
		this.pointCon	= $('#pointContainer');
		this.currentNote	= undefined;

		// console.log(this.game);
		this.game.reset();

		this.SVGNotes.animateAbs(0, 0, 0);

		// console.log('reset-pos', this.SVGNotes.node.style.webkitTransition, this.SVGNotes.node.style.webkitTransform);
		this.initView();

		this.$this.trigger('gameLoadSpeedChange', this.game.speed);
	};
	GameController.prototype.startGame	= function (nextSong) {
		var	that		= this,
			firstNote;

		if(this.game) {
			this.game.softReset();
			this.game.tacts.forEach(function (tact) {
				if(firstNote) {
					return;
				}
				tact.nodes.forEach(function (note) {
					if(firstNote) {
						return;
					}
					if(!note.isRest) {
						firstNote	= note;
					}
				});
			});

			if(L2P_global.blind_mode && that.compass.enabled) {
				that.compass.setTone(options.tones.names[4]['A']);
				that.compass.disable();
			} else if(!L2P_global.blind_mode && !that.compass.enabled) {
				that.compass.enable();
			}
			if(L2P_global.blind_mode) {
				that.svgPointer.hide();
			}

			if(this.useCountdown) {
				api.get.lang(function (data) {
					api.get.illustrations(function (illustration) {
						L2P.countdown(L2P_global.countdown_time || 3, data.game_start, that.game.title, illustration.illustration, function () {
							that.game.start();
							that.$this.trigger('gameStart');

							that.runGame();
						});
					}, firstNote.tone.octav, firstNote.tone.name);
				}, ['game_start']);
			} else {
				that.game.start();
				that.$this.trigger('gameStart');

				that.SVGNotes.node.style.webkitTransition	= '';
				that.SVGNotes.node.style.webkitTransform	= '';

				that.runGame();
			}
		}
	};
	GameController.prototype.runGame	= function () {
		var	gameController		= this,
			totalWidth			= this.game.getWidth() - gameController.defWidth / 4,
			totalDuration		= this.game.getDuration(),
			currentLeft			= -this.svgNotes.getClientRects()[0].left,
			relativeDuration	= totalDuration * (totalWidth - currentLeft) / totalWidth,
			pulse				= 60 / gameController.game.speed * 1000;

		gameController.paused	= false;

		gameController.SVGNotes.node.style.width	= (totalWidth + gameController.defWidth / 4)+'px';

		gameController.SVGNotes.animateAbs(-totalWidth, 0, relativeDuration, this.gameDone.bind(this));

		$(gameController.svgLine.node).on('webkitAnimationEnd', function () {
			gameController.svgLine.node.classList.remove('pulse');
		});

		if(L2P_global.metronome && !L2P_global.kiddie_mode) {
			var lastPulse	= Date.now(),
				pulseFunc	= function () {
					if(gameController.game && gameController.game.running) {
						gameController.svgLine.node.classList.add('pulse');

						setTimeout(pulseFunc, pulse - ((Date.now() - lastPulse) % pulse));
					}
				};

			if(currentLeft === 0) {
				setTimeout(function () {
					gameController.svgLine.node.classList.add('pulse');
					lastPulse	= Date.now();
					setTimeout(pulseFunc, pulse);
				}, pulse / 2 + pulse / 10);
			} else {
				gameController.svgLine.node.classList.add('pulse');
				lastPulse	= Date.now();
				setTimeout(pulseFunc, pulse);
			}
		}
	};
	GameController.prototype.pauseGame	= function () {
		if(L2P_global.kiddie_mode) {
			this.SVGNotes.animateAbs(-this.currentLeft() + 30, 0, 0);
		} else {
			this.SVGNotes.animateAbs((-Math.floor(this.currentLeft() / (this.defWidth / 4)) + 0.5) * (this.defWidth / 4) - 20, 0, 0);
		}
		this.paused	= true;
	};
	GameController.prototype.stopGame	= function () {
		this.compass.enable();
		this.svgPointer.show();
		if(this.game && this.game.running) {
			this.game.stop();

			this.pauseGame();

			this.$this.trigger('gameStop');
			this.sound.clearSound();
		}
	};
	GameController.prototype.drawSlur	= function (from, to) {
		var	fromX	= options.noteSlurPos.x + from.svgElement.x + 25,
			fromY	= options.noteSlurPos.y + from.svgElement.y + 84 + (from.svgElement.options.flip ? -16 : 16),

			deltaX	= to.svgElement.x - from.svgElement.x,
			deltaY	= to.svgElement.y - from.svgElement.y;

		var	slur	=
			new SVGElement('path')
				.setPath('M '+fromX+' '+fromY+' q '+(deltaX / 2)+' '+(options.noteSlurPos.z * (from.svgElement.options.flip ? -1 : 1))+' '+deltaX+' '+deltaY)
				.setStroke('#000', 2)
				.setFill('none')
				.appendTo(from.tact.svgElement.node);
	};
	GameController.prototype.initView	= function (dontResetPos) {
		this.initViewSheet(dontResetPos);
	};
	GameController.prototype.initViewSheet	= function (dontResetPos) {
		var	that			= this,
			gameController	= this,
			game			= this.game,
			tactLeftPos		= 0,
			noteopt			= options.noteOptions,
			firstSlur,
			lastSlur,
			svgStartContainerPos	= 0;

		this.svgStartContainer.removeChildNodes();
		options.svgStartContainerPosSharp.forEach(function (toneName) {
			if(game.sharps[toneName]) {
				new SVGElement('text')
					.setInnerText('\u266F', 36, 'bold')
					.setPos(80 + svgStartContainerPos * 15, options.topPos + (options.lineHeight * (5.5 + options.tones.names[5][toneName].pos / 2)) - 2)
					.appendTo(that.svgStartContainer);

				svgStartContainerPos	+= 1;
			}
		});
		options.svgStartContainerPosFlat.forEach(function (toneName, i) {
			if(game.flats[toneName]) {
				new SVGElement('text')
					.setInnerText('\u266D', 36, 'bold')
					.setPos(80 + svgStartContainerPos * 15, options.topPos + (options.lineHeight * (5.5 + options.tones.names[i === 0 || i === 2 ? 4 : 5][toneName].pos / 2)) - 5)
					.appendTo(that.svgStartContainer);

				svgStartContainerPos	+= 1;
			}
		});

		if(dontResetPos !== true) {
			this.SVGNotes.animateAbs(0, 0, 0);
		}
		this.SVGNotes.removeChildNodes();

		var	coloredNotes	= [];
		if(L2P_global.colored_notes && !gameController.isEdit) {
			coloredNotes.push({
				pos:	options.tones.names[4]['C#'].pos,
				color:	'-yellow'
			});
			coloredNotes.push({
				pos:	options.tones.names[4]['G#'].pos,
				color:	'-green'
			});
			coloredNotes.push({
				pos:	options.tones.names[5]['D#'].pos,
				color:	'-red'
			});
			coloredNotes.push({
				pos:	-10000,
				color:	'-blue'
			});
		}

		if(this.game) {
			var	lastTact,
				lastNote,
				slurNote,
				crescendoStartNote,
				decrescendoStartNote;
			this.game.tacts.forEach(function (tact, tactNo) {
				var tactWidth	= tact.type.length * that.defWidth,
					tactPos		= that.startPos + tactLeftPos,
					noteLeftPos	= 0,
					noteTime	= 0,
					connections	= [];

				tactLeftPos	+= tactWidth;

				tact.svgElement	= new SVGElement('g').appendTo(that.svgNotes);
				new SVGElement('line')
					.setLine(tactPos, 75 + options.topPos, tactPos, options.lineHeight * 6 + 25 + options.topPos)
					.setStroke('#000', 2)
					.appendTo(tact.svgElement.node);

				if(!lastTact || lastTact.type.id !== tact.type.id) {
					var	texts	= tact.type.text.split('/');

					new	SVGElement('text')
						.setInnerText(texts[0], 36, 'bold')
						.setPos(tactPos - 15, 401 - 13)
						.addClass('music-text')
						.appendTo(tact.svgElement.node);
					new	SVGElement('text')
						.setInnerText(texts[1], 36, 'bold')
						.setPos(tactPos - 15, 401 + 13)
						.addClass('music-text')
						.appendTo(tact.svgElement.node);
				}
				if(gameController.isEdit) {
					new	SVGElement('text')
						.setInnerText(tactNo + 1, 20)
						.setPos(tactPos, 50 + options.topPos)
						.appendTo(tact.svgElement.node);
				}

				tact.nodes.forEach(function (note) {
					var noteWidth	= note.type.length * that.defWidth,
						notePos		= tactPos + that.defWidth / 16 + noteLeftPos - 20,
						tonePos 	= (note.tone.pos + 11) * options.lineHeight / 2 + 4,
						connect		= note.is(noteopt.join);

					noteLeftPos	+= noteWidth;

					note.svgElement	=
						new SVGElement(options.gameImageNodeType)
							.setRef(note)
							.setLink('/'+getImagePath(note, connect, coloredNotes, note.isFocus ? '-green' : ''))
							.setPos(notePos, tonePos)
							.setDimensions(50, 100)
							.addClass('note')
							.appendTo(tact.svgElement.node);

					if(note.isSharp || note.isFlat || note.is(noteopt.removekey)) {
						var	text	= '',
							y		= 95;
						if(note.isSharp) {
							text	= '\u266F';
						} else if(note.isFlat) {
							text	= '\u266D';
							y		= 90;
						} else if(note.is(noteopt.removekey)) {
							text	= '\u266E';
						}
						new SVGElement('text')
							.setInnerText(text, 36, 'bold')
							.setPos(notePos - 22, tonePos + y)
							.appendTo(tact.svgElement.node);
					}
					if(note.isPeriod) {
						new	SVGElement('circle')
							.setCircle(notePos + 25 + 10, tonePos + 84, 3)
							.appendTo(tact.svgElement.node);
					}

					if(note.is(noteopt.join) && connections.length > 0) {
						if(connections[0].svgElement.options.flip) {
							flipNote(note);
						}
					} else {
						if(note.tone.pos <= 0) {
							flipNote(note);
						}
					}

					// Extra Lines
					(function () {
						var	extraLine,
							y;
						for(extraLine = -6; extraLine >= note.tone.pos; extraLine -= 2) {
							y	= options.topPos + (extraLine / 2 + 5) * options.lineHeight;
							new SVGElement('line')
								.setLine(notePos - 5, y, notePos + 32, y)
								.setStroke('#000')
								.appendTo(tact.svgElement.node)
						}

						for(extraLine = 6; extraLine <= note.tone.pos; extraLine += 2) {
							y	= options.topPos + (extraLine / 2 + 5) * options.lineHeight;
							new SVGElement('line')
								.setLine(notePos - 5, y, notePos + 32, y)
								.setStroke('#000')
								.appendTo(tact.svgElement.node)
						}
					}());

					if(note.is(noteopt.slurend)) {
						if(slurNote) {
							that.drawSlur(slurNote, note);
							slurNote	= null;
						}
					}
					if(note.is(noteopt.slurstart)) {
						slurNote	= note;
					}

					if(note.is(noteopt.join)) {
						connections.push(note);
					}

					if(note.is(noteopt.crescendo)) {
						if(!crescendoStartNote) {
							crescendoStartNote	= note;
						}
					}
					else if(crescendoStartNote) {
						var	x1	= crescendoStartNote.svgElement.x,
							x2	= lastNote.svgElement.x + lastNote.length * that.defWidth - 10,
							y	= 390;

						new	SVGElement('line')
							.setLine(x1, y, x2, y - 10)
							.setStroke('#000', 2)
							.appendTo(crescendoStartNote.tact.svgElement.node);

						new	SVGElement('line')
							.setLine(x1, y, x2, y + 10)
							.setStroke('#000', 2)
							.appendTo(crescendoStartNote.tact.svgElement.node);

						crescendoStartNote	= null;
					}

					if(note.is(noteopt.decrescendo)) {
						if(!decrescendoStartNote) {
							decrescendoStartNote	= note;
						}
					}
					else if(decrescendoStartNote) {
						var	x1	= decrescendoStartNote.svgElement.x,
							x2	= lastNote.svgElement.x + lastNote.length * that.defWidth - 10,
							y	= 390;

						new	SVGElement('line')
							.setLine(x1, y - 10, x2, y)
							.setStroke('#000', 2)
							.appendTo(decrescendoStartNote.tact.svgElement.node);

						new	SVGElement('line')
							.setLine(x1, y + 10, x2, y)
							.setStroke('#000', 2)
							.appendTo(decrescendoStartNote.tact.svgElement.node);

						decrescendoStartNote	= null;
					}

					if(note.is(noteopt.mf)) {
						new	SVGElement('image')
							.setLink('/img/game/mezzo.svg')
							.setPos(note.svgElement.x - 28, 390 - 55 / 2 + 10)
							.setDimensions(50, 45)
							.appendTo(tact.svgElement.node);
						new	SVGElement('image')
							.setLink('/img/game/forte.svg')
							.setPos(note.svgElement.x + 10, 390 - 55 / 2)
							.setDimensions(41, 55)
							.appendTo(tact.svgElement.node);
					}
					if(note.is(noteopt.f)) {
						new	SVGElement('image')
							.setLink('/img/game/forte.svg')
							.setPos(note.svgElement.x, 390 - 55 / 2)
							.setDimensions(41, 55)
							.appendTo(tact.svgElement.node);
					}
					if(note.is(noteopt.ff)) {
						new	SVGElement('image')
							.setLink('/img/game/forte.svg')
							.setPos(note.svgElement.x - 10, 390 - 55 / 2)
							.setDimensions(41, 55)
							.appendTo(tact.svgElement.node);
						new	SVGElement('image')
							.setLink('/img/game/forte.svg')
							.setPos(note.svgElement.x + 10, 390 - 55 / 2)
							.setDimensions(41, 55)
							.appendTo(tact.svgElement.node);
					}
					if(note.is(noteopt.mp)) {
						new	SVGElement('image')
							.setLink('/img/game/mezzo.svg')
							.setPos(note.svgElement.x - 25, 390 - 55 / 2 + 10)
							.setDimensions(50, 45)
							.appendTo(tact.svgElement.node);
						new	SVGElement('image')
							.setLink('/img/game/piano.svg')
							.setPos(note.svgElement.x + 13, 390 - 55 / 2 + 9)
							.setDimensions(41, 45)
							.appendTo(tact.svgElement.node);
					}
					if(note.is(noteopt.p)) {
						new	SVGElement('image')
							.setLink('/img/game/piano.svg')
							.setPos(note.svgElement.x, 390 - 55 / 2 + 9)
							.setDimensions(41, 45)
							.appendTo(tact.svgElement.node);
					}
					if(note.is(noteopt.pp)) {
						new	SVGElement('image')
							.setLink('/img/game/piano.svg')
							.setPos(note.svgElement.x - 11, 390 - 55 / 2 + 9)
							.setDimensions(41, 45)
							.appendTo(tact.svgElement.node);
						new	SVGElement('image')
							.setLink('/img/game/piano.svg')
							.setPos(note.svgElement.x + 11, 390 - 55 / 2 + 9)
							.setDimensions(41, 45)
							.appendTo(tact.svgElement.node);
					}

					if(note.is(noteopt.staccato)) {
						new	SVGElement('circle')
							.setCircle(note.svgElement.x + 15, note.svgElement.y + 100 + (note.svgElement.options.flip ? -35 : 3), 3)
							.appendTo(tact.svgElement.node);
					}
					if(note.is(noteopt.fermata)) {
						var	fermataY	= note.svgElement.y + (note.svgElement.options.flip ? 45 : -17.5);
						if(fermataY > 149) {
							fermataY	= 149;
						}

						new	SVGElement('image')
							.setLink('/img/game/fermata.svg')
							.setPos(note.svgElement.x - 3.75, fermataY)
							.setDimensions(32.5, 17.5)
							.appendTo(tact.svgElement.node);
					}

					// Insert joins
					if(!note.is(noteopt.join) || connections.length >= 4) {
						makeConnections(tact, connections);
					}

					lastNote	= note;
				});

				makeConnections(tact, connections);

				lastTact	= tact;
			});
		}

		var	gameController		= this,
			totalWidth			= gameController.game.getWidth() - gameController.defWidth / 4;

		gameController.SVGNotes.node.style.width	= (totalWidth + gameController.defWidth / 4)+'px';
	};
	GameController.prototype.playNote	= function (note) {
		note.hasPlayed	= true;
		if(note.type.isRest) {
			this.sound.playRest();
		} else if(this.sound) {
			this.sound.play(note.tone.hz, note.isSlur);
		}
	};
	GameController.prototype.setGameSpeed	= function (speed) {
		if(this.game) {
			this.game.setSpeed(speed);
		}
	};
	GameController.prototype.importGame	= function (gameInfo, title, defaultOctave, fingerpos) {
		var	that	= this;

		this.fingerpos	= fingerpos;

		require(['game/game', 'game/tact', 'game/note', 'game/options'], function (Game, Tact, Node, options) {
			var game        = new Game(gameInfo[0]),
				octave		= defaultOctave || gameInfo[1][0];

			game.title			= title;
			game.startOctave	= octave;

			if(gameInfo[3]) {
				gameInfo[3].forEach(function (toneName) {
					game.setSharp(toneName);
				});
			}
			if(gameInfo[4]) {
				gameInfo[4].forEach(function (toneName) {
					game.setFlat(toneName);
				});
			}

			function findInObject(obj, id) {
				var valud;
				for(name in obj) {
					value = obj[name];
					if(value.id === id) {
						return value;
					}
				}
			}

			function createNote(id, octave, nodeName, noteOptions) {
				return new Node(findInObject(options.nodes.types, id), options.tones.names[octave][nodeName], noteOptions);
			}
			function createRest(id) {
				return new Node(findInObject(options.nodes.types.rest, id), options.tones.rest);
			}
			function applyTact(id, notes) {
				var tact    = new Tact(findInObject(options.tacts.types, id));

				notes.forEach(function (noteInfo) {
					if(!noteInfo[1]) {
						tact.addNode(createRest(noteInfo[0]));
					} else {
						tact.addNode(createNote(noteInfo[0], noteInfo[2] + octave, noteInfo[1], noteInfo[3]));
					}
				});

				game.addTact(tact);

				return;
			}

			gameInfo[2].forEach(function (tact) {
				applyTact(tact[0], tact[1]);
			});

			that.setGame(game);
		});
	};
	GameController.prototype.exportGame	= function () {
		var ex = [
			this.game.speed,
			[this.game.startOctave],
			[],
			[],
			[]
		];

		for(var toneName in this.game.sharps) {
			ex[3].push(toneName);
		}
		for(var toneName in this.game.flats) {
			ex[4].push(toneName);
		}

		this.game.tacts.forEach(function (tact) {
			var exTact = [
				tact.type.id,
				[]
			];
			tact.nodes.forEach(function (node) {
				var exNode  = [
					node.type.id,
					node.orgTone.name,
					node.orgTone.octav - ex[1][0],
					node.options
				];
				exTact[1].push(exNode);
			});
			ex[2].push(exTact);
		});

		return ex;
	};
	GameController.prototype.getTactX	= function (tact, callback) {
		var	gameController	= this,
			tacts			= gameController.game.tacts;

		require(['game/tact', 'game/options'], function (Tact, options) {
			var	i	= tact instanceof Tact ? tacts.indexOf(tact) : tact,
				x	= gameController.defWidth;

			x	-= options.markerPos;

			for(var j = 0; j < i; j += 1) {
				x	+= gameController.defWidth * tacts[j].length;
			}

			callback(x);
		});
	};
	GameController.prototype.getNoteX	= function (note, callback) {
		var	gameController	= this,
			tact			= note.tact;

		require(['game/note', 'game/options'], function (Note, options) {
			var	i	= tact.nodes.indexOf(note),
				x	= 0;

			for(var j = 0; j < i; j += 1) {
				x	+= gameController.defWidth * tact.nodes[j].length;
			}

			callback(x);
		});
	};
	GameController.prototype.moveToTact	= function (tact) {
		var	gameController	= this;

		if(tact === -1) {
			gameController.SVGNotes.animateAbs(0, 0, 0);
		} else {
			gameController.getTactX(tact, function (x) {
				gameController.SVGNotes.animateAbs(-x, 0, 0);
			});
		}
	};
	GameController.prototype.moveToNote	= function (note) {
		var	gameController	= this;

		gameController.getNoteX(note, function (noteX) {
			gameController.getTactX(note.tact, function (tactX) {
				gameController.SVGNotes.animateAbs(-(noteX + tactX), 0, 0);
			});
		});
	};
	GameController.prototype.isRunning	= function () {
		return this.game && this.game.running;
	};
	GameController.prototype.setPointerPos = function (pos) {
		this.svgPointer
			.setPos(options.leftMargin + options.markerPos, options.topPos + 50 + options.lineHeight * (pos / 2 + 3) - 0.85 * options.lineHeight * 0.5 + 1.5);
	};
	GameController.prototype.generatePercentColor	= function (colorPercent) {
		var	colorGreen	= 0,
			colorRed	= 0,
			colorBlue	= 0;

		if(colorPercent <= 0.15) {
			colorGreen	= Math.round(200 - 60 * colorPercent/0.15);
		} else if(colorPercent <= 0.95) {
			colorGreen	= Math.round(240 - 70 * (colorPercent - 0.15)/(0.95-0.15));
			colorRed	= Math.round(240 - 70 * (colorPercent - 0.15)/(0.95-0.15));
		} else {
			colorRed	= 170;
		}
		return 'rgb('+colorRed+', '+colorGreen+', '+colorBlue+')';
	};
	GameController.prototype.tactDone	= function () {
		if(this.currentTact) {
			this.currentTact.calculatePoints(this, L2P.funcs.tones.getStepFactor);

			this.point	+= this.currentTact.points;
			this.pointCon.text(this.point);
			this.showPointBox(this.currentTact.points, this.currentTact.stepFactor);
		}
	};
	GameController.prototype.currentLeft	= function () {
		var	gameController	= this,
			left			= -gameController.svgNotes.getBoundingClientRect().left + 45,
			useLeft			= left,
			timeRunning,
			factor;

		if(left === gameController.lastLeft && !gameController.paused) {
			timeRunning	= Date.now() - gameController.game.startTime;
			factor		= timeRunning / (gameController.game.getDuration() * 1000);
			//useLeft		= gameController.game.getWidth() * factor + 2;
		}
		gameController.lastLeft	= left;

		return useLeft;
	};
	GameController.prototype.soundInput = function (e, freq, tone, diff) {
		var	that			= this,
			gameController	= this,
			ratio;

		if(this.game && this.game.running) {
			var	newPos	= gameController.currentLeft();
			// console.log(newPos);

			this.game.tacts.forEach(function (tact) {
				if(tact.hasPlayed) {
					return;
				}
				tact.nodes.forEach(function (note) {
					var	relWidth		= (750 / 4) * (gameController.game.speed / 60) * 0.1,

						noteLeftPos		= note.svgElement.x - newPos + 20,
						noteLeftPosRel	= noteLeftPos + relWidth,

						noteRightPos	= noteLeftPos + note.type.length * that.defWidth,
						noteRightPosRel	= noteLeftPosRel + note.type.length * that.defWidth,

						currentPos		= options.markerPos + options.leftMargin + 10,
						relNotePosLeft	= currentPos - noteLeftPosRel,
						relNotePosRight	= noteRightPosRel - currentPos,

						otherNote;

					// Play the current note
					if(noteLeftPos <= currentPos && noteRightPos > currentPos) {
						if(!note.hasPlayed && gameController.playSound) {
							that.playNote(note);
						}
					}

					// Check the current note + the relative width
					if(noteLeftPosRel <= currentPos && noteRightPosRel > currentPos) {
						// We check weither we can use the note before or after
						var	noteIndex	= note.tact.nodes.indexOf(note),
							tactIndex,
							otherTact;

						if(relNotePosLeft < relWidth * 2) {
							if(noteIndex === 0) {
								tactIndex	= gameController.game.tacts.indexOf(note.tact);
								if(tactIndex > 0) {
									otherTact	= gameController.game.tacts[tactIndex - 1];
									otherNote	= otherTact.nodes[otherTact.nodes.length - 1];
								}
							} else {
								otherNote	= note.tact.nodes[noteIndex - 1];
							}
						} else if(relNotePosRight < relWidth * 2) {
							if(noteIndex === note.tact.nodes.length - 1) {
								tactIndex	= gameController.game.tacts.indexOf(note.tact);
								if(tactIndex < gameController.game.tacts.length - 1) {
									otherTact	= gameController.game.tacts[tactIndex + 1];
									otherNote	= otherTact.nodes[0];
								}
							} else {
								otherNote	= note.tact.nodes[noteIndex + 1];
							}
						}
						if(otherNote) {
							if(otherNote.isRest) {
								otherNote	= undefined;
							} else {
								if(otherNote.tone === tone) {
									note	= otherNote;
								}
							}
						}

						// If we got to a new note
						if(that.currentNote !== note) {
							if(!L2P_global.kiddie_mode && that.currentTact !== note.tact) {
								gameController.tactDone();
							}
							that.currentNote	= note;
							that.currentTact	= tact;
						}

						// Find the closest tone
						var	closeTone	= L2P.funcs.tones.getCloseTone(freq, tone, note.tone);
						freq		= closeTone.freq;
						tone		= closeTone.tone;
						toneDiff	= L2P.funcs.tones.freqDiffToTone(note.tone, freq, 0);

						// Update the compass
						if(that.compass) {
							that.compass.setTone(note.tone);
							that.compass.setFreq(freq);
						}

						// If we have kiddiemode enabled, we check for the correct tone
						if(L2P_global.kiddie_mode) {
							if(!note.isRest && (toneDiff.ratioRel > 0.15 || freq === -1) && !note.kiddieModeAccepted) {
								if(!gameController.paused) {
									gameController.pauseGame();
								}
								return;
							} else if(gameController.paused) {
								gameController.runGame();
							}
							note.kiddieModeAccepted	= true;
						}

						// Add the tick
						if(!note.isRest) {
							note.ticks.push(new Tick(freq, toneDiff));
						}

						var	colorPercent	= note.isRest ? 0 : Math.min(toneDiff.ratioRel, 1),
							color			= that.generatePercentColor(colorPercent);

						if(!L2P_global.blind_mode) {
							that.svgPointer.setFill(color);
							that.svgLine.setStroke(color, 3);
						}
					}
				});
			});
		} else {
			this.compass.setTone(tone);
			this.compass.setFreq(freq);
		}

		if(tone) {
			var	pos	= options.tones.all.indexOf(tone);
			if(pos === -1) {
				return;
			}
			if(diff > 0) {
				var	toneAbove	= options.tones.all[pos + 1],
					toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
				if(toneDiffs === 0) {
					toneAbove	= options.tones.all[pos + 2];
					toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
				}
				var	ratio		= diff / toneDiffs;
			} else {
				var	toneAbove	= options.tones.all[pos - 1],
					toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
				if(toneDiffs === 0) {
					toneAbove	= options.tones.all[pos - 2];
					toneDiffs	= Math.abs(toneAbove.hz - tone.hz);
				}
				var	ratio		= diff / toneDiffs;
			}

			that.setPointerPos(tone.pos - ratio);
		}
	};
	GameController.prototype.expectedTone	= function () {
		return this.currentNote && this.currentNote.tone;
	};
	GameController.prototype.generateGameData	= function () {
		var	data	= [
			1.1,					// 0	_v
			this.game.speed,		// 1	speed
			[],						// 2	tacts
			this.point,				// 3	points
			[						// 4	time
				this.game.startTime,						// 0	start
				this.game.stopTime -this.game.startTime,	// 1	stop
				this.game.getDuration()						// 2	game duration
			],
			this.permlink,			// 5	permlink
			this.game.startOctave,	// 6	startOctave
			this.fingerpos			// 7	fingerpos
		];

		this.game.tacts.forEach(function (tact) {
			var	tactData	= [
				[]		// notes
			];
			tact.nodes.forEach(function (note) {
				var	noteData	= [
					[],					// 0	ticks
					note.stepFactor,	// 1	stepFactor
					note.points,		// 2	points
					note.tone.name,		// 3	toneName
					note.tone.octav		// 4	toneOctav
				];
				note.ticks.forEach(function (tick) {
					var	tickData	= [
						tick.percent,			// 0	percent
						+tick.freq.toFixed(2),	// 1	freq
						tick.time - data[4][0]	// 2	time
					];
					noteData[0].push(tickData);
				});
				tactData[0].push(noteData);
			});

			data[2].push(JSON.stringify(tactData));
		});

		return JSON.stringify(data);
	};
	GameController.prototype.gameDone	= function () {
		if(!L2P_global.kiddie_mode && this.currentTact) {
			this.tactDone();
		}

		this.stopGame();

		if(this.isEdit) {
			this.moveToTact(this.edit.currentTact);
			return;
		}
		if(L2P_global.kiddie_mode) {
			return;
		}
		var	data	= this.generateGameData(),
			that	= this;
		$.post('/api/save.game.php', {
			data:	data
		}, function (gameInfo) {
			that.$this.trigger('gameEnd', {
				game_history_id:	gameInfo.game_history_id
			});
		});
	};

	return GameController;
});