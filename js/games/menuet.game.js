require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(80);

	function createNote(type, octave, nodeName) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName]);
	}
	function createRest(type) {
		return new Node(options.nodes.types.rest[type], options.tones.rest);
	}
	function applyTact(game, nodes) {
		var tact	= new Tact(options.tacts.types.threeForth);

		nodes.forEach(function(node) {
			tact.addNode(node);
		})

		game.addTact(tact);

		return;
	}

	function block1() {
		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C")
		]);
		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 4, "G")
		]);
		applyTact(game, [
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F#")
		]);
		applyTact(game, [
			createNote("quarter", 5, "G"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 4, "G")
		]);

		applyTact(game, [
			createNote("quarter", 5, "C"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A")
		]);
		applyTact(game, [
			createNote("quarter", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "G")
		]);
		applyTact(game, [
			createNote("quarter", 4, "F#"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "G")
		]);
		applyTact(game, [
			createNote("halfPeriod", 4, "A")
		]);

		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C")
		]);
		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 4, "G")
		]);
		applyTact(game, [
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F#")
		]);
		applyTact(game, [
			createNote("quarter", 5, "G"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 4, "G")
		]);

		applyTact(game, [
			createNote("quarter", 5, "C"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A")
		]);
		applyTact(game, [
			createNote("quarter", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "G")
		]);
		applyTact(game, [
			createNote("quarter", 4, "A"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F#")
		]);
		applyTact(game, [
			createNote("halfPeriod", 4, "G")
		]);
	}
	function block2() {
		applyTact(game, [
			createNote("quarter", 5, "B"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "A"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "G")
		]);
		applyTact(game, [
			createNote("quarter", 5, "A"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F#"),
			createNote("eighth", 5, "D")
		]);
		applyTact(game, [
			createNote("quarter", 5, "G"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F#"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "D")
		]);

		applyTact(game, [
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C#"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F#")
		]);
		applyTact(game, [
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "F#"),
			createNote("quarter", 5, "E")
		]);
		applyTact(game, [
			createNote("quarter", 5, "F#"),
			createNote("quarter", 4, "A"),
			createNote("quarter", 5, "C#")
		]);
		applyTact(game, [
			createNote("halfPeriod", 5, "D")
		]);

		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F#"),
			createNote("quarter", 4, "G")
		]);
		applyTact(game, [
			createNote("quarter", 5, "E"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F#"),
			createNote("quarter", 4, "G")
		]);
		applyTact(game, [
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "B")
		]);
		applyTact(game, [
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F#"),
			createNote("eighth", 4, "G"),
			createNote("quarter", 4, "A")
		]);

		applyTact(game, [
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "F#"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "B")
		]);
		applyTact(game, [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "B"),
			createNote("quarter", 4, "A")
		]);
		applyTact(game, [
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "D"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 4, "F#")
		]);
		applyTact(game, [
			createNote("halfPeriod", 4, "G")
		]);
	}

	block1();
	block2();
	block2();

	gameController.setGame(game);
});