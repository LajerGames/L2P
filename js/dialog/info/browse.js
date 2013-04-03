define(['jquery', 'l2p', 'playlist', 'api'], function ($, L2P, Playlist, api) {
	return (function ($dialog) {
		var	render,
			socket;
		L2P.get.playlist(null, function (playlist) {
			render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));;
		});
		L2P.click.set($dialog);

		function onSearch(data) {
			console.log(data);
		}

		$dialog.find('img.newPlaylist').on('click', function () {
			api.get.lang(function (lang) {
				var	name	= prompt('Navn');
				if(name) {
					render.kill();
					L2P.get.playlist('new', function (playlist) {
						playlist.name	= name;
						render			= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
					});
				}
			}, ['global_new'])
		});
		$dialog.find("#musicSearch")
			.on("keyup", function() {
				oParam = {}
				oParam.searchstring	= $(this).val();
				oParam.type     	= $(this).attr('data-type');

				$dialog.find("#list").load("/ajax/browse.render.music.php", oParam);
				return;
				if(!socket) {
					socket	= L2P.io();
					socket.on('statistic:search', onSearch);
				}
				socket.emit('statistic:search', oParam);
			});
	});
})