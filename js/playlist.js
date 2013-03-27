define(['jquery', 'l2p', 'api'], function ($, L2P, api) {
	function Playlist(options, id) {
		var	that		= this;
		this.$this		= $(this);
		this.id			= id || Date.now();
		this.name		= '';
		this.options	= $.extend({
			mode:	'countdown',
			loop:	0
		}, options);

		this.firstPlay	= true;
		this.playing	= false;
		this.playNow	= -1;
		this.loop		= -1;
		this.gameController;

		this.storage	= new L2P.storage('PlayList');
		this.storage.$this.on('update', function (e, name) {
			if(name === that.id) {
				that.load(true);
			}
		});
		this.load();
	}
	Playlist.prototype.load			= function (doReload) {
		var	info	= this.storage.get(this.id, doReload) || {name:	'', games:	[]};
		this.name	= info.name;
		this.games	= info.games;
		this.$this.trigger('update', []);
	};
	Playlist.prototype.save			= function () {
		this.storage.set(this.id, {
			name:	this.name,
			games:	this.games
		});
		this.$this.trigger('update', []);

		api.save.playlist(this.id, this.name, this.games.map(function (game) {
			return game.url;
		}));
	};
	Playlist.prototype.addGame		= function (url, title, data, type) {
		var	game	= {url: url, title: title, data: data, type: type	},
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
		this.playing	= true;
		this.loop		+= 1;
		this.nextGame();
	};
	Playlist.prototype.startGame	= function (game) {
		var	that	= this;
		L2P.dialog.game(game.url, game.title, game.data, game.type, function (gameController) {
			if(!that.gameController) {
				console.log('playlist got new gameController');
				that.gameController	= gameController;

				$(that.gameController).on('gameEnd', function (points) {
					console.log('gameEnd', points);
					that.nextGame();
				});
			}

			if(!this.firstPlay) {
				if(that.options.mode === 'auto') {
					that.gameController.useCountdown	= false;
					that.gameController.startGame();
				} else if(that.options.mode === 'countdown') {
					that.gameController.useCountdown	= true;
					that.gameController.startGame();
				}
			}
		});
	};
	Playlist.prototype.nextGame		= function () {
		this.playNow	+= 1;
		var	game	= this.games[this.playNow];
		console.log('nextGame', game);
		if(game) {
			this.startGame(game);
			this.firstPlay	= false;
		} else {
			this.playNow	= -1;
			this.playing	= false;
			this.firstPlay	= true;

			if(this.options.loop === -1 || this.loop < this.options.loop) {
				this.firstPlay	= false;
				this.start();
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