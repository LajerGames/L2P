({
	baseUrl:	'../js/',
	name:		'main',
	out:		'output/magic-tune.js',
	findNestedDependencies:	true,
	paths:		{
		'jquery':		'jquery-2.0.3',
		'tour':			'bootstrap-tour',
		'json':			'requirejs/json',
		'facebook':		'//connect.facebook.net/en_US/all'
	},
	stubModules : ['text'],
	include:	[
		'dialog/action/user_create',
		'dialog/info/browse',
		'dialog/info/statistic'
	],
	shim:	{
		highcharts:	{
			exports:	'Highcharts'
		},
		tour:		{
			exports:	'Tour'
		},
		facebook:	{
			exports:	'FB'
		}
	},
	exclude:	[
		'json!lang/guided_tour.php'
	]
})