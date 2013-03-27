define(function () {
	var	AudioControl	= function () {
		this.floatSampeles	= 4096;
		this.sampleRate		= 44100;

		this.ctx	= new webkitAudioContext();
		this.buffer	= this.ctx.createBuffer(1, this.floatSampeles, this.sampleRate);
	}
	AudioControl.prototype.playSound = function (hz, pos) {
		var	i,
			node,
			sound	= this.buffer.getChannelData(0);

		for(i = 0; i < this.floatSampeles; ++i) {
			sound[i]	= Math.sin(hz * PI2 * i / this.sampleRate);
		}

		node		= this.ctx.createBufferSource(0);
		node.buffer	= this.buffer;
		node.connect(this.ctx.destination);
		node.noteOn(this.ctx.currentTime + pos);
	};

	return AudioControl;
});