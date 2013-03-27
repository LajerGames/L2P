require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(200);

	function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey, isSlur);
	}
	function createRest(type) {
		return new Node(options.nodes.types.rest[type], options.tones.rest);
	}
	function applyTact(nodes) {
		var tact    = new Tact(options.tacts.types.threeForth);

		nodes.forEach(function(node) {
			tact.addNode(node);
		})

		game.addTact(tact);

		return;
	}

	game.setFlat('B');

	// 0
	applyTact([
		createRest('quarter'),
		createRest('quarter'),
		createNote('eighth', 3, 'A'),
		createNote('eighth', 4, 'C')
	]);

	// 7
	applyTact([
		createNote('quarter', 4, 'D'),
		createNote('quarter', 4, 'D'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'E')
	]);
	applyTact([
		createNote('quarter', 4, 'F'),
		createNote('quarter', 4, 'F'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G')
	]);
	applyTact([
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'E'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'C')
	]);
	applyTact([
		createNote('eighth', 4, 'C'),
		createNote('quarterPeriod', 4, 'D'),
		createNote('eighth', 3, 'A'),
		createNote('eighth', 4, 'C')
	]);
	applyTact([
		createNote('quarter', 4, 'D'),
		createNote('quarter', 4, 'D'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'E')
	]);
	applyTact([
		createNote('quarter', 4, 'F'),
		createNote('quarter', 4, 'F'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G')
	]);

	// 13
	applyTact([
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'E'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'C')
	]);
	applyTact([
		createNote('eighthPeriod', 4, 'D'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 3, 'A'),
		createNote('eighth', 4, 'C')
	]);
	applyTact([
		createNote('quarter', 4, 'D'),
		createNote('quarter', 4, 'D'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'F')
	]);
	applyTact([
		createNote('quarter', 4, 'G'),
		createNote('quarter', 4, 'G'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A')
	]);
	applyTact([
		createNote('quarter', 4, 'B'),
		createNote('quarter', 4, 'B'),
		createNote('eighth', 4, 'A'),
		createNote('eighth', 4, 'G')
	]);
	applyTact([
		createNote('eighth', 4, 'A'),
		createNote('quarterPeriod', 4, 'D'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'E')
	]);

	// 19
	applyTact([
		createNote('quarter', 4, 'F'),
		createNote('quarter', 4, 'F'),
		createNote('quarter', 4, 'G')
	]);
	applyTact([
		createNote('eighth', 4, 'A'),
		createNote('quarterPeriod', 4, 'D'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'F')
	]);
	applyTact([
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'E'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'D')
	]);
	applyTact([
		createNote('eighth', 4, 'E'),
		createRest('eighth'),
		createRest('quarter'),
		createNote('eighth', 4, 'A'),
		createNote('eighth', 5, 'C')
	]);
	applyTact([
		createNote('quarter', 5, 'D'),
		createNote('quarter', 5, 'D'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'E')
	]);
	applyTact([
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'F'),
		createNote('eighth', 5, 'F'),
		createNote('eighth', 5, 'G')
	]);

	// 25
	applyTact([
		createNote('quarter', 5, 'E'),
		createNote('quarter', 5, 'E'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'C')
	]);
	applyTact([
		createNote('eighth', 5, 'C'),
		createNote('quarterPeriod', 5, 'D'),
		createNote('eighth', 4, 'A'),
		createNote('eighth', 5, 'C')
	]);
	applyTact([
		createNote('quarter', 5, 'D'),
		createNote('quarter', 5, 'D'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'E')
	]);
	applyTact([
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'F'),
		createNote('eighth', 5, 'F'),
		createNote('eighth', 5, 'G')
	]);
	applyTact([
		createNote('quarter', 5, 'E'),
		createNote('quarter', 5, 'E'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'C')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'D'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 4, 'A'),
		createNote('eighth', 5, 'C')
	]);

	// 31
	applyTact([
		createNote('quarter', 5, 'D'),
		createNote('quarter', 5, 'D'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'F')
	]);
	applyTact([
		createNote('quarter', 5, 'G'),
		createNote('quarter', 5, 'G'),
		createNote('eighth', 5, 'G'),
		createNote('eighth', 5, 'A')
	]);
	applyTact([
		createNote('quarter', 5, 'B'),
		createNote('quarter', 5, 'B'),
		createNote('eighth', 5, 'A'),
		createNote('eighth', 5, 'G')
	]);
	applyTact([
		createNote('eighth', 5, 'A'),
		createNote('quarterPeriod', 5, 'D'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'E')
	]);
	applyTact([
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'G')
	]);
	applyTact([
		createNote('eighth', 5, 'A'),
		createNote('quarterPeriod', 5, 'D'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'G')
	]);

	// 37
	applyTact([
		createNote('quarter', 5, 'E'),
		createNote('quarter', 5, 'E'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'C#')
	]);
	applyTact([
		createNote('quarter', 5, 'D'),
		createNote('quarter', 5, 'D'),
		createNote('quarter', 5, 'E')
	]);
	applyTact([
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'G')
	]);
	applyTact([
		createNote('eighth', 5, 'A'),
		createNote('eighth', 5, 'F'),
		createRest('quarter'),
		createNote('eighth', 5, 'F'),
		createNote('eighth', 5, 'D')
	]);
	applyTact([
		createNote('eighth', 4, 'A'),
		createRest('eighth'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('eighth', 5, 'B'),
		createRest('eighth'),
		createRest('quarter'),
		createNote('eighth', 5, 'G'),
		createNote('eighth', 5, 'D')
	]);

	// 43
	applyTact([
		createNote('eighth', 4, 'B'),
		createRest('eighth'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('eighth', 4, 'E'),
		createNote('quarter', 4, 'E'),
		createNote('quarterPeriod', 4, 'D')
	]);
	applyTact([
		createNote('half', 4, 'F'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G')
	]);
	applyTact([
		createNote('quarter', 4, 'A'),
		createNote('quarter', 4, 'A'),
		createNote('quarter', 4, 'A')
	]);
	applyTact([
		createNote('eighth', 4, 'B'),
		createNote('eighth', 4, 'A'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('quarter', 4, 'G'),
		createNote('quarter', 4, 'G'),
		createNote('quarter', 4, 'G')
	]);

	// 49
	applyTact([
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('quarter', 4, 'A'),
		createNote('quarter', 4, 'A'),
		createNote('quarter', 4, 'A')
	]);
	applyTact([
		createNote('eighth', 4, 'B'),
		createNote('eighth', 4, 'A'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('quarter', 4, 'G'),
		createNote('quarter', 4, 'F'),
		createNote('quarter', 4, 'E')
	]);
	applyTact([
		createNote('eighthPeriod', 4, 'D'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'E')
	]);
	applyTact([
		createNote('half', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A')
	]);

	// 55
	applyTact([
		createNote('quarter', 4, 'G'),
		createNote('quarter', 4, 'F'),
		createNote('quarter', 4, 'E')
	]);
	applyTact([
		createNote('quarter', 4, 'F'),
		createNote('quarter', 4, 'G'),
		createNote('quarter', 4, 'A')
	]);
	applyTact([
		createNote('eighthPeriod', 4, 'G'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G')
	]);
	applyTact([
		createNote('eighthPeriod', 4, 'A'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'F')
	]);
	applyTact([
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'F'),
		createNote('quarter', 4, 'E')
	]);
	applyTact([
		createNote('eighth', 4, 'D'),
		createRest('eighth'),
		createRest('quarter'),
		createNote('eighth', 4, 'E'),
		createNote('eighth', 4, 'C')
	]);

	// 61
	applyTact([
		createNote('eighth', 4, 'D'), // Should be F
		createRest('eighth'),
		createRest('quarter'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'E')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'F'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 5, 'E'),
		createNote('eighth', 5, 'F')
	]);
	applyTact([
		createNote('quarter', 5, 'G'),
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'G')
	]);
	applyTact([
		createNote('quarter', 5, 'A'),
		createNote('quarter', 5, 'G'),
		createNote('quarter', 5, 'F')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'D'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'E')
	]);
	applyTact([
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'G'),
		createNote('quarter', 5, 'A')
	]);

	// 67
	applyTact([
		createNote('quarter', 5, 'B'),
		createNote('quarter', 5, 'D'),
		createNote('quarter', 5, 'G')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'F'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 5, 'G'),
		createNote('eighth', 5, 'E')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'D'),
		createRest('sixteenth'),
		createRest('quarter'),
		createNote('eighth', 5, 'E'),
		createNote('eighth', 5, 'C#')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'A'),
		createRest('sixteenth'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'B'),
		createRest('sixteenth'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('quarter', 5, 'A'),
		createNote('quarter', 5, 'A'),
		createNote('quarter', 5, 'A')
	]);

	// 73
	applyTact([
		createNote('eighth', 5, 'A'),
		createNote('eighth', 5, 'G'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'G'),
		createRest('sixteenth'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'F'),
		createRest('sixteenth'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'G'),
		createNote('quarter', 5, 'E')
	]);
	applyTact([
		createNote('quarterPeriod', 5, 'D'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'E'),
		createNote('eighth', 5, 'F')
	]);
	applyTact([
		createNote('quarterPeriod', 5, 'A'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'E'),
		createNote('eighth', 5, 'F')
	]);

	// 79
	applyTact([
		createNote('quarterPeriod', 5, 'B'),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 5, 'E'),
		createNote('eighth', 5, 'F')
	]);
	applyTact([
		createNote('quarter', 5, 'A'),
		createNote('quarter', 5, 'A'),
		createNote('quarter', 6, 'C')
	]);
	applyTact([
		createNote('eighth', 5, 'A'),
		createNote('eighth', 5, 'G'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('eighthPeriod', 5, 'G'),
		createRest('sixteenth'),
		createRest('quarter'),
		createRest('quarter')
	]);

	// 83
	applyTact([
		createNote('eighthPeriod', 5, 'F'),
		createRest('sixteenth'),
		createRest('quarter'),
		createRest('quarter')
	]);
	applyTact([
		createNote('quarter', 5, 'F'),
		createNote('quarter', 5, 'G'),
		createNote('quarter', 5, 'E')
	]);
	applyTact([
		createNote('quarterPeriod', 5, 'D'),
		createRest('eighth'),
		createRest('quarter')
	]);

	gameController.setGame(game);
});