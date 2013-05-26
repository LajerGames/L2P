define(['jquery', 'l2p', 'playlist', 'api'], function ($, L2P, Playlist, api) {
	return (function ($dialog) {
		var	render,
			socket,
			$info	= $dialog.find('#info'),
			showInfoFor	= null;
		L2P.get.playlist(null, function (playlist) {
			render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));;
		});
		L2P.click.set($dialog);

		function onSearch(data) {
			console.log(data);
		}
		function showInfo() {
			var	that	= this;
			showInfoFor	= this;
			setTimeout(function () {
				if(showInfoFor === that) {
					var	$this		= $(that),
						url			= $this.attr('href'),
						urlInfo		= url.split('/'),
						permlink	= urlInfo[2],
						octave		= urlInfo[3] || 0;

					api.get.game_info(function (data) {
						$info
							.find('[data-content="title"]').text(data.title).end()
							.find('[data-content="author"]').text(data.author).end()
							.find('[data-content="year"]').text(data.year).end()
							.find('[data-content="difficulty"]').text(data.difficulty).end()
							.find('[data-content="illustration"]').html(data.illustration).end()
							.show();
					}, permlink, octave);
				}
			}, 100);
		}

		$dialog.find('img.playPlaylist').on('click', function () {
			L2P.get.playlist(null, function (playlist) {
				playlist.start();
			});
		});

		$dialog.find('#list')
			.on('mouseover', 'a', showInfo);

		$dialog.find("#musicSearch")
			.on("keyup", function() {
				var	oParam = {}
				oParam.searchstring	= $(this).val();
				oParam.type     	= $(this).attr('data-type');

				$dialog.find("#list").load("/ajax/browse.render.music.php", oParam);
			});
	});
})