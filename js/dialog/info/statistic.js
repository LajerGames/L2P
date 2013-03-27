define(['jquery', 'l2p', 'api', 'highcharts'], function ($, L2P, api, Highcharts) {
	return (function ($dialog) {
		var	data		= JSON.parse($dialog.find('[data-statistic]').attr('data-statistic')) || {},
			$containers	= $dialog.find('.statistic-graph'),
			precision,
			pointsprminute,
			formatter	= function () {
				return '<b>'+this.x+':</b> '+this.y;
			},
			graphOptions	= {
				chart:	{
					type:		'column'
				},
				credits: {
					enabled:	false
				},
				legend:	{
					enabled:	false
				},
				yAxis:	{
					min:	0
				},
				series:	[{
					name:	''
				}],
				tooltip:	{
					formatter:	formatter
				}
			};

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
					enabled:	false
				},
				title:	{
					text:		lang.statistics_graph_precision
				},
				xAxis:	{
					categories:	data[0].map(function (item) {
						return item.name;
					})
				},
				yAxis:	{
					min:	0,
					max:	100,
					title:	{
						text:	'%'
					}
				},
				series:	[{
					name:	'',
					data:	data[0].map(function (item) {
						return item.y;
					})
				}],
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
					enabled:	false
				},
				title:	{
					text:		lang.statistics_graph_pointsprminute
				},
				xAxis:	{
					categories:	data[1].map(function (item) {
						return item.name;
					})
				},
				yAxis:	{
					min:	0,
					title:	{
						text:	lang.global_points
					}
				},
				series:	[{
					name:	'',
					data:	data[1].map(function (item) {
						return item.y;
					})
				}],
				tooltip:	{
					formatter:	formatter
				}
			});
		}, ['global_points', 'statistics_graph_precision', 'statistics_graph_pointsprminute']);
	});
});