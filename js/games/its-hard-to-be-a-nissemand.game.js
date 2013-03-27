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
			createNote("quarter", 4, "E"),
			createNote("quarter", 4, "C"),
			createNote("quarter", 3, "G")
		]);

		applyTact(game, [
			createNote("quarter", 3, "A"),
			createNote("quarter", 4, "C"),
			createNote("quarter", 4, "C"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "E")
		]);

		applyTact(game, [
			createNote("quarter", 4, "E")
		]);
	}
	function block2() {
		applyTact(game, [
			createRest("quarter"),
			createNote("quarter", 4, "E"),
			createNote("quarter", 4, "C"),
			createNote("quarter", 3, "G")
		]);

		applyTact(game, [
			createNote("quarter", 3, "A"),
			createNote("quarter", 4, "C"),
			createNote("quarter", 4, "C"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "C")
		]);

		applyTact(game, [
			createNote("quarter", 4, "C")
		]);
	}
	function block3() {
		applyTact(game, [
			createRest("quarter"),
			createNote("quarter", 4, "E"),
			createNote("quarter", 4, "C"),
			createNote("quarter", 3, "G")
		]);

		applyTact(game, [
			createNote("quarter", 3, "A"),
			createNote("quarter", 4, "C"),
			createNote("eighth", 4, "C"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "C")
		]);

		applyTact(game, [
			createNote("quarter", 4, "C")
		]);
	}

	function block4() {
		applyTact(game, [
			createNote("halfPeriod", 4, "Bb"),
			createNote("quarter", 4, "G")
		]);

		applyTact(game, [
			createNote("quarter", 4, "Ab"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 4, "F"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F")
		]);

		applyTact(game, [
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "Eb"),
			createNote("eighth", 4, "Eb"),
			createNote("eighth", 4, "Eb"),
			createNote("quarter", 4, "Eb")
		]);
	}
	function block5() {
		applyTact(game, [
			createNote("halfPeriod", 4, "Bb"),
			createNote("quarter", 4, "G")
		]);

		applyTact(game, [
			createNote("quarter", 4, "Ab"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 4, "F"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F")
		]);

		applyTact(game, [
			createNote("eighth", 4, "F"),
			createNote("quarter", 4, "Eb")
		]);
	}
	function block6() {
		applyTact(game, [
			createRest("quarter"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);
	}

	block1();
	block2();
	block1();
	block3();

	block4();
	//applyTact(game, []);
	block5();
	//applyTact(game, []);
	block4();
	//applyTact(game, []);
	block6();
	block5();

	gameController.setGame(game);
});