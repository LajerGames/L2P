define(['game/options', 'fM'], function (options, fM) {
	var	Game	= function (speed) {
		this.defaultSpeed	= speed;
		this.startOctave	= 4;
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
		this.stopTime;
		this.convasControl;
		this.sound;
		this.nodePlaying;
		this.stopTimeout;
		this.controller;
		this.title		= '';
		this.duration	= -1;
		this.width		= -1;

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
	Game.prototype.reset = function () {
		this.tacts.forEach(function (tact) {
			tact.svgElement	= null;
			tact.hasPlayed	= false;
			tact.nodes.forEach(function (note) {
				note.svgElement	= null;
				note.hasPlayed  = false;
				note.img        = note.type.img;
				note.ticks		= [];
				note.kiddieModeAccepted	= false;
			});
		});
	};
	Game.prototype.start = function () {
		this.startTime	= Date.now();

		this.running	= true;
	};
	Game.prototype.stop = function () {
		this.stopTime	= Date.now();

		this.running = false;
	};
	Game.prototype.getWidth = function () {
		if(this.width === -1) {
			var	that	= this,
				width	= options.leftMargin + this.defWidth;
			this.tacts.forEach(function (tact) {
				width	+= tact.type.length * that.defWidth;
			});

			this.width	= width;
		}

		return this.width;
	};
	Game.prototype.getDuration = function () {
		if(this.duration === -1) {
			var	that		= this,
				duration	= 4 * this.secPrNode;

			this.tacts.forEach(function (tact) {
				duration	+= tact.type.nodes * that.secPrNode;
			});

			DEBUG && console.log(this.secPrNode, duration);

			this.duration	= duration;
		}

		return this.duration;
	};
	Game.prototype.runAtPos = function (x) {
		var	that	= this;
		this.tacts.forEach(function (tact) {
			if(tact.hasPlayed) {
				return;
			}
			tact.nodes.forEach(function (note) {
				if(note.hasPlayed) {
					return;
				}
				if(note.svgElement.node.getBBox().x - x < options.markerPos + options.leftMargin + 10) {
					that.controller.playNote(note);
				}
			});
		});
	};
	Game.prototype.userPlayNode = function (feq) {
		if(this.nodePlaying.tone.hz === feq) {
			this.nodePlaying.img = images.nodes[this.nodePlaying.type.name+'True'];
		} else {
			this.nodePlaying.img = images.nodes[this.nodePlaying.type.name+'False'];
		}
		DEBUG && console.log(this.nodePlaying.tone.hz, feq);
	};

	return Game;
});