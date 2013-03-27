define(['game/options', 'fM'], function (options, fM) {
	var	Game	= function (speed) {
		this.factor		= 1;
		this.defWidth	= 750 * this.factor;
		this.startPos	= options.leftMargin + this.defWidth;
		this.tacts		= [];
		this.running	= false;
		this.frame		= -1;
		this.length		= 0;
		this.speed;
		this.secPrNode;
		this.startTime;
		this.convasControl;
		this.sound;
		this.nodePlaying;
		this.stopTimeout;

		this.sharps		= {};
		this.flats		= {};

		this.setSpeed(speed);
	}
	Game.prototype.setSharp = function (toneName, isTrue) {
		this.sharps[toneName]	= isTrue === false ? false : true;
	};
	Game.prototype.setFlat = function (toneName, isTrue) {
		this.flats[toneName]	= isTrue === false ? false : true;
	};
	Game.prototype.setSpeed = function (speed) {
		if(!this.running) {
			this.speed		= speed;
			this.secPrNode	= 60 / this.speed;
		}
	};
	Game.prototype.addTact = function(tact) {
		tact.fill();
		tact.setKeys(this.sharps, this.flats);
		this.tacts.push(tact);
		this.length	+= tact.type.length;
	};
	Game.prototype.setOptions = function (canvasControl, sound) {
		this.canvasControl		= canvasControl;
		this.sound              = sound;

		this.drawView();

		console.log(this);
	};
	Game.prototype.start = function () {
		this.startTime	= Date.now();

		this.tacts.forEach(function (tact) {
			tact.nodes.forEach(function (node) {
				node.hasPlayed  = false;
				node.img        = node.type.img;
			});
		});

		this.running	= true;
		this.loop();

		this.stopTimeout	= setTimeout(this.stop.bind(this), (this.length + 1) * this.secPrNode * 1000 * 4);
	};
	Game.prototype.stop = function () {
		this.running = false;
		this.sound.clearSound();
		clearTimeout(this.stopTimeout);
	};
	Game.prototype.loop = function () {
		if(this.running) {
			this.drawView();
			if(fM.requestAnimationFrame) {
				window[fM.requestAnimationFrame](this.loop.bind(this));
			}
		}
	};
	Game.prototype.drawView = function() {
		this.frame += 1;

		this.canvasControl.clear();
		this.canvasControl.drawBaseLines(0);

		var timeNow		= Date.now(),
			timeDiff	= this.startTime ? timeNow - this.startTime : 0,
			timeDiffSec	= timeDiff / 1000,
			timeCurrent	= 0,
			factor		= 0.25,
			that		= this,
			tactLeftPos	= 0,
			isDone		= true;

		that.canvasControl.ctx.beginPath();
		that.canvasControl.ctx.lineWidth = 2;

		// Loop through all the tacts
		this.tacts.forEach(function (tact, tactNum) {
			var tactWidth	= tact.type.length * that.defWidth,
				tactSec		= tact.type.nodes * that.secPrNode,
				tactPos		= that.startPos + tactLeftPos - tactWidth * timeDiffSec / tactSec,
				nodeLeftPos	= 0;

			tactLeftPos	+= tactWidth;

			// If the tact is in the view area, we show it
			if(tactPos >= options.leftMargin - tactWidth) {
				isDone	= false;

				that.canvasControl.ctx.moveTo(tactPos, 40 + options.topPos);
				that.canvasControl.ctx.lineTo(tactPos, options.lineHeight * 6 + 10 + options.topPos);

				// Loop through the nodes in the tact
				tact.nodes.forEach(function (node) {
					var nodeWidth	= node.type.length * that.defWidth,
						nodeSec		= node.type.length * that.secPrNode,
						nodePos		= tactPos + that.defWidth / 16 + nodeLeftPos;

					nodeLeftPos	+= nodeWidth;

					// If the node is in the view area, we show it
					if(nodePos >= options.leftMargin - nodeWidth - that.defWidth / 16) {
						// Calculate the Y value of the node
						var tonePos = (node.tone.pos + 1) * options.lineHeight / 2;
						if(node.type.img) {
							that.canvasControl.ctx.drawImage(node.img, nodePos - 16, tonePos + options.topPos);
							if(node.isSharp) {
								that.canvasControl.insertSharp(nodePos - 44, tonePos + options.topPos + 104);
							}
							if(node.isFlat) {
								that.canvasControl.insertFlat(nodePos - 44, tonePos + options.topPos + 96);
							}
						}
						if(nodePos - 16 < (options.leftMargin + 100 + that.speed / 60 * options.waitTime / 4 ) && !node.hasPlayed) {
							that.playNode(node);
						}

						// Insert the extra lines
						// Second upper line
						if(node.tone.pos <= -8) {
							that.canvasControl.ctx.moveTo(nodePos - 16 - options.nodeLineExtra, options.topPos + 50 - options.lineHeight * 2);
							that.canvasControl.ctx.lineTo(nodePos + node.type.width + options.nodeLineExtra, options.topPos + 50 - options.lineHeight * 2);
						}
						// First upper line
						if(node.tone.pos <= -6) {
							that.canvasControl.ctx.moveTo(nodePos - 16 - options.nodeLineExtra, options.topPos + 50 - options.lineHeight);
							that.canvasControl.ctx.lineTo(nodePos + node.type.width + options.nodeLineExtra, options.topPos + 50 - options.lineHeight);
						}
						// First lower line
						if(node.tone.pos >= 6) {
							that.canvasControl.ctx.moveTo(nodePos - 16 - options.nodeLineExtra, options.topPos + 50 + options.lineHeight * 5);
							that.canvasControl.ctx.lineTo(nodePos + node.type.width + options.nodeLineExtra, options.topPos + 50 + options.lineHeight * 5);
						}
						// Second lower line
						if(node.tone.pos >= 8) {
							that.canvasControl.ctx.moveTo(nodePos - 16 - options.nodeLineExtra, options.topPos + 50 + options.lineHeight * 6);
							that.canvasControl.ctx.lineTo(nodePos + node.type.width + options.nodeLineExtra, options.topPos + 50 + options.lineHeight * 6);
						}
						// Third lower line
						if(node.tone.pos >= 10) {
							that.canvasControl.ctx.moveTo(nodePos - 16 - options.nodeLineExtra, options.topPos + 50 + options.lineHeight * 7);
							that.canvasControl.ctx.lineTo(nodePos + node.type.width + options.nodeLineExtra, options.topPos + 50 + options.lineHeight * 7);
						}
					}
				});
			}
		});

		if(isDone) {
			this.stop();
		}

		that.canvasControl.ctx.stroke();
		that.canvasControl.ctx.closePath();

		this.canvasControl.drawStartItems(0, this.sharps, this.flats);
	};
	Game.prototype.playNode = function (node) {
		this.nodePlaying    = node;
		node.hasPlayed  = true;
		if(node.type.isRest) {
			this.sound.playRest();
		} else if(this.sound) {
			this.sound.play(node.tone.hz, node.type.isSlur);
		}
	};
	Game.prototype.userPlayNode = function (feq) {
		if(this.nodePlaying.tone.hz === feq) {
			this.nodePlaying.img = images.nodes[this.nodePlaying.type.name+'True'];
		} else {
			this.nodePlaying.img = images.nodes[this.nodePlaying.type.name+'False'];
		}
		console.log(this.nodePlaying.tone.hz, feq);
	};

	return Game;
});