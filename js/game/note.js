define(function() {
	var	steps	= [
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
	];
	function Note(type, tone, noteOptions) {
		noteOptions	= noteOptions || [];

		this.type			= type;
		this.tone			= tone;
		this.orgTone		= this.tone;
		this.options		= noteOptions;
		this.isRemoveKey	= noteOptions.indexOf(0) !== -1;
		this.hasPlayed		= false;
		this.length			= this.type.length;
		this.img			= this.type.img;
		this.isSharp		= this.tone.name && this.tone.name.substr(1) === '#';
		this.isFlat			= this.tone.name && this.tone.name.substr(1) === 'b';
		this.isPeriod		= this.type.name.indexOf('Period') !== -1;
		this.isRest 		= this.type.isRest;
		this.isSlur			= false;
		this.ticks			= [];
		this.stepPercent	= 0;
		this.stepFactor;
		this.points			= 0;
		this.kiddieModeAccepted	= false;
		this.isFocus		= false;
	}
	Note.prototype.is		= function (i) {
		return this.options.indexOf(i) !== -1;
	};
	Note.prototype.add		= function (id) {
		if(!this.is(id)) {
			this.options.push(id);

			return true;
		}

		return false;
	};
	Note.prototype.rm		= function (id) {
		if(this.is(id)) {
			this.options.splice(this.options.indexOf(id), 1);

			return true;
		}

		return false;
	};
	Note.prototype.toggle	= function (id) {
		if(this.is(id)) {
			this.rm(id);
		} else {
			this.add(id);
		}

		return this;
	};
	Note.prototype.calculatePoints	= function (gameController) {
		var	that			= this,
			totalPercent	= 0,
			speedFactor		= 1 + (gameController.game.speed - gameController.game.defaultSpeed) / 200,
			factor;

		this.ticks.forEach(function (tick) {
			totalPercent	+= Math.max(tick.percent, 0);
		});

		this.stepPercent	= totalPercent / this.ticks.length;

		steps.forEach(function (step) {
			if(!that.stepFactor && that.stepPercent >= step.percent) {
				that.stepFactor	= step;
			}
		});

		factor	= this.stepFactor && this.stepFactor.factor || 0;

		this.points	= +((this.stepPercent * 100).toFixed(0) * factor * speedFactor * this.type.factor * 0.1).toFixed(0) || 0;
		$(gameController).trigger('notePoints', [this]);
	};
	Note.prototype.setThisFocus	= function () {
		this.isFocus	= true;
		if(this.svgElement) {
			this.svgElement.setLink(this.svgElement.link.href.substr(0, this.svgElement.link.href.length - 4) + '-green.svg');
		}

		return this;
	};
	Note.prototype.unsetThisFocus	= function () {
		this.isFocus	= false;
		if(this.svgElement) {
			this.svgElement.setLink(this.svgElement.link.href.replace('-green', ''));
		}

		return this;
	};

	return Note;
});
