define(['jquery', 'fM', 'l2p', 'api', 'highcharts'], function ($, fM, L2P, api, Highcharts) {
	return (function ($dialog) {
		var	data		= JSON.parse($dialog.find('[data-statistic]').attr('data-statistic')) || {},
			$containers	= $dialog.find('.statistic-graph'),
			$formSearch	= $dialog.find('form[name="search"]'),
            path		= location.pathname.split('/'),
			precision,
			pointsPerMinute,
			precisionPerTact,
			formatter	= function () {
				return '<b>'+this.x+': '+this.y;
			},
			formatterKey	= function () {
				return '<b>'+this.x+': '+this.y+' %</b><br><br>'+this.key;
			};

        $dialog.find('.BottomTableView tr').on('click', function() {
            var	$tr		= $(this),
            	gameid			= $tr.attr('data-gameid'),
            	gamestartoctave	= $tr.attr('data-gamestartoctave'),
            	gamehistoryid	= $tr.attr('data-gamehistoryid'),
            	handposition	= $tr.attr('data-handposition');

            if(gameid !== undefined) {
            	$formSearch.find('input[name="game_ids"]').val(gameid);
			}
            if(gamestartoctave !== undefined) {
            	$formSearch.find('input[name="game_startoctave"]').val(gamestartoctave);
			}
            if(gamehistoryid !== undefined) {
            	$formSearch.find('input[name="game_history_ids"]').val(gamehistoryid);
			}
            if(handposition !== undefined) {
            	$formSearch.find('input[name="game_handposition"]').val(handposition);
			}

           	$dialog.find('.BottomTableView tr').off('click');

            api.get.statistic_uuid(function (data) {
            	var	path	= location.pathname.split('/');
            	path[4]	= data.uuid;
            	path[5]	= '';

            	fM.link.navigate(path.join('/'));
            }, fM.form.getElements.call($formSearch[0]));
        });

        // console.log(data);
        data.forEach(function (graphData, i) {
        	if(!graphData) {
				return;
        	}
			if(graphData.type === 'GamePrecision') {
				precision	= new Highcharts.Chart({
					chart:	{
						renderTo:	$containers[i],
						type:		'column'
					},
					credits: {
						enabled:	false
					},
					legend:	{
						enabled:			graphData.graph.series.length !== 1,
						backgroundColor:	'#FFFFFF',
						layout:				'vertical',
						align:				'right',
						verticalAlign:		'top',
						floating:			true,
						y:					5
					},
					title:	{
						text:		graphData.name
					},
					xAxis:	{
						categories:	graphData.graph.categories
					},
					yAxis:	{
						min:	0,
						max:	100,
						title:	{
							text:	graphData.y
						}
					},
					series:	graphData.graph.series.map(function (serie) {
						serie.data	= serie.data.map(function (y) {
							return +(+y).toFixed(2);
						});
						return serie;
					}),
					tooltip:	{
						formatter:	formatter
					}
				});
			} else if(graphData.type === 'PrecisionPerTact') {
				precisionPerTact	= new Highcharts.Chart({
					chart:	{
						renderTo:	$containers[i],
						type:		'line'
					},
					credits: {
						enabled:	false
					},
					legend:	{
						enabled:			graphData.graph.series.length !== 1,
						backgroundColor:	'#FFFFFF',
						layout:				'vertical',
						align:				'right',
						verticalAlign:		'top',
						floating:			true,
						y:					5
					},
					title:	{
						text:		graphData.name
					},
					xAxis:	{
						categories:	graphData.graph.categories
					},
					yAxis:	{
						min:	0,
						title:	{
							text:	graphData.y
						}
					},
					series:	graphData.graph.series.map(function (serie) {
						serie.data.forEach(function (point) {
							point.y		= +(+point.y).toFixed(2);
							point.name	= $.map(point.notes, function (value, key) {
								return key+': '+(value.toFixed(2))+' %';
							}).join('<br>');
						});

						return serie;
					}),
					tooltip:	{
						formatter:	formatterKey
					}
				});
			} else if(graphData.type === 'PointsPerMinute') {
				pointsPerMinute	= new Highcharts.Chart({
					chart:	{
						renderTo:	$containers[i],
						type:		'line'
					},
					credits: {
						enabled:	false
					},
					legend:	{
						enabled:			graphData.graph.series.length !== 1,
						backgroundColor:	'#FFFFFF',
						layout:				'vertical',
						align:				'right',
						verticalAlign:		'top',
						floating:			true,
						y:					5
					},
					title:	{
						text:		graphData.name
					},
					xAxis:	{
						categories:	graphData.graph.categories
					},
					yAxis:	{
						min:	0,
						title:	{
							text:	graphData.y
						}
					},
					series:	graphData.graph.series.map(function (serie) {
						serie.data	= serie.data.map(function (y) {
							return +(+y).toFixed(2);
						});
						return serie;
					}),
					tooltip:	{
						formatter:	formatter
					}
				});
			}
        });
	});
});