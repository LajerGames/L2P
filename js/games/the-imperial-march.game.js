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

	game.setFlat('B');
	game.setFlat('E');

	function block0() {
		applyTact([
			createNote('quarter', 4, 'G'),
			createNote('quarter', 4, 'G'),
			createNote('quarter', 4, 'G'),
			createNote('eighthPeriod', 4, 'E'),
			createNote('sixteenth', 4, 'B')
		]);
		applyTact([
			createNote('quarter', 4, 'G'),
			createNote('eighthPeriod', 4, 'E'),
			createNote('sixteenth', 4, 'B'),
			createNote('half', 4, 'G')
		]);
		applyTact([
			createNote('quarter', 5, 'D'),
			createNote('quarter', 5, 'D'),
			createNote('quarter', 5, 'D'),
			createNote('eighthPeriod', 5, 'E'),
			createNote('sixteenth', 4, 'B')
		]);
		applyTact([
			createNote('quarter', 4, 'Gb'),
			createNote('eighthPeriod', 4, 'E'),
			createNote('sixteenth', 4, 'B'),
			createNote('half', 4, 'G', true)
		]);
		applyTact([
			createNote('quarter', 5, 'G'),
			createNote('eighthPeriod', 4, 'G'),
			createNote('sixteenth', 4, 'G'),
			createNote('quarter', 5, 'G'),
			createNote('eighthPeriod', 5, 'F#'),
			createNote('sixteenth', 5, 'F', true)
		]);
		applyTact([
			createNote('sixteenth', 5, 'E', true),
			createNote('sixteenth', 5, 'D#'),
			createNote('eighth', 5, 'E'),
			createRest('eighth'),
			createNote('eighth', 4, 'G#'),
			createNote('quarter', 5, 'C#'),
			createNote('eighthPeriod', 5, 'C', true),
			createNote('sixteenth', 4, 'B', true)
		]);
	}
	function block1() {
		applyTact([
			createNote('sixteenth', 4, 'B'),
			createNote('sixteenth', 4, 'A'),
			createNote('eighth', 4, 'B'),
			createRest('eighth'),
			createNote('eighth', 4, 'E'),
			createNote('quarter', 4, 'Gb'),
			createNote('eighthPeriod', 4, 'E'),
			createNote('sixteenth', 4, 'G')
		]);
		applyTact([
			createNote('quarter', 4, 'B'),
			createNote('eighthPeriod', 4, 'G'),
			createNote('sixteenth', 4, 'B'),
			createNote('half', 5, 'D')
		]);
		applyTact([
			createNote('quarter', 5, 'G'),
			createNote('eighthPeriod', 4, 'G'),
			createNote('sixteenth', 4, 'G'),
			createNote('quarter', 5, 'G'),
			createNote('eighthPeriod', 5, 'F#'),
			createNote('sixteenth', 5, 'F', true)
		]);
		applyTact([
			createNote('sixteenth', 5, 'E', true),
			createNote('sixteenth', 5, 'D#'),
			createNote('eighth', 5, 'E'),
			createRest('eighth'),
			createNote('eighth', 4, 'G#'),
			createNote('quarter', 5, 'C#'),
			createNote('eighthPeriod', 5, 'C', true),
			createNote('sixteenth', 4, 'B', true)
		]);
		applyTact([
			createNote('sixteenth', 4, 'B'),
			createNote('sixteenth', 4, 'A'),
			createNote('eighth', 4, 'B'),
			createRest('eighth'),
			createNote('eighth', 4, 'E'),
			createNote('quarter', 4, 'Gb'),
			createNote('eighthPeriod', 4, 'E'),
			createNote('sixteenth', 4, 'B')
		]);
		applyTact([
			createNote('quarter', 4, 'G'),
			createNote('eighthPeriod', 4, 'E'),
			createNote('sixteenth', 4, 'B'),
			createNote('half', 4, 'G')
		]);
	}
	function block2() {
		applyTact([
			createNote('sixteenth', 4, 'B'),
			createNote('sixteenth', 4, 'A'),
			createNote('eighth', 4, 'B'),
			createRest('eighth'),
			createNote('eighth', 4, 'E'),
			createNote('quarter', 4, 'G'),
			createNote('eighthPeriod', 4, 'E'),
			createNote('sixteenth', 4, 'B')
		]);
		applyTact([
			createNote('quarter', 4, 'Gb'),
			createNote('eighthPeriod', 4, 'E'),
			createNote('sixteenth', 4, 'B'),
			createNote('half', 4, 'G')
		]);
	}

	block0();
	block1();
	/*block0();
	block2();*/

	gameController.setGame(game);
});