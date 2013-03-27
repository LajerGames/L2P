require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(120);

	function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey, isSlur);
	}
	function applyTact(nodes) {
		var tact    = new Tact(options.tacts.types.quarter);

		nodes.forEach(function(node) {
			tact.addNode(node);
		})

		game.addTact(tact);

		return;
	}

	applyTact([
		createNote('eighth', 4, 'Bb'),
		createNote('eighth', 4, 'A'),
		createNote('eighthPeriod', 4, 'G'),
		createNote('sixteenth', 4, 'F'),
		createNote('eighth', 4, 'A'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'Eb')
	]);
	applyTact([
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'F'),
		createNote('sixteenth', 4, 'Eb'),
		createNote('eighthPeriod', 4, 'D'),
		createNote('quarterPeriod', 4, 'F'),
		createNote('sixteenth', 4, 'D'),
		createNote('sixteenth', 4, 'C')
	]);
	applyTact([
		createNote('eighth', 3, 'Bb'),
		createNote('eighth', 4, 'C'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'Eb'),
		createNote('eighth', 4, 'C'),
		createNote('sixteenth', 4, 'D'),
		createNote('sixteenth', 4, 'E'),
		createNote('eighth', 4, 'E', false, true),
		createNote('eighth', 4, 'F')
	]);
	applyTact([
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('sixteenth', 4, 'A'),
		createNote('eighthPeriod', 4, 'G'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A')
	]);

	applyTact([
		createNote('eighth', 4, 'Bb'),
		createNote('eighth', 4, 'A'),
		createNote('eighthPeriod', 4, 'G'),
		createNote('sixteenth', 4, 'F'),
		createNote('eighth', 4, 'A'),
		createNote('eighth', 4, 'G'),
		createNote('sixteenth', 4, 'F'),
		createNote('eighthPeriod', 4, 'Eb')
	]);
	applyTact([
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'F'),
		createNote('sixteenth', 4, 'Eb'),
		createNote('eighthPeriod', 4, 'D'),
		createNote('quarterPeriod', 4, 'F'),
		createNote('sixteenth', 4, 'D'),
		createNote('sixteenth', 4, 'C')
	]);
	applyTact([
		createNote('eighth', 3, 'Bb'),
		createNote('eighth', 4, 'C'),
		createNote('eighth', 4, 'D'),
		createNote('eighth', 4, 'Eb'),
		createNote('eighth', 4, 'C'),
		createNote('sixteenth', 4, 'D'),
		createNote('sixteenth', 4, 'E'),
		createNote('eighth', 4, 'E', false, true),
		createNote('eighth', 4, 'F')
	]);
	applyTact([
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('sixteenth', 4, 'A'),
		createNote('eighthPeriod', 4, 'F'),
		createNote('eighth', 4, 'Bb'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'G#')
	]);

	applyTact([
		createNote('half', 4, 'A'),
		createNote('eighth', 4, 'A', false, true),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G', true),
		createNote('eighth', 4, 'A')
	]);
	applyTact([
		createNote('half', 4, 'Bb'),
		createNote('eighth', 4, 'B', false, true),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A')
	]);
	applyTact([
		createNote('half', 5, 'C'),
		createNote('eighth', 5, 'C', false, true),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A')
	]);
	applyTact([
		createNote('half', 5, 'D'),
		createNote('eighth', 5, 'D', false, true),
		createNote('eighth', 4, 'Bb'),
		createNote('eighth', 5, 'C'),
		createNote('eighth', 5, 'D')
	]);
	applyTact([
		createNote('eighth', 5, 'Eb'),
		createNote('quarter', 5, 'E'),
		createNote('eighth', 5, 'E'),
		createNote('eighth', 5, 'E', false, true),
		createNote('eighth', 5, 'D'),
		createNote('quarter', 5, 'C')
	]);

	applyTact([
		createNote('halfPeriod', 5, 'D'),
		createNote('quarter', 5, 'D')
	]);
	applyTact([
		createNote('quarterPeriod', 5, 'C'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'G', false, true),
		createNote('eighth', 4, 'G'),
		createNote('quarter', 5, 'D')
	]);
	applyTact([
		createNote('half', 5, 'C'),
		createNote('eighth', 5, 'C', false, true),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'G#')
	]);
	applyTact([
		createNote('half', 4, 'A'),
		createNote('eighth', 4, 'A', false, true),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G', true),
		createNote('eighth', 4, 'A')
	]);
	applyTact([
		createNote('half', 4, 'Bb'),
		createNote('eighth', 4, 'B', false, true),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A')
	]);

	applyTact([
		createNote('half', 5, 'C'),
		createNote('eighth', 5, 'C', false, true),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A')
	]);
	applyTact([
		createNote('half', 5, 'D'),
		createNote('eighth', 5, 'D', false, true),
		createNote('eighth', 4, 'Bb'),
		createNote('eighth', 5, 'C'),
		createNote('eighth', 5, 'D')
	]);
	applyTact([
		createNote('eighth', 5, 'Eb'),
		createNote('quarter', 5, 'E'),
		createNote('eighth', 5, 'E'),
		createNote('eighth', 5, 'E', false, true),
		createNote('eighth', 5, 'D'),
		createNote('quarter', 5, 'C')
	]);

	applyTact([
		createNote('halfPeriod', 5, 'D'),
		createNote('quarter', 5, 'D')
	]);
	applyTact([
		createNote('quarterPeriod', 5, 'C'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'F', false, true),
		createNote('eighth', 5, 'D'),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 5, 'D')
	]);
	applyTact([
		createNote('half', 4, 'Bb'),
		createNote('eighth', 4, 'B', false, true),
		createNote('eighth', 4, 'F'),
		createNote('eighth', 4, 'G'),
		createNote('eighth', 4, 'A')
	]);

	gameController.setGame(game);
});