define(['jquery', 'game/options', 'l2p'], function ($, options, L2P) {
	function Compass($box) {
		this.toneBefore;
		this.tone;
		this.toneAfter;
		this.hz		= -1;
		this.$box	= $box;

		this.$toneBefore	= this.$box.find('.ContentBoxGameCompass-tone-before');
		this.$tone			= this.$box.find('.ContentBoxGameCompass-tone-current');
		this.$toneAfter		= this.$box.find('.ContentBoxGameCompass-tone-after');
		this.$arrow			= this.$box.find('.ContentBoxGameCompass-line');
	}
	Compass.prototype.setTone	= function (tone) {
		if(this.tone !== tone && tone) {
			this.tone		= tone;

			this.toneBefore	= L2P.funcs.tones.getClosestTone(tone, true);
			this.toneAfter	= L2P.funcs.tones.getClosestTone(tone, false);

			this.$toneBefore.text(this.toneBefore ? this.toneBefore.name : '');
			this.$tone.text(this.tone.name || '');
			this.$toneAfter.text(this.toneAfter.name || '');

			this.setFreq(this.tone.hz);
		}
	};
	Compass.prototype.setFreq	= function (hz) {
		if(this.hz !== hz && hz !== -1) {
			this.hz	= hz;
			var	toneDiff	= L2P.funcs.tones.freqDiffToTone(this.tone, hz, 0),
				ratio1		= toneDiff.ratio > 0 ? Math.min(toneDiff.ratio, 1) : Math.max(toneDiff.ratio, -1),
				arrowPos	= 50 + 50 * -ratio1;

			this.$arrow.css('margin-left', arrowPos+'%');
		}
	};
	Compass.prototype.show		= function () {

	};
	Compass.prototype.hide		= function () {

	};

	return Compass;
});