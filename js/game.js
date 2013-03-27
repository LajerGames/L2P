define(['game/controller', 'game/options', 'svg', 'game/sound'], function (GameController, options, SVGElement, Sound) {
	var	svgContainer	= document.getElementById('svg_container'),
		gameController	= new GameController(svgContainer);

	gameController.sound	= new Sound();

	$('#startGame').on('click', $.proxy(gameController.startGame, gameController));
	$('#stopGame').on('click', $.proxy(gameController.stopGame, gameController));
	$(gameController).on({
		gameLoadSpeedChange:	function (e, speed) {
			$('#speed').val(speed).trigger('change');
		}
	});

	return gameController;


	/*
	var canvas			= document.getElementById('gameContainer'),
		svg				= document.getElementById('svgContainer');

	gameController	= new GameController(canvas);

	$('#speed').on('change', function () {
		gameController.setGameSpeed(+this.value);
		$('#speedShow').html(+this.value);
	});
	$('#startGame').on('click', $.proxy(gameController.startGame, gameController));
	$('#stopGame').on('click', $.proxy(gameController.stopGame, gameController));

	$(gameController).on({
		gameLoadSpeedChange:	function (e, speed) {
			$('#speed').val(speed).trigger('change');
		}
	});

	var keyToTone = {
		83: [5,'B'],    // S
		69: [5,'A'],    // E
		68: [5,'G'],    // D
		82: [5,'F'],    // R
		70: [5,'E'],    // F
		84: [5,'D'],    // T
		71: [5,'C'],    // G
		89: [4,'B'],    // Y
		72: [4,'A'],    // H
		85: [4,'G'],    // U
		74: [4,'F'],    // J
		73: [4,'E'],    // I
		75: [4,'D'],    // K
		79: [4,'C'],    // O
		76: [3,'B'],    // L
		80: [3,'A'],    // P
	};
	document.addEventListener('keydown', function (e) {
		if(gameController.isRunning() || true) {
			var tone = keyToTone[e.which];
			if(tone) {
				gameController.game.userPlayNode(options.tones.names[tone[0]][tone[1]].hz);
			}
		}
	}, false);

	return gameController;
	*/
});