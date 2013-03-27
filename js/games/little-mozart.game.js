require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(80);
	game.speed	= 140;

	function createNote(type, octave, nodeName) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName]);
	}
	function createRest(type) {
		return new Node(options.nodes.types.rest[type], options.tones.rest);
	}
	function applyTact(type, nodes) {
		var tact	= new Tact(options.tacts.types[type]);

		nodes.forEach(function(node) {
			tact.addNode(node);
		})

		game.addTact(tact);

		return;
	}

	function block1() {
		applyTact('quarter', [
			createNote("quarter", 6, "C"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "A"),
			createNote("quarter", 5, "G"),
			createRest("eighth"),
			createNote("eighth", 5, "A")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "F")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("quarter", 6, "C"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "A"),
			createNote("quarter", 5, "G"),
			createRest("eighth"),
			createNote("eighth", 5, "A")
		]);

		applyTact('quarter', [
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 4, "B")
		]);
		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);
		applyTact('quarter', [
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D")
		]);
		applyTact('quarter', [
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D")
		]);
		applyTact('quarter', [
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "E")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "G"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "G"),
			createNote("quarter", 5, "A")
		]);
		applyTact('quarter', [
			createNote("quarter", 6, "C"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "G"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "G"),
			createNote("quarter", 5, "A")
		]);

		applyTact('quarter', [
			createNote("quarter", 6, "C"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("quarter", 6, "C"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "A"),
			createNote("quarter", 5, "G"),
			createRest("eighth"),
			createNote("eighth", 5, "A")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "F")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);

		applyTact('quarter', [
			createNote("quarter", 6, "C"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "A"),
			createNote("quarter", 5, "G"),
			createRest("eighth"),
			createNote("eighth", 5, "A")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 4, "B")
		]);
		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);
		applyTact('quarter', [
			createNote("quarter", 4, "B"),
			createNote("quarter", 4, "B"),
			createNote("quarter", 4, "B")
		]);

		applyTact('quarter', [
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "G"),
			createNote("quarter", 5, "C")
		]);
		applyTact('quarter', [
			createNote("quarter", 4, "B"),
			createNote("quarter", 4, "B"),
			createNote("quarter", 4, "B")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "G"),
			createNote("quarter", 5, "C")
		]);
		applyTact('quarter', [
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "E")
		]);
		applyTact('quarter', [
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "F"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "E"),
			createNote("quarter", 5, "E")
		]);
		applyTact('quarter', [
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "C")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "G"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "D"),
			createNote("quarter", 5, "G"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "D"),
			createNote("quarter", 5, "G")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "E")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "G"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "D"),
			createNote("quarter", 5, "G"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "D"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarter", 6, "C"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "A"),
			createNote("quarter", 5, "G"),
			createRest("eighth"),
			createNote("eighth", 5, "A")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "F")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("quarter", 6, "C"),
			createNote("eighth", 5, "B"),
			createNote("eighth", 5, "A"),
			createNote("quarter", 5, "G"),
			createRest("eighth"),
			createNote("eighth", 5, "A")
		]);

		applyTact('quarter', [
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F"),
			createNote("eighth", 5, "E"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 5, "G")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "E"),
			createNote("quarter", 5, "F"),
			createNote("quarter", 5, "G"),
			createNote("quarter", 4, "B")
		]);
		applyTact('quarter', [
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "B"),
			createNote("quarter", 5, "C")
		]);
	}

	block1();

	gameController.setGame(game);
});