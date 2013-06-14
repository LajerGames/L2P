require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(100);

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

	game.setSharp('F');

	applyTact([
		createRest('quarter'),
		createRest('quarter'),
		createRest('eighth'),
		createNote('eighth', 0, 'C')
	]);

	applyTact([
		createNote('quarter', 0, 'F'),
		createNote('eighth', 0, 'F'),
		createNote('quarter', 0, 'F'),
		createNote('eighth', 0, 'G')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'A'),
		createNote('quarter', 0, 'A'),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('quarter', 0, 'G'),
		createNote('eighth', 0, 'F'),
		createNote('quarter', 0, 'G'),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'F'),
        createRest('quarter'),
        createRest('eighth')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'A'),
		createNote('quarter', 0, 'A'),
		createNote('eighth', 0, 'B')
	]);

	applyTact([
		createNote('quarterPeriod', 1, 'C'),
		createNote('quarterPeriod', 1, 'C')
	]);

	applyTact([
		createNote('quarter', 0, 'B'),
		createNote('eighth', 0, 'A'),
		createNote('quarter', 0, 'B'),
		createNote('eighth', 1, 'C')
	]);

	applyTact([
        createNote('quarterPeriod', 0, 'A'),
        createRest('quarter'),
        createRest('eighth')
    ]);

	applyTact([
		createNote('quarterPeriod', 0, 'F'),
		createNote('quarter', 0, 'F'),
		createNote('eighth', 0, 'G')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'A'),
		createNote('quarterPeriod', 0, 'A')
	]);

	applyTact([
		createNote('quarter', 0, 'G'),
		createNote('eighth', 0, 'F'),
		createNote('quarter', 0, 'G'),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'F'),
		createNote('quarter', 0, 'C'),
		createNote('eighth', 0, 'C')
	]);

	applyTact([
		createNote('quarter', 0, 'F'),
		createNote('eighth', 0, 'F'),
		createNote('quarter', 0, 'F'),
		createNote('eighth', 0, 'G')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'A'),
		createNote('quarter', 0, 'A'),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('quarter', 0, 'G'),
		createNote('eighth', 0, 'F'),
		createNote('quarter', 0, 'G'),
		createNote('eighth', 0, 'A')
	]);

	applyTact([
		createNote('quarterPeriod', 0, 'F'),
		createRest('quarter'),
        createRest('eighth')
	]);

	gameController.setGame(game);
});