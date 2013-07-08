define(['jquery', 'api', 'game/game-controller', 'game/sound', 'sound-input'], function ($, api, GameController, Sound, SoundInput) {
	var	games			= [],
		svgContainer,
		gameController;

	function loadGame(e) {
		var gameId  = +this.getAttribute('data-game-id'),
			game    = games.filter(function (game) { return game.id == gameId; })[0];

		gameController.importGame(game.game);
	}

	$(document).ready(function () {
		svgContainer			= document.getElementById('svg_container');
		gameController			= new GameController(svgContainer);
		gameController.sound	= new Sound();

		$('#gamesBox').on('click', 'a[data-game-id]', loadGame);
		$('#startGame').on('click', $.proxy(gameController.startGame, gameController));
		$('#stopGame').on('click', $.proxy(gameController.stopGame, gameController));
		$('#exportGame').on('click', function () {
			// console.log(JSON.stringify(gameController.exportGame()));
		});
		$('#speed').on('change', function () {
			gameController.setGameSpeed(+this.value);
			$('#speedShow').html(+this.value);
		});
		$(gameController).on({
			gameLoadSpeedChange:	function (e, speed) {
				$('#speed').val(speed).trigger('change');
			}
		});

		api.get.games(function (gotGames) {
			var gamesBox    = document.getElementById('gamesBox'),
				html        = '';

			games   = gotGames;

			var html = Array.prototype.map.call(gotGames, function (game) {
				return '<a href="#/' + game.id + '" data-game-id="' + game.id + '">' + game.title + '</a>';
			}).join(',&nbsp;');

			gamesBox.innerHTML  = html;
		});
	});

	return gameController;
});