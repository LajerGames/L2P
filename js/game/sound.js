define(['game/options', 'fM'], function (options, fM) {
	var	Sound	= function () {
		this.bufferSize = 1024;
		this.numInputs  = 1;
		this.numOutputs = 2;
		this.waitTime	= options.waitTime;

		this.pos            	= 0;

		this.playAfterTimeout	= false;
		this.currentPhase   	= 0.0;
		this.phaseIncrement 	= 0;
		this.feq            	= 440;

		if(fM.audioContext) {
			this.ctx    = new window[fM.audioContext]();
			this.node   = this.ctx.createJavaScriptNode(this.bufferSize, this.numInputs, this.numOutputs);

			this.node.onaudioprocess = this.player.bind(this);
			this.node.connect(this.ctx.destination);
		}
	}
	Sound.prototype.player = function (e) {
		// Get the left and right output buffers
		var left  = e.outputBuffer.getChannelData(0);
		var right = e.outputBuffer.getChannelData(1);

		// For each output sample
		var numSamples = right.length;
		for (var i = 0; i < numSamples; i++)
		{
			// Get a sine wave value
			var val = 0.1 * Math.sin(this.currentPhase);

			// Put it in the left and right buffer
			left[i] = val;
			right[i] = val;

			// Increment the phase
			this.currentPhase += this.phaseIncrement;
		}
	};
	Sound.prototype.play = function (feq, isSlur) {
		if(!fM.audioContext) {
			return;
		}
		var that    = this;

		if(!isSlur) {
			this.clearSound();
		}

		this.playAfterTimeout	= true;
		setTimeout(function () {
			if(that.playAfterTimeout) {
				that.feq        = feq;
				that.calculatePhaseIncrement();
			}
		}, this.waitTime);
	};
	Sound.prototype.playRest = function () {
		if(!fM.audioContext) {
			return;
		}
		setTimeout(this.clearSound.bind(this), this.waitTime);
	};
	Sound.prototype.clearSound = function () {
		if(!fM.audioContext) {
			return;
		}
		this.playAfterTimeout	= false;
		if(this.feq !== 0) {
			this.feq        = 0;
			this.calculatePhaseIncrement();
		}
	};
	Sound.prototype.calculatePhaseIncrement = function () {
		if(!fM.audioContext) {
			return;
		}
		this.phaseIncrement = 2 * Math.PI * this.feq / this.ctx.sampleRate;
	};

	return Sound;
});