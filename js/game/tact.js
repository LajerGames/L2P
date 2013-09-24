define(['jquery', 'game/options', 'game/note'], function ($, options, Node) {
	var	Tact	= function (type) {
		this.type		= type;
		this.length		= this.type.length;
		this.remaining	= this.length;
		this.nodes		= [];
		this.points		= 0;
		this.done		= false;

		this.noteLength		= 0;
		this.notePercent	= 0;

		this.stepFactor;
	}
	Tact.prototype.addNode = function(node) {
		if(this.remaining >= node.length) {
			node.tact	= this;
			this.nodes.push(node);
			this.remaining	-= node.length;
			return true;
		} else {
			return false;
		}
	};
	Tact.prototype.fill = function () {
		while(this.remaining > 0) {
			if(this.remaining % (1/4) === 0) {
				this.addNode(new Node(options.nodes.types.rest.quarter, options.tones.rest));
			} else if(this.remaining % (1/8) === 0) {
				this.addNode(new Node(options.nodes.types.rest.eighth, options.tones.rest));
			} else if(this.remaining % (1/16) === 0) {
				this.addNode(new Node(options.nodes.types.rest.sixteenth, options.tones.rest));
			}
		}
	};
	Tact.prototype.setKeys = function (sharps, flats) {
		var sharps	= $.extend({}, sharps);
		var flats	= $.extend({}, flats);
		this.nodes.forEach(function (node) {
			if(node.type.isRest) {
				return;
			}
			node.tone	= node.orgTone;

			if(node.is(options.noteOptions.removekey)) {
				delete sharps[node.orgTone.name];
				delete flats[node.orgTone.name];
			} else {
				if(node.isSharp) {
					sharps[node.orgTone.name.substr(0,1)]	= true;
				}
				if(node.isFlat) {
					flats[node.orgTone.name.substr(0,1)]	= true;
				}
				if(!node.isSharp && sharps[node.orgTone.name]) {
					node.tone	= options.tones.names[node.orgTone.octav][node.orgTone.name+'#'];
				}
				if(!node.isFlat && flats[node.orgTone.name]) {
					node.tone	= options.tones.names[node.orgTone.octav][node.orgTone.name+'b'];
				}
			}
		});
	};
	Tact.prototype.calculatePoints	= function (gameController, getStepFactor) {
		var	tact		= this,
			noteLength	= 0,
			notePercent	= 0;

		this.points		= 0;

		this.nodes.forEach(function (note) {
			if(!note.isRest) {
				note.calculatePoints(gameController);

				notePercent	+= note.stepPercent * note.length;
				noteLength	+= note.length;
				tact.points	+= note.points || 0;
			}
		});

		this.stepFactor	= getStepFactor(notePercent / noteLength);
	};

	return Tact;
});