var io		= require('socket.io').listen(10001),
	mysql	= require('mysql');

var	connection	= mysql.createConnection({
	host:		'localhost',
	user:		'l2p',
	password:	'yE98Ebre',
	database:	'l2p'
});

connection.connect(function (err) {
	if(err) {
		throw err;
	}

	io.sockets.on('connection', function (socket) {
		socket.on('statistic:search', function (search) {
			console.log(search);

			connection.query([
				'SELECT',
					'*',
				'FROM',
					'games',
				'WHERE',
				'	games.deleted	= 0',
				'&&	games.type    	= ?',
				'&&	games.title		LIKE "%'+search.searchstring.replace(/"/g, '\"')+'%"'
			].join(' '), [search.type], function (err, results) {
				if(err) {
					throw err;
				}

				socket.emit('statistic:search', {
					results:	results
				});
			});
		});
	});
});