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
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "C"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "F"),
			createNote("quarter", 4, "G")
		]);
		applyTact(game, [
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "D"),
			createNote("quarter", 4, "C")
		]);
	}
	function block2() {
		applyTact(game, [
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "F#"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "A"),
			createNote("quarter", 4, "B")
		]);
		applyTact(game, [
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F#"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "B"),
			createNote("quarter", 4, "D")
		]);
		applyTact(game, [
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "F#"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "A"),
			createNote("quarter", 4, "B")
		]);
		applyTact(game, [
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F#"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "G"),
			createNote("quarter", 4, "G")
		]);
	}
	function block3() {
		applyTact(game, [
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "C"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 5, "C")
		]);
		applyTact(game, [
			createNote("eighth", 4, "C"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "D"),
			createNote("quarter", 4, "E")
		]);
		applyTact(game, [
			createNote("whole", 4, "C")
		]);
	}

	block1();
	block1();
	block2();
	block3();

	gameController.setGame(game);
});