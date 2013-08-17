({
	baseUrl:	'../js/',
	name:		'main',
	out:		'output/magic-tune.js',
	findNestedDependencies:	true,
	paths:		{
		'jquery':		'jquery-2.0.3',
		'tour':			'bootstrap-tour',
		'json':			'requirejs/json',
		'facebook':		'//connect.facebook.net/en_US/all',
		'bootstrap':	'//netdna.bootstrapcdn.com/bootstrap/3.0.0-wip/js/bootstrap'
	},
	exclude:	[
		'json!lang/guided_tour.php'
	]
})