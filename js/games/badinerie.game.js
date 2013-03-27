require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(80);

	function createNote(type, octave, nodeName) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName]);
	}
	function createRest(type) {
		return new Node(options.nodes.types.rest[type], options.tones.rest);
	}
	function applyTact(game, nodes) {
		var tact	= new Tact(options.tacts.types.quarter);

		nodes.forEach(function(node) {
			tact.addNode(node);
		})

		game.addTact(tact);

		return;
	}

	function block1() {
		applyTact(game, [
			createRest("quarter"),
			createRest("quarter"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 6, "C"),
			createNote("eighth", 5, "A")
		]);
		applyTact(game, [
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "A"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "C"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "C")
		]);
		applyTact(game, [
			createNote("half", 4, "A"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "A")
		]);

		applyTact(game, [
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "G#"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 4, "B")
		]);
		applyTact(game, [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 6, "C"),
			createNote("eighth", 5, "A")
		]);
		applyTact(game, [
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "A"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "C"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "C")
		]);

		applyTact(game, [
			createNote("half", 4, "A"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);
		applyTact(game, [
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "A"),
			createNote("quarter", 5, "C")
		]);
		applyTact(game, [
			createNote("sixteenth", 5, "C"),
			createNote("sixteenth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 4, "B"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "E")
		]);

		applyTact(game, [
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 6, "C"),
			createNote("quarter", 5, "E")
		]);
		applyTact(game, [
			createNote("sixteenth", 5, "E"),
			createNote("sixteenth", 5, "F#"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "D#"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "E")
		]);
		applyTact(game, [
			createNote("eighth", 5, "F#"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "D#"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "A"),
			createNote("eighth", 5, "F")
		]);

		applyTact(game, [
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F#"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "D#")
		]);
		applyTact(game, [
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "A"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "D#"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "D")
		]);
		applyTact(game, [
			createNote("eighth", 5, "E"),
			createNote("eighth", 6, "C"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "D#"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 6, "C"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "A")
		]);

		applyTact(game, [
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F#"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "G"),
			createNote("sixteenth", 5, "F"),
			createNote("sixteenth", 5, "G"),
			createNote("eighth", 5, "F")
		]);
		applyTact(game, [
			createNote("whole", 5, "E")
		]);
	}
	function block2() {
		applyTact(game, [
			createRest("quarter"),
			createRest("quarter"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "E")
		]);

		applyTact(game, [
			createNote("quarter", 4, "B"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 4, "B"),
			createNote("quarter", 4, "G"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "G")
		]);
		applyTact(game, [
			createNote("half", 4, "E"),
			createNote("quarter", 4, "Bb"),
			createNote("quarter", 4, "A")
		]);
		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("eighth", 5, "C#"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "G"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E")
		]);

		applyTact(game, [
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "F"),
			createNote("eighth", 5, "A"),
			createNote("eighth", 5, "F")
		]);
		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "D"),
			createNote("quarter", 4, "B"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 4, "B")
		]);
		applyTact(game, [
			createNote("half", 4, "G"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "C")
		]);

		applyTact(game, [
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "A"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "A"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F")
		]);
		applyTact(game, [
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("sixteenth", 5, "D"),
			createNote("sixteenth", 5, "E"),
			createNote("eighth", 5, "D")
		]);
		applyTact(game, [
			createNote("half", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "E")
		]);

		applyTact(game, [
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 6, "C"),
			createNote("quarter", 5, "E")
		]);
		applyTact(game, [
			createNote("sixteenth", 5, "E"),
			createNote("sixteenth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "D")
		]);
		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "B"),
			createNote("quarter", 5, "D")
		]);

		applyTact(game, [
			createNote("sixteenth", 5, "D"),
			createNote("sixteenth", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 6, "C"),
			createNote("eighth", 5, "A")
		]);
		applyTact(game, [
			createNote("eighth", 5, "G"),
			createNote("quarterPeriod", 5, "F"),
			createNote("quarter", 5, "F"),
			createNote("sixteenth", 5, "A"),
			createNote("sixteenth", 5, "G"),
			createNote("sixteenth", 5, "F"),
			createNote("sixteenth", 5, "E")
		]);
		applyTact(game, [
			createNote("half", 5, "D"),
			createNote("quarter", 5, "D"),
			createNote("sixteenth", 5, "F"),
			createNote("sixteenth", 5, "E"),
			createNote("sixteenth", 5, "D"),
			createNote("sixteenth", 5, "C")
		]);

		applyTact(game, [
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A")
		]);
		applyTact(game, [
			createNote("quarter", 4, "G#"),
			createNote("quarter", 4, "E"),
			createNote("quarter", 4, "F"),
			createNote("quarter", 4, "E")
		]);
		applyTact(game, [
			createNote("quarter", 4, "A"),
			createNote("eighth", 4, "G#"),
			createNote("eighth", 4, "B"),
			createNote("quarter", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B")
		]);

		applyTact(game, [
			createNote("quarter", 5, "C"),
			createNote("sixteenth", 4, "A"),
			createNote("sixteenth", 4, "B"),
			createNote("sixteenth", 5, "C"),
			createNote("sixteenth", 5, "D"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "E")
		]);
		applyTact(game, [
			createNote("quarter", 5, "A"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C")
		]);
		applyTact(game, [
			createNote("eighth", 4, "B"),
			createNote("quarterPeriod", 4, "A"),
			createNote("half", 4, "A")
		]);
	}

	block1();
	block1();
	block2();
	block2();

	gameController.setGame(game);
});