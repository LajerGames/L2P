define(['game/tones'], function (tones) {
	function capitaliseFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

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
		tones:	{
			all:	tones,
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
		},
		tacts:	{
			types:		{
				quarter:	{
					name:	'quarter',
					length:	1,
					nodes:	4,
					id:		1
				},
				threeForth:	{
					name:	'threeForth',
					length:	3/4,
					nodes:	3,
					id:		2
				},
				fiveForth:	{
					name:	'fiveForth',
					length:	5/4,
					nodes:	5,
					id:		3
				},
				sixForth:	{
					name:	'sixForth',
					length:	6/4,
					nodes:	6,
					id:		4
				},
				twoForth:	{
					name:	'twoForth',
					length:	2/4,
					nodes:	2,
					id:		5
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

	tones.forEach(function (tone) {
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

	tones.forEach(function (tone) {
		tone.close	= {
			lower:	getClosestTone(tone, true),
			higher:	getClosestTone(tone, false)
		};
	});

	return options;
});