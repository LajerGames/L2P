require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(100);

	function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey, isSlur);
	}
	function createRest(type) {
		return new Node(options.nodes.types.rest[type], options.tones.rest);
	}
	function applyTact(nodes) {
		var tact    = new Tact(options.tacts.types.quarter);

		nodes.forEach(function(node) {
			tact.addNode(node);
		})

		game.addTact(tact);

		return;
	}

	game.setSharp('C');
	game.setSharp('D');
	game.setSharp('F');
	game.setSharp('G');

	applyTact([
		createRest('quarter'),
		createNote('eighthPeriod', 3, 'B'),
		createNote('sixteenth', 3, 'B'),
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'G')
	]);
	applyTact([
		createNote('whole', 4, 'B')
	]);
	applyTact([
		createNote('eighth', 4, 'B', false, true),
		createRest('eighth'),
		createNote('eighthPeriod', 5, 'C'),
		createNote('sixteenth', 4, 'B'),
		createNote('quarter', 4, 'G'),
		createNote('quarter', 4, 'E')
	]);
	applyTact([
		createNote('whole', 4, 'G')
	]);
	applyTact([
		createNote('eighth', 4, 'G', false, true),
		createRest('eighth'),
		createNote('eighthPeriod', 3, 'B'),
		createNote('sixteenth', 3, 'B'),
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'G')
	]);

	applyTact([
		createNote('whole', 4, 'F')
	]);
	applyTact([
		createNote('eighth', 4, 'F', false, true),
		createRest('eighth'),
		createNote('eighthPeriod', 4, 'G'),
		createNote('sixteenth', 4, 'F'),
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'C')
	]);
	applyTact([
		createNote('whole', 4, 'E')
	]);
	applyTact([
		createNote('eighth', 4, 'E', false, true),
		createRest('eighth'),
		createNote('eighthPeriod', 3, 'B'),
		createNote('sixteenth', 3, 'B'),
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'G')
	]);
	applyTact([
		createNote('whole', 4, 'B')
	]);

	applyTact([
		createNote('eighth', 4, 'B', false, true),
		createRest('eighth'),
		createNote('eighthPeriod', 5, 'C'),
		createNote('sixteenth', 4, 'B'),
		createNote('quarter', 4, 'G'),
		createNote('quarter', 4, 'E')
	]);
	applyTact([
		createNote('whole', 4, 'G')
	]);
	applyTact([
		createRest('eighth'),
		createNote('eighth', 3, 'B'),
		createNote('eighthPeriod', 3, 'B'),
		createNote('sixteenth', 3, 'B'),
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'G')
	]);

	applyTact([
		createNote('whole', 4, 'F')
	]);
	applyTact([
		createRest('quarter'),
		createNote('eighthPeriod', 4, 'G'),
		createNote('sixteenth', 4, 'F'),
		createNote('quarter', 4, 'E'),
		createNote('quarter', 4, 'C')
	]);
	applyTact([
		createNote('whole', 4, 'E')
	]);

	gameController.setGame(game);
});