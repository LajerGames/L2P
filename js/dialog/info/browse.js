define(['jquery', 'l2p', 'playlist', 'api', 'fM'], function ($, L2P, Playlist, api, fM) {
	return (function ($dialog) {
		$dialog.find('.modal-body').css('overflow', 'hidden');
		var	render,
			$info			= $dialog.find('#info'),
			showInfoFor		= null,
			$playlistInner	= $dialog.find('#PlaylistInfoContainerInner'),
			$playlistList	= $playlistInner.find('#PlaylistList');

		L2P.get.playlist(null, function (playlist) {
			render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));;
		});
		L2P.click.set($dialog);

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
							.find('[data-content="octave"]').text('Octave '+octave).end()
							.find('[data-content="author"]').text(data.author).end()
							.find('[data-content="year"]').text(data.year === 0 ? '' : data.year).end()
							.find('[data-content="difficulty"]').text(data.difficulty).end()
							.find('[data-content="illustration"]').html(data.illustration).end()
							.find('a[data-content="statistics"]').attr('href', '/user/'+L2P_global.username+'/statistics/'+data.statistics_uuid+'/').end()
							.show();
					}, permlink, octave);
				}
			}, 100);
		}

		$dialog.find('img.listPlaylist').on('click', function () {
			$playlistInner.css('webkit-transform', 'translate3d(0, 0, 0)');

			$playlistList.load('/ajax/browse.render.playlists.php');
		});
		$dialog.find('img.playPlaylist').on('click', function () {
			var	data	= fM.form.getElements.call($playlistInner.find('form[name="play_options"]')[0]);

			L2P.get.playlist(null, function (playlist) {
				playlist.options.loop	= data.loops - 1;
				playlist.start();
			});
		});

		$dialog
			.find('#list, #PlaylistItems')
				.on('mouseover', 'a', showInfo);

		$dialog.find("#musicSearch")
			.on("keyup", function() {
				var	oParam = {}
				oParam.searchstring	= $(this).val();
				oParam.type     	= $(this).attr('data-type');

				$dialog.find("#list").load("/ajax/browse.render.music.php", oParam);
			});

		$playlistList
			.on('click', 'div[data-playlist_id]', function () {
				var	$this	= $(this),
					data	= $this.data();

				$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
			});
	});
})