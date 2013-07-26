define(['jquery', 'dsp', 'game/options', 'l2p'], function ($, dsp, options, L2P) {
	var	DSP	= dsp.DSP,
		setupTypedArray		= dsp.setupTypedArray,
		FourierTransform	= dsp.FourierTransform,
		DFT					= dsp.DFT,
		FFT					= dsp.FFT,
		RFFT				= dsp.RFFT,
		Sampler				= dsp.Sampler,
		Oscillator			= dsp.Oscillator,
		ADSR				= dsp.ADSR,
		IIRFilter			= dsp.IIRFilter,
		IIRFilter2			= dsp.IIRFilter2,
		WindowFunction		= dsp.WindowFunction,
		sinh				= dsp.sinh,
		Biquad				= dsp.Biquad,
		GraphicalEq			= dsp.GraphicalEq,
		MultiDelay			= dsp.MultiDelay,
		SingleDelay			= dsp.SingleDelay,
		Reverb				= dsp.Reverb,
		abekat = 0;

	var Tuner,
		frequencies,
		root,
		__hasProp = {}.hasOwnProperty;

		frequencies	= [];
	options.tones.all.forEach(function (tone) {
		frequencies[tone.name+tone.octav]	= tone;
	});

	window.requestAnimationFrame	= (function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function () {};
	}());

	function Tuner(err, toneChange, expectedTone) {
		var	tuner	= this,
			countdown;

		tuner.$tuner			= $(tuner);
		tuner.noiseCount		= 0;
		tuner.noiseThreshold	= -Infinity

		var audioContext, bufferFillSize, bufferFiller, error, hp, i, lp, success;
		window.AudioContext = (function() {
			return window.AudioContext || window.mozAudioContext || window.webkitAudioContext || window.msAudioContext || window.oAudioContext;
		})();
		if (!window.AudioContext) {
			return err('audioContext');
		}
		navigator.getUserMedia = (function() {
			return navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
		})();
		if (!navigator.getUserMedia) {
			return err('getUserMedia');
		}
		audioContext = new AudioContext();
		tuner.sampleRate = audioContext.sampleRate;
		tuner.fftSize = 8192;
		tuner.fft = new FFT(tuner.fftSize, tuner.sampleRate / 4);
		tuner.buffer = (function() {
			var _i, _results;
			_results = [];
			for (i = _i = 0; 0 <= tuner.fftSize ? _i < tuner.fftSize : _i > tuner.fftSize; i = 0 <= tuner.fftSize ? ++_i : --_i) {
				_results.push(0);
			}
			return _results;
		})();

		bufferFillSize = 2048;
		bufferFiller = audioContext.createJavaScriptNode(bufferFillSize, 1, 1);
		bufferFiller.onaudioprocess = function(e) {
			var b, input, _i, _j, _ref, _ref1, _results;
			input = e.inputBuffer.getChannelData(0);
			for (b = _i = bufferFillSize, _ref = tuner.buffer.length; bufferFillSize <= _ref ? _i < _ref : _i > _ref; b = bufferFillSize <= _ref ? ++_i : --_i) {
				tuner.buffer[b - bufferFillSize] = tuner.buffer[b];
			}
			_results = [];
			for (b = _j = 0, _ref1 = input.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; b = 0 <= _ref1 ? ++_j : --_j) {
				_results.push(tuner.buffer[tuner.buffer.length - bufferFillSize + b] = input[b]);
			}
			return _results;
		};
		tuner.gauss = new WindowFunction(DSP.GAUSS);
		lp = audioContext.createBiquadFilter();
		lp.type = lp.LOWPASS;
		lp.frequency = 8000;
		lp.Q = 0.1;
		hp = audioContext.createBiquadFilter();
		hp.type = hp.HIGHPASS;
		hp.frequency = 20;
		hp.Q = 0.1;
		success = function(stream) {
			if(countdown) {
				countdown.kill();
			}
			var src;
			tuner.resetNoise();
			try {
				src = audioContext.createMediaStreamSource(stream);
				src.connect(lp);
				lp.connect(hp);
				hp.connect(bufferFiller);
				bufferFiller.connect(audioContext.destination);
			} catch (e) {
				error(e);
			}

			tuner.tickDone(-1);
		};
		error = function(e) {
			// console.log(e);

			if(countdown) {
				countdown.kill();
			}

			countdown	= L2P.countdown(0, [
				{
					text:	L2P_global.lang.game_permission_denied,
					sec:	1,
					type:	'none',
					css:	{
						'font-size':	'4vw'
					}
				}
			], '', '', function () {
				//this.reload();
			}, {
				lazyHide:			true,
				bottom:				'<a href="#" style="position: relative;z-index: 101;">Refresh<br><img src="/img/icons/refresh_white.svg" /></a>',
				background_color:	'#71C211'
			});

			$('#overlay .countdown .bottom a').click(function (e) {
				e.preventDefault();
				location.href	= location.origin;
			})
		};

		countdown = L2P.countdown(0, [
			{
				text:	L2P_global.lang.game_permission_ask_initial,
				sec:	15,
				type:	'long'
			}
		], L2P_global.lang.game_permission_ask, '', function () {
			countdown	= L2P.countdown(0, [
				{
					text:	L2P_global.lang.game_permission_ask_helpful,
					sec:	5,
					type:	'long'
				},
				{
					text:	L2P_global.lang.game_permission_ask_helpful_2,
					sec:	5,
					type:	'long'
				},
				{
					text:	L2P_global.lang.game_permission_ask_helpful_3,
					sec:	5,
					type:	'long'
				},
				{
					text:	L2P_global.lang.game_permission_ask_impatient,
					sec:	5,
					type:	'long'
				},
				{
					text:	L2P_global.lang.game_permission_ask_impatient_sigh,
					sec:	5,
					type:	'long'
				}
			], L2P_global.lang.game_permission_ask, '', function () {
				this.reload();
			}, {
				classList:	[
					'microphone-permission'
				],
				lazyHide:	true
			});
		}, {
			classList:	[
				'microphone-permission'
			]
		});
		return navigator.getUserMedia({
			audio: true
		}, success, error);
	};
	Tuner.prototype.process		= function () {
		var	tuner	= this,
			b, bufferCopy, diff, downsampled, firstFreq, freq, interp, left, note, p, peak, peaks, q, right, s, secondFreq, spectrumPoints, thirdFreq, upsampled, x, _i, _j, _k, _l, _len, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;

		bufferCopy = (function() {
			var _i, _len, _results;
			_results = [];
			for (_i = 0, _len = tuner.buffer.length; _i < _len; _i++) {
				b = tuner.buffer[_i];
				_results.push(b);
			}
			return _results;
		})();
		tuner.gauss.process(bufferCopy);
		downsampled = [];
		for (s = _i = 0, _ref = bufferCopy.length; _i < _ref; s = _i += 4) {
			downsampled.push(bufferCopy[s]);
		}
		upsampled = [];
		for (_j = 0, _len = downsampled.length; _j < _len; _j++) {
			s = downsampled[_j];
			upsampled.push(s);
			upsampled.push(0);
			upsampled.push(0);
			upsampled.push(0);
		}
		tuner.fft.forward(upsampled);
		if (tuner.noiseCount < 50) {
			tuner.noiseThreshold = _.reduce(tuner.fft.spectrum, (function(max, next) {
				if (next > max) {
					return next;
				} else {
					return max;
				}
			}), tuner.noiseThreshold);
			tuner.noiseThreshold = tuner.noiseThreshold > 0.001 ? 0.001 : tuner.noiseThreshold;
			tuner.noiseCount++;
		}
		spectrumPoints = (function() {
			var _k, _ref1, _results;
			_results = [];
			for (x = _k = 0, _ref1 = tuner.fft.spectrum.length / 4; 0 <= _ref1 ? _k < _ref1 : _k > _ref1; x = 0 <= _ref1 ? ++_k : --_k) {
				_results.push({
					x: x,
					y: tuner.fft.spectrum[x]
				});
			}
			return _results;
		})();
		spectrumPoints.sort(function(a, b) {
			return b.y - a.y;
		});
		peaks = [];
		for (p = _k = 0; _k < 8; p = ++_k) {
			if (spectrumPoints[p].y > tuner.noiseThreshold * 5) {
				peaks.push(spectrumPoints[p]);
			}
		}
		if (peaks.length > 0) {
			for (p = _l = 0, _ref1 = peaks.length; 0 <= _ref1 ? _l < _ref1 : _l > _ref1; p = 0 <= _ref1 ? ++_l : --_l) {
				if (peaks[p] != null) {
					for (q = _m = 0, _ref2 = peaks.length; 0 <= _ref2 ? _m < _ref2 : _m > _ref2; q = 0 <= _ref2 ? ++_m : --_m) {
						if (p !== q && (peaks[q] != null)) {
							if (Math.abs(peaks[p].x - peaks[q].x) < 5) {
								peaks[q] = null;
							}
						}
					}
				}
			}
			peaks = (function() {
				var _len1, _n, _results;
				_results = [];
				for (_n = 0, _len1 = peaks.length; _n < _len1; _n++) {
					p = peaks[_n];
					if (p != null) {
						_results.push(p);
					}
				}
				return _results;
			})();
			peaks.sort(function(a, b) {
				return a.x - b.x;
			});
			tuner.maxPeaks = tuner.maxPeaks < peaks.length ? peaks.length : tuner.maxPeaks;
			peak = null;
			firstFreq = peaks[0].x * (tuner.sampleRate / tuner.fftSize);
			if (peaks.length > 1) {
				secondFreq = peaks[1].x * (tuner.sampleRate / tuner.fftSize);
				if ((1.4 < (_ref3 = firstFreq / secondFreq) && _ref3 < 1.6)) {
					peak = peaks[1];
				}
			}
			if (peaks.length > 2) {
				thirdFreq = peaks[2].x * (tuner.sampleRate / tuner.fftSize);
				if ((1.4 < (_ref4 = firstFreq / thirdFreq) && _ref4 < 1.6)) {
					peak = peaks[2];
				}
			}
			/*peak	= (function (expectedTone, peaks) {
				var	diff,
					closestPeak	= null;
				if(peaks.length === 0 || expectedTone === undefined) {
					return null;
				}

				peaks.forEach(function (peak) {
					peak.hz	= peak.x * (tuner.sampleRate / tuner.fftSize);
					if(Math.abs(expectedTone.hz - peak.hz) < diff || diff === undefined) {
						diff		= Math.abs(expectedTone.hz - peak.hz);
						closestPeak	= peak;
					}
				});

				return closestPeak;
			}(expectedTone(), peaks));*/
			peaks.sort(function (a, b) {
				return a.y < b.y;
			});

			if (peaks.length > 1 || tuner.maxPeaks === 1 || tuner.maxPeaks === 2 || tuner.maxPeaks === 3) {
				if (!(peak != null)) {
					peak = peaks[0];
				}
				left = {
					x: peak.x - 1,
					y: Math.log(tuner.fft.spectrum[peak.x - 1])
				};
				peak = {
					x: peak.x,
					y: Math.log(tuner.fft.spectrum[peak.x])
				};
				right = {
					x: peak.x + 1,
					y: Math.log(tuner.fft.spectrum[peak.x + 1])
				};
				interp = 0.5 * ((left.y - right.y) / (left.y - (2 * peak.y) + right.y)) + peak.x;
				freq = interp * (tuner.sampleRate / tuner.fftSize);
				_ref5 = tuner.getPitch(freq), note = _ref5[0], diff = _ref5[1];
				tuner.tickDone(freq, note, diff);
			} else {
				tuner.tickDone(-1);
			}
		} else {
			tuner.maxPeaks = 0;
			tuner.tickDone(-1);
		}
	};
	Tuner.prototype.tickDone	= function (freq, note, diff) {
		var	tuner	= this;

		requestAnimationFrame($.proxy(tuner.process, tuner));
		tuner.$tuner.trigger('tick', [freq, note, diff]);
	};
	Tuner.prototype.resetNoise	= function () {
		var	tuner	= this;

		L2P.countdown(0, [
			{
				text:	L2P_global.lang.game_measuring,
				sec:	2,
				type:	'long',
				css:	{
					'font-size':	'9vw'
				}
			}
		], '', '', function () {
			L2P.countdown(3, null, L2P_global.lang.game_measuring_quiet, '', function () {
				setTimeout(function () {
					tuner.noiseCount		= 0;
					tuner.noiseThreshold	= -Infinity;
					tuner.maxPeaks			= 0;
				}, 1000);

				L2P.countdown(0, [
					{
						text:	L2P_global.lang.game_measuring_shh,
						sec:	2,
						type:	'long'
					},
					{
						text:	L2P_global.lang.game_measuring_done,
						sec:	2,
						type:	'long',
						css:	{
							'font-size':	L2P_global.lang.game_measuring_done.length <= 15 ? '12vw' : '7.5vw'
						}
					}
				], '', '', function () {
					tuner.$tuner.trigger('noise_ok', []);
				});
			});
		})
	};
	Tuner.prototype.getPitch	= function (freq) {
		var	tuner	= this,
			diff	= Infinity,
			key,
			minDiff	= Infinity,
			tone,
			toneFound;

		for (key in frequencies) {
			if (!__hasProp.call(frequencies, key)) continue;

			tone = frequencies[key];
			if (Math.abs(freq - tone.hz) < minDiff) {
				minDiff		= Math.abs(freq - tone.hz);
				diff		= freq - tone.hz;
				toneFound	= tone;
			}
		}
		return [toneFound, diff];
	};

	return Tuner;
});