define(function () {
	function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
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

	var options = {
		leftMargin:		180,
		markerPos:		100,
		topPos:			100,
		lineHeight:		25,
		waitTime:		30,
		nodeLineExtra:	3,
		gameImageNodeType:	'image',
		gameImagePath:	'img/game/',
		gameImageType:	'.svg',
		noteSlurPos:	{
			x:	-10,
			y:	0,
			z:	50
		},
		svgStartContainerPosSharp: ['F', 'C', 'G', 'D', 'A', 'E'],
		svgStartContainerPosFlat: ['B', 'E', 'A', 'D', 'G', 'C'],
		tones:	{},
		tacts:	{
			types:		{
				quarter:	{
					name:	'quarter',
					length:	1,
					nodes:	4,
					id:		1,
					text:	'4/4',
					max:	4,
					split:	[1/8 * 4, 1/8 * 4]
				},
				threeForth:	{
					name:	'threeForth',
					length:	3/4,
					nodes:	3,
					id:		2,
					text:	'3/4',
					max:	3,
					split:	[1/8 * 3, 1/8 * 3]
				},
				fiveForth:	{
					name:	'fiveForth',
					length:	5/4,
					nodes:	5,
					id:		3,
					text:	'5/4',
					max:	4,
					split:	[1/8 * 4, 1/8 * 4, 1/8 * 2]
				},
				sixForth:	{
					name:	'sixForth',
					length:	6/4,
					nodes:	6,
					id:		4,
					text:	'6/4',
					max:	4,
					split:	[1/8 * 4, 1/8 * 4, 1/8 * 4]
				},
				twoForth:	{
					name:	'twoForth',
					length:	2/4,
					nodes:	2,
					id:		5,
					text:	'2/4',
					max:	4,
					split:	[1/8 * 4]
				},
				twelveEights:	{
					name:	'twelveEights',
					length:	12/8,
					nodes:	12,
					id:		6,
					text:	'12/8',
					max:	4,
					split:	[1/8 * 4, 1/8 * 4, 1/8 * 4]
				}
			}
		},
		nodes:	{
			types:	{
				whole:	{
					name:	'whole',
					length:	1/1,
					img:	true,
					width:	16,
					id:		1,
					factor:	1.85
				},
				half:	{
					name:	'half',
					length:	1/2,
					img:	true,
					width:	14,
					id:		2,
					factor:	1.5
				},
				halfPeriod:	{
					name:	'halfPeriod',
					length:	1/2 * 1.5,
					img:	true,
					width:	14,
					id:		3,
					factor:	1.72
				},
				quarter:	{
					name:	'quarter',
					length:	1/4,
					img:	true,
					width:	14,
					id:		4,
					factor:	1
				},
				quarterPeriod:	{
					name:	'quarterPeriod',
					length:	1/4 * 1.5,
					img:	true,
					width:	14,
					id:		5,
					factor:	1.15
				},
				eighth:	{
					name:	'eighth',
					length:	1/8,
					img:	true,
					width:	14,
					id:		6,
					factor:	0.85
				},
				eighthPeriod:	{
					name:	'eighthPeriod',
					length:	1/8 * 1.5,
					img:	true,
					width:	14,
					id:		7,
					factor:	0.97
				},
				sixteenth:	{
					name:	'sixteenth',
					length:	1/16,
					img:	true,
					width:	14,
					id:		8,
					factor:	0.7
				},
				sixteenthPeriod:	{
					name:	'sixteenthPeriod',
					length:	1/16 * 1.5,
					img:	true,
					width:	14,
					id:		9,
					factor:	80
				},
				rest:	{}
			}
		},
		noteOptions:	{
			removekey:		0,
			slurstart:		1,
			slurend:		2,
			join:			3,
			crescendo:		4,
			decrescendo:	5,
			thrill:			6,
			staccato:		7,
			fermata:		8,
			triplets:		9,
			mp:				10,
			p:				11,
			pp:				12,
			mf:				13,
			f:				14,
			ff:				15
		},
		generateTones:	function () {
			options.tones	= {
				all:	[],
				names:	{
					0:	{},
					1:	{},
					2:	{},
					3:	{},
					4:	{},
					5:	{},
					6:	{},
					7:	{},
					8:	{}
				},
				hertz:	{},
				pos:	{},
				rest:	{
					pos:	3
				}

			};

			options.tones.all.push({
				name:	'',
				hz: 	0,
				pos: 	1000,
				octav:	0
			});

			var	freq	= L2P_global.concert_pitch || 442;
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
						options.tones.all.push({
							name:	name+'b',
							hz:		freq * Math.pow(2, (n - 1) / 12),
							pos:	-relOctave * 7 - toneNo + 6,
							octav:	octave
						});
					}

					options.tones.all.push({
						name:	name,
						hz:		freq * Math.pow(2, n / 12),
						pos:	-relOctave * 7 - toneNo + 6,
						octav:	octave
					});

					if(useSharp) {
						options.tones.all.push({
							name:	name+'#',
							hz:		freq * Math.pow(2, (n + 1) / 12),
							pos:	-relOctave * 7 - toneNo + 6,
							octav:	octave
						});
					}
				});
			}

			options.tones.all.push({name:	'',		hz: 8000,		pos: -1000,	octav:	0});

			options.tones.all.forEach(function (tone) {
				options.tones.names[tone.octav][tone.name]	= tone;
				options.tones.hertz[tone.hz]	= tone;

				options.tones.pos[tone.pos]	= options.tones.pos[tone.pos] || {};
				options.tones.pos[tone.pos][tone.name.substr(1)]	= tone;
			});

			function getClosestTone(tone, lower) {
				var	pos	= options.tones.all.indexOf(tone),
					t;

				if((pos === 0 && lower) || (pos === (options.tones.all.length - 1) && !lower)) {
					return null;
				}
				if(lower) {
					t	= options.tones.all[pos - 1];
					if(t.hz === tone.hz) {
						t	= options.tones.all[pos - 2]
					}
				} else {
					t	= options.tones.all[pos + 1];
					if(t.hz === tone.hz) {
						t	= options.tones.all[pos + 2]
					}
				}

				return t;
			}

			options.tones.all.forEach(function (tone) {
				tone.close	= {
					lower:	getClosestTone(tone, true),
					higher:	getClosestTone(tone, false)
				};
			});
		}
	};

	function makeRestNodes() {
		for(var name in options.nodes.types) {
			if(name !== 'rest' && name !== 'whole' && name !== 'half' && name.indexOf('Period') === -1) {
				var rest		= $.extend(true, {}, options.nodes.types[name]);
				rest.isRest	= true;
				rest.name		= 'rest' + capitaliseFirstLetter(name);
				rest.img		= true;
				rest.hasPlayed  = true;

				options.nodes.types.rest[name]	= rest;
			}
		}
	}
	makeRestNodes();

	options.generateTones();

	return options;
});