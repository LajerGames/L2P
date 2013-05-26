define(function () {
	var	toneNames	= [
			[9, 'C', true, true],
			[7, 'D', true, true],
			[5, 'E', true, true],
			[4, 'F', false, true],
			[2, 'G', true, true],
			[0, 'A', true, true],
			[-2, 'B', true, false]
		],
		tones	= [
			{name:	'',		hz: 0,			pos: 1000,	octav:	0}
		];

	var	freq	= L2P_global && L2P_global.concert_pitch || 442;
	for(var octave = 0; octave <= 8; octave++) {
		var relOctave	= octave - 4;

		toneNames.forEach(function (toneInfo, toneNo) {
			var	pos			= toneInfo[0]
				name		= toneInfo[1],
				useFlat		= toneInfo[2],
				useSharp	= toneInfo[3],
				n			= relOctave * 12 - pos,
				toneFreq	= freq * Math.pow(2, n / 12);

			if(useFlat) {
				tones.push({
					name:	name+'b',
					hz:		freq * Math.pow(2, (n - 1) / 12),
					pos:	-relOctave * 7 - toneNo + 6,
					octav:	octave
				});
			}

			tones.push({
				name:	name,
				hz:		freq * Math.pow(2, n / 12),
				pos:	-relOctave * 7 - toneNo + 6,
				octav:	octave
			});

			if(useSharp) {
				tones.push({
					name:	name+'#',
					hz:		freq * Math.pow(2, (n + 1) / 12),
					pos:	-relOctave * 7 - toneNo + 6,
					octav:	octave
				});
			}
		});
	}

	tones.push({name:	'',		hz: 8000,		pos: -1000,	octav:	0});

	return tones;
});