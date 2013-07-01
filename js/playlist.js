define(['jquery', 'l2p', 'api', 'fM'], function ($, L2P, api, fM) {
	function Playlist(options, id, name) {
		var	that		= this;
		this.$this		= $(this);
		this.id			= id || Date.now();
		this.name		= name;
		this.games		= [];
		this.options	= $.extend({
			mode:	'countdown',
			loop:	0
		}, options);

		this.firstPlay	= true;
		this.playing	= false;
		this.playNow	= -1;
		this.loop		= -1;
		this.game_history_ids	= [];
		this.gameController;

		this.storage	= new L2P.storage('PlayList');
		this.storage.$this.on('update', function (e, name) {
			if(name === that.id) {
				that.load(true);
			}
		});
		this.load(false, name);
	}
	Playlist.prototype.load			= function (doReload, name) {
		var	that	= this,
			info	= this.storage.get(this.id, doReload);

		if(!info && !name) {
			api.get.lang(function (lang) {
				that.name	= lang.browse_my_playlist;
				that.games	= [];

				that.$this.trigger('update', []);
			}, ['browse_my_playlist']);
		} else {
			if(info) {
				this.name	= name || info.name;
				this.games	= info.games;
				if(name) {
					this.save();
				}
			} else {
				this.name	= name || '';
				this.games	= [];
			}
			this.$this.trigger('update', []);
		}
	};
	Playlist.prototype.save			= function () {
		if(this.games.length === 0) {
			this.storage.set(this.id, null);
		} else {
			this.storage.set(this.id, {
				name:	this.name,
				games:	this.games
			});
		}
		this.$this.trigger('update', []);
	};
	Playlist.prototype.addGame		= function (url, title) {
		var	game	= {url: url, title: title},
			i		= this.games.push(game);

		this.save();
		this.$this.trigger('add game', [game, i]);
	};
	Playlist.prototype.removeGame	= function (game) {
		var	i	= this.games.indexOf(game),
			game;
		if(i !== -1) {
			game	= this.games.splice(i, 1);

			this.save();
			this.$this.trigger('remove game', [game, i]);
		}
	};
	Playlist.prototype.start		= function () {
		this.game_history_ids	= [];
		this.loop				= -1;
		this.restart();
	};
	Playlist.prototype.restart		= function () {
		this.playing			= true;
		this.playNow			= -1;
		this.loop				+= 1;
		this.nextGame();
	};
	Playlist.prototype.startGame	= function (game) {
		var	that		= this,
			linkObject	= {
				title:			game.title,
				from_playlist:	true,
				autostart:		!this.firstPlay,
				use_countdown:	this.options.mode === 'countdown'
			};

		if(!this.gameController) {
			linkObject.onstart	= 'gameStart-'+Date.now();
			$(L2P).on(linkObject.onstart, function (e, gameController) {
				DEBUG && console.log(that, 'got new gameController');
				that.gameController	= gameController;

				$(that.gameController).on('gameEnd', function (e, gameInfo) {
					DEBUG && console.log('gameEnd', gameInfo.points, gameInfo);
					that.game_history_ids.push(gameInfo.game_history_id);
					that.nextGame();
				});
			});
		}
		fM.link.navigate(game.url, game.title, linkObject);
	};
	Playlist.prototype.nextGame		= function () {
		this.playNow	+= 1;
		var	game	= this.games[this.playNow];
		DEBUG && console.log('nextGame', game, this.playNow, this.games);
		if(game) {
			this.startGame(game);
			this.firstPlay	= false;
		} else {
			this.playNow	= -1;
			this.playing	= false;
			this.firstPlay	= true;

			if(this.options.loop === -1 || this.loop < this.options.loop) {
				this.firstPlay	= false;
				this.restart();
			} else {
				DEBUG && console.log('playlist done', this.game_history_ids, this);
				api.get.statistic_uuid(function (data) {
					fM.link.navigate('/user/'+L2P_global.username+'/statistics/'+data.uuid+'/');
				}, {
					game_history_ids:	this.game_history_ids.join(',')
				});
			}
		}
	};
	Playlist.prototype.clear		= function () {
		this.games	= [];
		this.storage.set(this.id, this.games);

		this.save();
		this.$this.trigger('clear', []);
	};

	return Playlist;
});