define(['game/options', 'fM'], function (options, fM) {
	var	Sound	= function () {
		var	sound		= this;
		this.waitTime	= options.waitTime;

		this.playAfterTimeout	= false;
		this.gain				= 2;

		if(fM.audioContext) {
			this.ctx    	= new window[fM.audioContext]();
			this.oscillator	= this.ctx.createOscillator();
			this.gainNode	= this.ctx.createGainNode();
			this.gainNode.gain.value		= 0;

			this.oscillator.connect(this.gainNode);
			this.gainNode.connect(this.ctx.destination);

			this.oscillator.start(0);
		}
	}
	Sound.prototype.play = function (freq, isSlur) {
		if(!fM.audioContext) {
			return;
		}
		var sound    = this;

		if(!isSlur) {
			this.clearSound();
		}

		this.playAfterTimeout	= true;
		setTimeout(function () {
			if(sound.playAfterTimeout) {
				sound.gainNode.gain.setValueAtTime(sound.gain, 0);
				sound.oscillator.frequency.setValueAtTime(freq, 0);
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
		this.playAfterTimeout		= false;
		this.gainNode.gain.setValueAtTime(0, 0);
	};

	return Sound;
});