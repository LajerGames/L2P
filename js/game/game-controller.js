define(['jquery', 'svg', 'game/options', 'fM', 'api', 'l2p', 'game/tick'], function ($, SVGElement, options, fM, api, L2P, Tick) {
	function getImagePath(note, connect) {
		var	path	= options.gameImagePath;
		if(note.isRest) {
			path	+= note.type.name.substr(4, 1).toLowerCase() + note.type.name.substr(5) + 'rest';
		} else if(note.isPeriod) {
			path	+= note.type.name.substr(0, note.type.name.length - 6) + 'note-period';
		} else {
			if(connect) {
				path	+= 'quarter' + 'note';
			} else {
				path	+= note.type.name + 'note';
			}
		}

		return path + options.gameImageType;
	}
	function flipNote(note) {
		note.svgElement.setPos(note.svgElement.getX(), -175 - note.svgElement.getY() + 2 * 4);
		note.svgElement.node.style.webkitTransform	= 'scaleY(-1)';
		note.svgElement.options.flip				= true;
	}
	function unFlipNote(note) {
		note.svgElement.setPos(note.svgElement.getX(), note.svgElement.options.defY);
		note.svgElement.node.style.webkitTransform	= 'scaleY(1)';
		note.svgElement.options.flip				= false;
	}

	var	GameController	= function (svg) {
		var	that	= this;
		this.$this			= $(this);
		this.svg			= svg;
		this.svgBackground	= svg.querySelector('#background');
		this.SVGBackground	= new SVGElement(this.svgBackground);
		this.svgNotes		= svg.querySelector('#notes');
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

		$(fM.visibility).on('change', function (e, visibility) {
			if(visibility.hidden) {
				that.stopGame();
			}
		});

		for(var i = 50 + options.lineHeight; i <= 50 + options.lineHeight * 5; i += options.lineHeight) {
			new SVGElement('line')
				.setLine(0, i + options.topPos, '100%', i + options.topPos)
				.setStroke('#000')
				.appendTo(this.svgBackground);
		}
		new SVGElement('image')
			.setLink('/img/game/g-key.svg')
			.setPos(5, options.topPos + options.lineHeight)
			.setDimensions(63, 190)
			.appendTo(this.svgStart);
		this.svgStartContainer =
			new SVGElement('g')
				.appendTo(this.svgStart);
		this.svgLine =
			new SVGElement('line')
				.setLine(options.leftMargin + options.markerPos, options.topPos + 25 + options.lineHeight, options.leftMargin + options.markerPos, options.topPos + 50 + options.lineHeight * 6)
				.setStroke('#090', 3)
				.appendTo(this.svgStart);
		this.svgPointer	=
			new SVGElement('use')
				.setLink('#pointer')
				.setPos(options.leftMargin + options.markerPos, options.topPos + 50 + options.lineHeight * (4 / 2 - 0.5) - 0.85 * options.lineHeight * 0.5 + 1.5)
				.setFill('#090')
				.appendTo(this.svgStart);

		this.setPointerPos(1);

		this.factor;
		this.defWidth;
		this.startPos;
		this.setFactor(1);
	};
	GameController.prototype.showPointBox	= function (note) {
		var	g		= new SVGElement('g')
						.animateAbs(145, 150, 1);
		var	innerG	= new SVGElement('g')
						.appendTo(g);

		var	box		= new SVGElement('rect')
						.setDimensions(130, 55)
						.setFill(note.stepFactor.color)
						.setBorderRadius(5)
						.appendTo(innerG);

		var	text	= new SVGElement('text')
						.setPos(65, 20)
						.setFontSize(16)
						.setText(note.stepFactor.text)
						.appendTo(innerG);
		text.node.style.textAnchor	= 'middle';

		var	point	= new SVGElement('text')
						.setPos(65, 45)
						.setDimensions()
						.setText(note.points+' Points')
						.appendTo(innerG);
		point.node.style.textAnchor	= 'middle';

		g.appendTo(this.svgStart);
		setTimeout(function () {
			innerG.animateAbs(0, -50, 1);
			g.node.style.opacity	= 0;
		},0);

	};
	GameController.prototype.setFactor	= function (factor) {
		this.factor		= factor;
		this.defWidth	= 750 * this.factor;
		this.startPos	= options.leftMargin + this.defWidth;
	};
	GameController.prototype.setGame	= function (game) {
		game.controller	= this;
		this.game		= game;
		this.status		= 0;
		this.plus		= 0;
		this.minus		= 0;
		this.point		= 0;
		this.pointCon	= $('#pointContainer');
		this.currentNote	= undefined;

		console.log(this.game);
		this.game.reset();
		this.initView();

		this.$this.trigger('gameLoadSpeedChange', this.game.speed);
	};
	GameController.prototype.setRandomGame	= function (speed, tacts, restTacts) {
		var	that	= this;

		require(['game/game', 'game/tact', 'game/note', 'game/options', 'game/tones'], function (Game, Tact, Node, options, tones) {
			function tonesInMax(max) {
				var	canAdd	= [];
				if(max >= 1) {
					canAdd.push(options.nodes.types.whole);
				}
				if(max >= 1/2) {
					canAdd.push(options.nodes.types.half);
				}
				if(max >= 1/4) {
					canAdd.push(options.nodes.types.quarter);
					canAdd.push(options.nodes.types.quarter);
					canAdd.push(options.nodes.types.quarter);
				}
				if(max >= 1/8) {
					canAdd.push(options.nodes.types.eighth);
					canAdd.push(options.nodes.types.eighth);
				}
				if(max >= 1/16) {
					canAdd.push(options.nodes.types.sixteenth);
				}

				return canAdd;
			}

			var i,
				tact,
				node,
				tone,
				canAdd,
				toneId,
				nodeId,
				game = new Game(speed);

			for(i = 0; i < tacts; i += 1) {
				tact	= new Tact(options.tacts.types.quarter);
				max		= Math.round(Math.random() * 6);

				while(tact.remaining > 0 && max > 0) {
					canAdd	= tonesInMax(tact.remaining);

					toneId  = Math.ceil(Math.random(0)*tones.length-1);
					nodeId  = canAdd[Math.ceil(Math.random() * canAdd.length-1)];

					tone	= tones[toneId];
					node	= new Node(nodeId, tone);
					tact.addNode(node);

					max	-= 1;
				}

				game.addTact(tact);
			}

			that.setGame(game);
		});
	};
	GameController.prototype.startGame	= function (nextSong) {
		var	that	= this;

		if(this.game) {
			if(this.useCountdown) {
				api.get.lang(function (data) {
					L2P.countdown(3, data.game_start, that.game.title, function () {
						that.game.start();
						that.$this.trigger('gameStart');

						that.SVGNotes.node.style.webkitTransition	= '';
						that.SVGNotes.node.style.webkitTransform	= '';
						console.log(-that.game.getWidth(), that.game.getDuration());
						that.SVGNotes.animateX(-that.game.getWidth(), that.game.getDuration(), that.gameDone.bind(that));

						if(that.playSound) {
							that.loop(true);
						}
					});
				}, ['game_start']);
			} else {
				that.game.start();
				that.$this.trigger('gameStart');

				that.SVGNotes.node.style.webkitTransition	= '';
				that.SVGNotes.node.style.webkitTransform	= '';
				console.log(-that.game.getWidth(), that.game.getDuration());
				that.SVGNotes.animateX(-that.game.getWidth(), that.game.getDuration(), that.gameDone.bind(that));

				if(that.playSound) {
					that.loop(true);
				}
			}
		}
	};
	GameController.prototype.stopGame	= function () {
		if(this.game && this.game.running) {
			this.game.stop();

			this.SVGNotes.animateStopX();

			this.$this.trigger('gameStop');
			this.sound.clearSound();
		}
	};
	GameController.prototype.drawSlur	= function (from, to) {;
		var	fromPos	= from.svgElement.getAbsolutePos(),
			toPos	= to.svgElement.getAbsolutePos();

		new SVGElement('path')
			.setPath('M '+(fromPos.xc + options.noteSlurPos.x)+' '+(fromPos.yb + options.noteSlurPos.y)+' q '+((toPos.xc - fromPos.xc) / 2)+' '+options.noteSlurPos.z+' '+(toPos.xc - fromPos.xc)+' '+(toPos.yc - fromPos.yc))
			.setStroke('#000', 2)
			.setFill('none')
			.appendTo(from.tact.svgElement.node);
	};
	GameController.prototype.initView	= function () {
		var	that		= this,
			game		= this.game,
			tactLeftPos	= 0,
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

		this.SVGNotes.animateX(0, 0);
		this.SVGNotes.removeChildNodes();

		if(this.game) {
			var	lastNote;
			this.game.tacts.forEach(function (tact) {
				var tactWidth	= tact.type.length * that.defWidth,
					tactPos		= that.startPos + tactLeftPos,
					noteLeftPos	= 0,
					lastNote	= null,
					noteTime	= 0,
					connections	= [];

				tactLeftPos	+= tactWidth;

				tact.svgElement	= new SVGElement('g').appendTo(that.svgNotes);
				new SVGElement('line')
					.setLine(tactPos, 75 + options.topPos, tactPos, options.lineHeight * 6 + 25 + options.topPos)
					.setStroke('#000', 2)
					.appendTo(tact.svgElement.node);

				tact.nodes.forEach(function (note) {
					var noteWidth	= note.type.length * that.defWidth,
						notePos		= tactPos + that.defWidth / 16 + noteLeftPos,
						tonePos 	= (note.tone.pos + 11) * options.lineHeight / 2 + 4,
						connect		= false;

					noteTime	+= note.type.length;

					noteLeftPos	+= noteWidth;
					svgElement	= null;

					if(note.type.img) {
						if(note.length <= 1/8 && !note.isRest) {
							connections.push(note);
						}

						note.svgElement	= new SVGElement(options.gameImageNodeType)
											.setRef(note)
											.setLink('/'+getImagePath(note, connect))
											.setPos(notePos, tonePos)
											.setDimensions(50, 100)
											.appendTo(tact.svgElement.node);

						note.svgElement.options.defY	= tonePos;

						if(note.isSharp || note.isFlat || note.isRemoveKey) {
							var	text	= '',
								y		= 95;
							if(note.isSharp) {
								text	= '\u266F';
							} else if(note.isFlat) {
								text	= '\u266D';
								y		= 90;
							} else if(note.isRemoveKey) {
								text	= '\u266E';
							}
							new SVGElement('text')
								.setInnerText(text, 36, 'bold')
								.setPos(notePos - 25, tonePos + y)
								.appendTo(tact.svgElement.node);

						}

						if(note.tone.pos <= 0) {
							flipNote(note);
						}

						if(connect) {

						}
					}
					if(note.isSlur) {
						lastSlur	= note;
					} else {
						if(lastSlur) {
							that.drawSlur(firstSlur, lastSlur);
							lastSlur	= null;
						}
						firstSlur	= note;
					}

					while(noteTime >= 1/4) {
						if(connections.length > 1) {
							(function (connections) {
								var	first	= connections[0],
									last	= connections[connections.length - 1],
									flip	= first.svgElement.options.flip;

								connections.forEach(function (note) {
									note.svgElement.setLink('/'+getImagePath(note, true));
									if(note !== first) {
										if(flip && !note.svgElement.options.flip) {
											flipNote(note);
										} else if(!flip && note.svgElement.options.flip) {
											unFlipNote(note);
										}
									}
								});

								var	y1		= first.svgElement.options.defY + 11 + (flip ? 147 : 0),
									y2		= last.svgElement.options.defY + 11 + (flip ? 147 : 0),
									x		= last.length - first.length,
									a		= (y2 - y1) / x,
									moveY	= 0;

								if(connections.length > 2) {
									var	notePos		= 0 - first.length;
									connections.forEach(function (note) {
										var	realY	= note.svgElement.options.defY + 11 + (flip ? 147 : 0),
											diffY	= y1 - realY;

										if(!flip)
											console.log(realY, diffY, connections);

										if(flip && diffY < 0 && diffY < -moveY) {
											moveY	= -diffY;
										} else if(!flip && diffY > 0 && diffY > -moveY) {
											moveY	= -diffY;
										}

										notePos	+= note.length;
									});

									connections.forEach(function (note) {
										if(note.svgElement.getY() !== y1 + moveY) {
											new SVGElement('line')
												.setLine(note.svgElement.getX() + 25, note.svgElement.options.defY + 11 + (flip ? 147 : 0), note.svgElement.getX() + 25, y1 + moveY)
												.setStroke('#000', 2)
												.appendTo(tact.svgElement.node);
										}
									});

									y2	= y1;
								}

								var	lastNote	= null;
								connections.forEach(function (note) {
									if(lastNote) {
										if(lastNote.length === 1/16 && note.length === 1/16) {
											new	SVGElement('line')
												.setRef(connections)
												.setLine(lastNote.svgElement.getX() + 24, y1 + moveY + (flip ? -10 : +10), note.svgElement.getX() + 26, y2 + moveY + (flip ? -10 : +10))
												.setStroke('#000', 5)
												.appendTo(tact.svgElement.node);
										}
										new	SVGElement('line')
											.setRef(connections)
											.setLine(lastNote.svgElement.getX() + 24, y1 + moveY, note.svgElement.getX() + 26, y2 + moveY)
											.setStroke('#000', 5)
											.appendTo(tact.svgElement.node);
									}
									lastNote	= note;
								});
							}(connections));
						}
						connections	= [];
						noteTime	-= 1/4;
					}
				});
			});
		}
	};
	GameController.prototype.loop	= function (forceRun) {
		if(this.game && this.game.running) {
			var	newPos	= -this.SVGNotes.getPos().x;
			if(newPos !== this.lastPos || forceRun === true) {
				this.lastPos	= newPos;

				this.game.runAtPos(newPos);

				if(fM.requestAnimationFrame) {
					window[fM.requestAnimationFrame](this.loop.bind(this));
				}
			} else {
				this.stopGame();
			}
		}
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
	GameController.prototype.importGame	= function (gameInfo, title) {
		var	that	= this;

		require(['game/game', 'game/tact', 'game/note', 'game/options'], function (Game, Tact, Node, options) {
			if(!gameInfo.speed) {
				that.importGameMin.call(that, gameInfo, title);
				return;
			}
			var game        = new Game(gameInfo.speed);
			game.title		= title;

			if(gameInfo.sharps) {
				gameInfo.sharps.forEach(function (toneName) {
					game.setSharp(toneName);
				});
			}
			if(gameInfo.flats) {
				gameInfo.flats.forEach(function (toneName) {
					game.setFlat(toneName);
				});
			}

			function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
				return new Node(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey ? true : false, isSlur ? true : false);
			}
			function createRest(type) {
				return new Node(options.nodes.types.rest[type], options.tones.rest);
			}
			function applyTact(type, nodes) {
				var tact    = new Tact(options.tacts.types[type]);

				nodes.forEach(function (nodeInfo) {
					if(nodeInfo.type.substr(0, 4) === 'rest') {
						tact.addNode(createRest(nodeInfo.type.substr(4).toLowerCase()));
					} else {
						tact.addNode(createNote(nodeInfo.type, nodeInfo.toneOctave, nodeInfo.toneType, nodeInfo.isRemoveKey, nodeInfo.isSlur));
					}
				});

				game.addTact(tact);

				return;
			}

			gameInfo.tacts.forEach(function (tact) {
				applyTact(tact.name, tact.nodes);
			});

			that.setGame(game);
		});
	};
	GameController.prototype.importGameMin	= function (gameInfo, title) {
		var	that	= this;

		require(['game/game', 'game/tact', 'game/note', 'game/options'], function (Game, Tact, Node, options) {
			var game        = new Game(gameInfo[0]),
				octave		= gameInfo[1][0];

			game.title		= title;

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

			function createNote(id, octave, nodeName, isRemoveKey, isSlur) {
				return new Node(findInObject(options.nodes.types, id), options.tones.names[octave][nodeName], isRemoveKey === 1 ? true : false, isSlur === 1 ? true : false);
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
						tact.addNode(createNote(noteInfo[0], noteInfo[2] + octave, noteInfo[1], noteInfo[3], noteInfo[4]));
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
	GameController.prototype.exportGame	= function (dontMinify) {
		if(!dontMinify) {
			return this.exportGameMin();
		}
		var ex = {
			speed:  this.game.speed,
			tacts:  [],
			sharps:	[],
			flats:	[]
		};

		for(var toneName in this.game.sharps) {
			ex.sharps.push(toneName);
		}
		for(var toneName in this.game.flats) {
			ex.flats.push(toneName);
		}

		this.game.tacts.forEach(function (tact) {
			var exTact = {
				name:   tact.type.name,
				nodes:  []
			};
			tact.nodes.forEach(function (node) {
				var exNode  = {
					type:       	node.type.name,
					toneType:   	node.tone.name,
					toneOctave: 	node.tone.octav,
					isRemoveKey:	node.isRemoveKey,
					isSlur:			node.isSlur
				};
				exTact.nodes.push(exNode);
			});
			ex.tacts.push(exTact);
		});

		return ex;
	};
	GameController.prototype.exportGameMin	= function () {
		var ex = [
			this.game.speed,
			[],
			[],
			[]
		];

		for(var toneName in this.game.sharps) {
			ex[2].push(toneName);
		}
		for(var toneName in this.game.flats) {
			ex[3].push(toneName);
		}

		this.game.tacts.forEach(function (tact) {
			var exTact = [
				tact.type.id,
				[]
			];
			tact.nodes.forEach(function (node) {
				var exNode  = [
					node.type.id,
					node.tone.name,
					node.tone.octav,
					node.isRemoveKey ? 1 : 0,
					node.isSlur ? 1: 0
				];
				exTact[1].push(exNode);
			});
			ex[1].push(exTact);
		});

		return ex;
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
	GameController.prototype.soundInput = function (freq, tone, diff) {
		var	that	= this,
			ratio;

		if(this.game && this.game.running) {
			var	timeRunning	= Date.now() - that.game.startTime,
				factor		= timeRunning / (that.game.getDuration() * 1000),
				newPos		= that.game.getWidth() * factor + 2;

			this.game.tacts.forEach(function (tact) {
				if(tact.hasPlayed) {
					return;
				}
				tact.nodes.forEach(function (note) {
					var	noteLeftPos	= note.svgElement.getX() - newPos;

					if(noteLeftPos <= (options.markerPos + options.leftMargin + 10) && (noteLeftPos + note.type.length * that.defWidth) > (options.markerPos + options.leftMargin + 10)) {
						if(that.currentNote === undefined) {
							that.currentNote	= note;
						}
						if(that.currentNote !== note) {
							that.currentNote.calculatePoints(that);
							that.point	+= that.currentNote.points;
							that.pointCon.text(that.point);
							that.showPointBox(that.currentNote);
							that.currentNote	= note;
						}
						var	closeTone	= L2P.funcs.tones.getCloseTone(freq, tone, note.tone);
						freq	= closeTone.freq;
						tone	= closeTone.tone;
						toneDiff	= L2P.funcs.tones.freqDiffToTone(note.tone, freq, 0);
						//console.log(freq, note.tone.hz);

						if(that.compass) {
							that.compass.setTone(note.tone);
							that.compass.setFreq(freq);
						}

						note.ticks.push(new Tick(freq, toneDiff));

						var	correct			= toneDiff.diffAbs < 5,
							colorPercent	= Math.min(toneDiff.ratioRel, 1);

						var	color			= that.generatePercentColor(colorPercent);

						that.svgPointer.setFill(color);
						that.svgLine.setStroke(color, 3);

						var points	= 10 - toneDiff.diffAbs;
						if(points < 0) {
							points	= 0;
						} else {
							//that.point	+= +points.toFixed(0);
							//that.pointCon.text(that.point);
						}

						that.status	= that.status + (correct ? 1 : -1);
						if(correct) {
							that.plus++;
						} else {
							that.minus++;
						}

						nodePlaying	= true;
					}
				});
			});
		} else {
			this.compass.setTone(tone);
			this.compass.setFreq(freq);
		}

		if(tone) {
			if(Math.abs(diff) < 2 && false) {
				that.setPointerPos(tone.pos);
			} else {
				var	pos	= options.tones.all.indexOf(tone);
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
		}
	};
	GameController.prototype.generateGameData	= function () {
		var	data	= [
			1,					// 0	_v
			this.game.speed,	// 1	speed
			[],					// 2	tacts
			this.point,			// 3	points
			[					// 4	time
				this.game.startTime,						// 0	start
				this.game.stopTime -this.game.startTime,	// 1	stop
				this.game.getDuration()						// 2	game duration
			],
			this.permlink		// 5	permlink
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
						tick.freq,				// 1	freq
						tick.time - data[4][0]	// 2	time
					];
					noteData[0].push(tickData);
				});
				tactData[0].push(noteData);
			});

			data[2].push(JSON.stringify(tactData));
		});

		//console.log(data);

		return JSON.stringify(data);
	};
	GameController.prototype.gameDone	= function () {
		if(this.currentNote) {
			this.currentNote.calculatePoints(this);
			this.point	+= this.currentNote.points;
			this.pointCon.text(this.point);
			this.showPointBox(this.currentNote);
		}

		this.stopGame();

		var	data	= this.generateGameData(),
			that	= this;
		$.post('/api/save.game.php', {
			data:	data
		}, function (gameInfo) {
			that.$this.trigger('gameEnd', {
				points: {
					status:	that.status,
					plus:	that.plus,
					minus:	that.minus
				},
				game_history_id:	gameInfo.game_history_id
			});
		});
		//console.log(this.status, this.plus, this.minus);
	}

	return GameController;
});