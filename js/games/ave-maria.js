require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(90);

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
	game.setFlat('E');

	applyTact([
		createNote('halfPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'B', false, true),
		createNote('quarter', 0, 'A'),
		createNote('eighth', 0, 'B')
	]);

	applyTact([
		createNote('halfPeriod', 1, 'D')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'D', false, true),
		createNote('quarterPeriod', 1, 'C')
	]);

	applyTact([
		createNote('halfPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'B', false, true),
		createRest('quarter'),
		createRest('eighth')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C'),
		createNote('eighth', 1, 'C', false, true),
		createNote('eighth', 1, 'D'),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('quarter', 0, 'B'),
		createNote('eighth', 0, 'A'),
		createNote('quarter', 0, 'G'),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('halfPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'B', false, true),
		createNote('quarterPeriod', 1, 'D')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'D'),
		createNote('eighth', 1, 'D', false, true),
		createNote('eighth', 1, 'C'),
		createNote('eighth', 0, 'B')
	]);

	applyTact([
		createNote('quarter', 0, 'A'),
		createNote('eighth', 0, 'G'),
		createNote('quarter', 1, 'D'),
		createNote('eighth', 1, 'E', true)
	]);

	applyTact([
		createNote('halfPeriod', 1, 'D')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C#'),
		createNote('quarter', 1, 'C', false, true),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C'),
		createNote('quarter', 1, 'C'),
		createNote('eighth', 0, 'B')
	]);

	applyTact([
		createNote('eighth', 0, 'A'),
		createNote('eighth', 1, 'C'),
		createNote('eighth', 1, 'D'),
		createNote('eighth', 1, 'E'),
		createNote('eighth', 1, 'C'),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('halfPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'B', false, true),
		createNote('quarter', 1, 'D'),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C'),
		createNote('quarter', 1, 'C', false, true),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('eighth', 0, 'G'),
		createNote('eighth', 0, 'B', true),
		createNote('eighth', 1, 'D'),
		createNote('eighth', 1, 'F'),
		createNote('eighth', 1, 'D'),
		createNote('eighth', 0, 'B')
	]);

	applyTact([
		createNote('halfPeriod', 1, 'C')
	]);

	applyTact([
		createNote('eighth', 1, 'C', false, true),
		createNote('eighth', 0, 'G'),
		createNote('eighth', 0, 'A'),
		createNote('eighth', 0, 'B'),
		createNote('eighth', 0, 'A'),
		createNote('eighth', 0, 'G')
	]);

	applyTact([
		createNote('halfPeriod', 0, 'F')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'F', false, true),
		createRest('eighth'),
		createNote('quarter', 0, 'F')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C'),
		createNote('quarter', 1, 'C', false, true),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('quarter', 1, 'C'),
		createNote('eighth', 0, 'B', true),
		createNote('quarter', 1, 'C'),
		createNote('eighth', 1, 'D')
	]);

	applyTact([
		createNote('quarter', 1, 'C'),
		createNote('eighth', 1, 'D'),
		createNote('quarterPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'B', false, true),
		createNote('quarterPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C'),
		createNote('quarter', 1, 'C', false, true),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C'),
		createNote('quarter', 1, 'C', false, true),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('eighth', 1, 'C'),
		createNote('eighth', 0, 'B', true),
		createNote('eighth', 1, 'C'),
		createNote('eighth', 1, 'E'),
		createNote('eighth', 1, 'D'),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('halfPeriod', 0, 'B')
	]);

	applyTact([
		createRest('quarter'),
		createRest('eighth'),
		createNote('quarterPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C'),
		createNote('quarter', 1, 'C', false, true),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('quarter', 1, 'C'),
		createNote('eighth', 1, 'C'),
		createNote('eighth', 1, 'C'),
		createNote('eighth', 0, 'B'),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'F'),
		createNote('quarterPeriod', 1, 'E')
	]);

	applyTact([
		createRest('quarter'),
		createRest('quarter'),
		createRest('eighth'),
		createNote('eighth', 0, 'G')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'D'),
		createNote('quarter', 1, 'D', false, true),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('eighth', 0, 'B'),
		createNote('eighth', 0, 'A'),
		createNote('eighth', 0, 'B'),
		createNote('eighth', 1, 'D'),
		createNote('eighth', 1, 'C'),
		createNote('eighth', 0, 'B')
	]);

	applyTact([
		createNote('halfPeriod', 1, 'C')
	]);

	applyTact([
		createRest('quarter'),
		createRest('quarter'),
		createRest('quarter'),
		createRest('quarter')
	]);

	applyTact([
		createNote('halfPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'B', false, true),
		createNote('quarter', 0, 'A'),
		createNote('eighth', 0, 'B')
	]);

	applyTact([
		createNote('halfPeriod', 1, 'D')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'D', false, true),
		createNote('quarter', 1, 'D', false, true),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
		createNote('halfPeriod', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'B', false, true),
		createRest('eighth'),
		createRest('quarter')
	]);

	gameController.setGame(game);
});