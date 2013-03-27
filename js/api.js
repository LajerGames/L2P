define(['jquery'], function ($) {
	var systemFolder    = '';

	function _apiGetter( url, data ) {
		function then( func ) {
			$.ajax({
				url:    systemFolder + '/api/get.' + url,
				type:   'get',
				cache:  false,
				data:   data,
				success:func
			});
		}
		return {
			then:    then
		};
	}
	function _apiSetter( url, data, cache ) {
		function then( func ) {
			$.ajax({
				url:    systemFolder + '/api/save.' + url,
				type:   'post',
				cache:  cache || false,
				data:   data,
				success:func
			});
		}
		return {
			then:    then
		};
	}
	var get = {
		games:  function ( callback ) {
			new _apiGetter( 'games.php', {

			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		},
		lang:	function ( callback, keys ) {
			new	_apiGetter( 'lang.php', {
				keys:	keys
			}, true)
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		}
	};

	var save = {
		playlist:	function ( playlist_id, playlist_name, games, callback ) {
			new	_apiSetter( 'playlist.php', {
				playlist_id:	playlist_id,
				playlist_name:	playlist_name,
				games:			games
			})
			.then( function ( data ) {
				if( callback ) {
					callback( data );
				}
			});
		}
	};

	return  {
		get:    get,
		save:   save
	};
});