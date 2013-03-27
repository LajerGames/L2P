define(function () {
	function Tick(freq, toneDiff) {
		this.time		= Date.now();
		this.freq		= freq;
		this.toneDiff	= toneDiff;

		if(this.toneDiff.diffAbs >= 10) {
			this.percent	= 0;
		} else {
			this.percent	= ((10 - this.toneDiff.diffAbs) / 10) * 100;
		}
	}
	return Tick;
});