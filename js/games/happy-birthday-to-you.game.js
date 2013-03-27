require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(80);

	function createNote(type, octave, nodeName) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName]);
	}
	function createRest(type) {
		return new Node(options.nodes.types.rest[type], options.tones.rest);
	}
	function applyTact(type, nodes) {
		var tact    = new Tact(options.tacts.types[type]);

		nodes.forEach(function(node) {
			tact.addNode(node);
		})

		game.addTact(tact);

		return;
	}

	function block1() {
		applyTact('threeForth', [
			createRest("quarter"),
			createRest("quarter"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "G")
		]);

		applyTact('threeForth', [
			createNote("quarter", 4, "A"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 5, "C")
		]);

		applyTact('threeForth', [
			createNote("half", 4, "B"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "G")
		]);

		applyTact('threeForth', [
			createNote("quarter", 4, "A"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 5, "D")
		]);

		applyTact('threeForth', [
			createNote("half", 5, "C"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "G")
		]);

		applyTact('threeForth', [
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "C")
		]);

		applyTact('threeForth', [
			createNote("quarter", 4, "B"),
			createNote("quarter", 4, "A"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "F")
		]);

		applyTact('threeForth', [
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "D")
		]);

		applyTact('threeForth', [
			createNote("half", 5, "C"),
		]);
	}

	block1();

	gameController.setGame(game);
});