define(['jquery', 'fM', 'l2p', 'api', 'highcharts'], function ($, fM, L2P, api, Highcharts) {
	return (function ($dialog) {
		console.log('test');

		var	data		= JSON.parse($dialog.find('[data-statistic]').attr('data-statistic')) || {},
			$containers	= $dialog.find('.statistic-graph'),
			$formSearch	= $dialog.find('form[name="search"]'),
            path		= location.pathname.split('/'),
			precision,
			pointsprminute,
			formatter	= function () {
				return '<b>'+this.x+':</b> '+this.y;
			};

        $dialog.find('.BottomTableView tr').on('click', function() {
            var	$tr		= $(this),
            	gameid			= $tr.attr('data-gameid'),
            	gamehistoryid	= $tr.attr('data-gamehistoryid');

            if(gameid !== undefined) {
            	$formSearch.find('input[name="game_ids"]').val(gameid);
			}
            if(gamehistoryid !== undefined) {
            	$formSearch.find('input[name="game_history_ids"]').val(gamehistoryid);
			}

           	$dialog.find('.BottomTableView tr').off('click');

            api.get.statistic_uuid(function (data) {
            	var	path	= location.pathname.split('/');
            	path[4]	= data.uuid;
            	path[5]	= '';

            	console.log('nav', path);
            	fM.link.navigate(path.join('/'));
            }, fM.form.getElements.call($formSearch[0]));
        });

		api.get.lang(function (lang) {
			precision	= new Highcharts.Chart({
				chart:	{
					renderTo:	$containers[0],
					type:		'column'
				},
				credits: {
					enabled:	false
				},
				legend:	{
					enabled:			data[0].series.length !== 1,
					backgroundColor:	'#FFFFFF',
					layout:				'vertical',
					align:				'right',
					verticalAlign:		'top',
					floating:			true,
					y:					5
				},
				title:	{
					text:		lang.statistics_graph_precision
				},
				xAxis:	{
					categories:	data[0].categories
				},
				yAxis:	{
					min:	0,
					max:	100,
					title:	{
						text:	'%'
					}
				},
				series:	data[0].series.map(function (serie) {
					serie.data	= serie.data.map(function (y) {
						return +(+y).toFixed(2);
					});
					return serie;
				}),
				tooltip:	{
					formatter:	formatter
				}
			});
			pointsprminute	= new Highcharts.Chart({
				chart:	{
					renderTo:	$containers[1],
					type:		'line'
				},
				credits: {
					enabled:	false
				},
				legend:	{
					enabled:			data[1].series.length !== 1,
					backgroundColor:	'#FFFFFF',
					layout:				'vertical',
					align:				'right',
					verticalAlign:		'top',
					floating:			true,
					y:					5
				},
				title:	{
					text:		lang.statistics_graph_pointsprminute
				},
				xAxis:	{
					categories:	data[1].categories
				},
				yAxis:	{
					min:	0,
					title:	{
						text:	lang.global_points
					}
				},
				series:	data[1].series.map(function (serie) {
					serie.data	= serie.data.map(function (y) {
						return +(+y).toFixed(2);
					});
					return serie;
				}),
				tooltip:	{
					formatter:	formatter
				}
			});
		},
        ['global_points', 'statistics_graph_precision', 'statistics_graph_pointsprminute']);
	});
});