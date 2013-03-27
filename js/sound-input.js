define(['jquery', 'dsp', 'game/tones'], function ($, dsp, tones) {
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
		Reverb				= dsp.Reverb;

	var Tuner, frequencies, root,
		__hasProp = {}.hasOwnProperty;

		frequencies	= [];
	tones.forEach(function (tone) {
		frequencies[tone.name+tone.octav]	= tone;
	});

	Tuner = function (err, toneChange) {
		var	requestAnimationFrame	= requestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame || mozRequestAnimationFrame || oRequestAnimationFrame || function () {};

		var audioContext, buffer, bufferFillSize, bufferFiller, error, fft, fftSize, gauss, hp, i, lp, sampleRate, success;
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
		sampleRate = audioContext.sampleRate;
		fftSize = 8192;
		fft = new FFT(fftSize, sampleRate / 4);
		buffer = (function() {
			var _i, _results;
			_results = [];
			for (i = _i = 0; 0 <= fftSize ? _i < fftSize : _i > fftSize; i = 0 <= fftSize ? ++_i : --_i) {
				_results.push(0);
			}
			return _results;
		})();
		bufferFillSize = 2048;
		bufferFiller = audioContext.createJavaScriptNode(bufferFillSize, 1, 1);
		bufferFiller.onaudioprocess = function(e) {
			var b, input, _i, _j, _ref, _ref1, _results;
			input = e.inputBuffer.getChannelData(0);
			for (b = _i = bufferFillSize, _ref = buffer.length; bufferFillSize <= _ref ? _i < _ref : _i > _ref; b = bufferFillSize <= _ref ? ++_i : --_i) {
				buffer[b - bufferFillSize] = buffer[b];
			}
			_results = [];
			for (b = _j = 0, _ref1 = input.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; b = 0 <= _ref1 ? ++_j : --_j) {
				_results.push(buffer[buffer.length - bufferFillSize + b] = input[b]);
			}
			return _results;
		};
		gauss = new WindowFunction(DSP.GAUSS);
		lp = audioContext.createBiquadFilter();
		lp.type = lp.LOWPASS;
		lp.frequency = 8000;
		lp.Q = 0.1;
		hp = audioContext.createBiquadFilter();
		hp.type = hp.HIGHPASS;
		hp.frequency = 20;
		hp.Q = 0.1;
		success = function(stream) {
			function tickDone(freq, note, diff) {
				toneChange(freq, note, diff);
				requestAnimationFrame(process);
			}

			var getPitch, maxPeaks, maxTime, noiseCount, noiseThreshold, process, src;
			maxTime = 0;
			noiseCount = 0;
			noiseThreshold = -Infinity;
			maxPeaks = 0;
			try {
				src = audioContext.createMediaStreamSource(stream);
				src.connect(lp);
				lp.connect(hp);
				hp.connect(bufferFiller);
				bufferFiller.connect(audioContext.destination);
				process = function() {
					var b, bufferCopy, diff, downsampled, firstFreq, freq, interp, left, noiseThrehold, note, p, peak, peaks, q, right, s, secondFreq, spectrumPoints, thirdFreq, upsampled, x, _i, _j, _k, _l, _len, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
					bufferCopy = (function() {
						var _i, _len, _results;
						_results = [];
						for (_i = 0, _len = buffer.length; _i < _len; _i++) {
							b = buffer[_i];
							_results.push(b);
						}
						return _results;
					})();
					gauss.process(bufferCopy);
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
					fft.forward(upsampled);
					if (noiseCount < 10) {
						noiseThreshold = _.reduce(fft.spectrum, (function(max, next) {
							if (next > max) {
								return next;
							} else {
								return max;
							}
						}), noiseThreshold);
						noiseThrehold = noiseThreshold > 0.001 ? 0.001 : noiseThreshold;
						noiseCount++;
					}
					spectrumPoints = (function() {
						var _k, _ref1, _results;
						_results = [];
						for (x = _k = 0, _ref1 = fft.spectrum.length / 4; 0 <= _ref1 ? _k < _ref1 : _k > _ref1; x = 0 <= _ref1 ? ++_k : --_k) {
							_results.push({
								x: x,
								y: fft.spectrum[x]
							});
						}
						return _results;
					})();
					spectrumPoints.sort(function(a, b) {
						return b.y - a.y;
					});
					peaks = [];
					for (p = _k = 0; _k < 8; p = ++_k) {
						if (spectrumPoints[p].y > noiseThreshold * 10) {
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
						maxPeaks = maxPeaks < peaks.length ? peaks.length : maxPeaks;
						peak = null;
						firstFreq = peaks[0].x * (sampleRate / fftSize);
						if (peaks.length > 1) {
							secondFreq = peaks[1].x * (sampleRate / fftSize);
							if ((1.4 < (_ref3 = firstFreq / secondFreq) && _ref3 < 1.6)) {
								peak = peaks[1];
							}
						}
						if (peaks.length > 2) {
							thirdFreq = peaks[2].x * (sampleRate / fftSize);
							if ((1.4 < (_ref4 = firstFreq / thirdFreq) && _ref4 < 1.6)) {
								peak = peaks[2];
							}
						}
						if (peaks.length > 1 || maxPeaks === 1 || maxPeaks === 2 || maxPeaks === 3) {
							if (!(peak != null)) {
								peak = peaks[0];
							}
							left = {
								x: peak.x - 1,
								y: Math.log(fft.spectrum[peak.x - 1])
							};
							peak = {
								x: peak.x,
								y: Math.log(fft.spectrum[peak.x])
							};
							right = {
								x: peak.x + 1,
								y: Math.log(fft.spectrum[peak.x + 1])
							};
							interp = 0.5 * ((left.y - right.y) / (left.y - (2 * peak.y) + right.y)) + peak.x;
							freq = interp * (sampleRate / fftSize);
							_ref5 = getPitch(freq), note = _ref5[0], diff = _ref5[1];
							tickDone(freq, note, diff);
						} else {
							tickDone(-1);
						}
					} else {
						maxPeaks = 0;
						tickDone(-1);
					}
				};
			} catch (e) {
				error(e);
			}
			getPitch = function(freq) {
				var diff, key, minDiff, tone, toneFound;
				minDiff = Infinity;
				diff = Infinity;
				for (key in frequencies) {
					if (!__hasProp.call(frequencies, key)) continue;
					tone = frequencies[key];
					if (Math.abs(freq - tone.hz) < minDiff) {
						minDiff = Math.abs(freq - tone.hz);
						diff = freq - tone.hz;
						toneFound	= tone;
					}
				}
				return [toneFound, diff];
			};
			tickDone(-1);
		};
		error = function(e) {
			console.log(e);
			console.log('ARE YOU USING CHROME CANARY (23/09/2012) ON A MAC WITH "Web Audio Input" ENABLED IN chrome://flags?');
			return alert('ERROR: CHECK ERROR CONSOLE');
		};

		return navigator.getUserMedia({
			audio: true
		}, success, error);
	};

	return Tuner;
});