define(['jquery', 'l2p', 'playlist', 'api', 'fM'], function ($, L2P, Playlist, api, fM) {
	return (function ($dialog) {
		$dialog.find('.modal-body').css('overflow', 'hidden');
		var	render,
			$info			= $dialog.find('#info'),
			showInfoFor		= null,
			$playlistInner	= $dialog.find('#PlaylistInfoContainerInner'),
			$playlistList	= $playlistInner.find('#PlaylistList');

		L2P.get.playlist(null, function (playlist) {
			render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
			render.onUpdate(function () {
				$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
			});
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
							.find('[data-content="octave"]').text(L2P_global.lang.global_octave+' '+octave).end()
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
			.on('click', 'div[data-playlist_id]', function (e) {
				var	$this		= $(this),
					data		= $this.data(),
					$target		= $(e.target),
					targetData	= $target.data();

				switch(e.target.nodeName) {
					case 'INPUT':
						break;
					case 'IMG':
						if(data.playlist_id === 'new') {
							L2P.get.playlist('new', function (playlist) {
								render && render.kill();
								render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
								render.onUpdate(function () {
									$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
								});
							}, $this.find('input').val());

							$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
						} else if(targetData.action === 'edit') {
							var	name	= $this.text().trim();

							$this
								.html([
									'<input type="text" />',
									'<img src="/img/icons/save.svg" data-action="save" />'
								].join(''))
								.find('input')
									.val(name);
						} else if(targetData.action === 'save') {
							var	name	= $this.find('input').val();

							L2P.get.playlist(data.playlist_id, function (playlist) {
								render && render.kill();
								render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
								render.onUpdate(function () {
									$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
								});
							}, name);

							$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
						}
						break;
					case 'DIV':
					default:
						if($this.find('input').length > 0) {
							return;
						}
						L2P.get.playlist(data.playlist_id, function (playlist) {
							render && render.kill();
							render	= L2P.render.playlist(playlist, $dialog.find('#PlaylistItems'));
							render.onUpdate(function () {
								$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
							});
						});

						$playlistInner.css('webkit-transform', 'translate3d(-50%, 0, 0)');
						break;
				}
			});
	});
})