define(['jquery'], function ($) {
	var	GameController	= function (canvas) {
		this.canvas			= canvas;
		this.sound;
		this.canvasControl;
		this.game;
	};
	GameController.prototype.setGame	= function (game) {
		var	that	= this;
		require(['game/sound', 'game/canvascontrol'], function (Sound, CanvasControl) {
			if(!that.sound) {
				that.sound	= new Sound();
			}
			if(!that.canvasControl) {
				that.canvasControl	= new CanvasControl(that.canvas);
			}

			game.setOptions(that.canvasControl, that.sound);

			that.game	= game;

			$(that).trigger('gameLoadSpeedChange', that.game.speed);
		});
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
	GameController.prototype.startGame	= function () {
		if(this.game) {
			this.game.start();
		}
	};
	GameController.prototype.stopGame	= function () {
		if(this.game) {
			this.game.stop();
		}
	};
	GameController.prototype.setGameSpeed	= function (speed) {
		if(this.game) {
			this.game.setSpeed(speed);
		}
	};
	GameController.prototype.importGame	= function (gameJSON) {
		var	that	= this;

		require(['game/game', 'game/tact', 'game/note', 'game/options'], function (Game, Tact, Node, options) {
			var gameInfo    = JSON.parse(gameJSON),
				game        = new Game(gameInfo.speed);

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

			function createNote(type, octave, nodeName) {
				return new Node(options.nodes.types[type], options.tones.names[octave][nodeName]);
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
						tact.addNode(createNote(nodeInfo.type, nodeInfo.toneOctave, nodeInfo.toneType));
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
	GameController.prototype.exportGame	= function () {
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
					type:       node.type.name,
					toneType:   node.tone.name,
					toneOctave: node.tone.octav
				};
				exTact.nodes.push(exNode);
			});
			ex.tacts.push(exTact);
		});

		return ex;
	};
	GameController.prototype.isRunning	= function () {
		return this.game && this.game.running;
	};

	return GameController;
});