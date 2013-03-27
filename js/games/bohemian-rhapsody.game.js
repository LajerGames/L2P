require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(80);

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
			createRest("eighth"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "Bb"),
			createNote("quarter", 4, "Bb"),
			createNote("quarter", 4, "Bb")
		]);
		applyTact('quarter', [
			createRest("eighth"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "Bb"),
			createNote("quarter", 4, "G")
		]);
		applyTact('fiveForth', [
			createRest("eighth"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "A"),
			createNote("quarter", 4, "Bb"),
			createNote("quarter", 4, "A"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "F")
		]);

		applyTact('quarter', [
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "A"),
			createNote("quarterPeriod", 4, "F")
		]);
		applyTact('quarter', [
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "D"),
			createNote("quarterPeriod", 4, "D"),
			createNote("eighth", 4, "D")
		]);
		applyTact('quarter', [
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "Eb"),
			createNote("eighth", 4, "F"),
			createNote("quarter", 4, "F"),
			createNote("quarter", 3, "Bb")
		]);

		applyTact('quarter', [
			createNote("whole", 4, "G")
		]);
		applyTact('quarter', [
			createRest("eighth"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "G"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 4, "G")
		]);
		applyTact('fiveForth', [
			createRest("eighth"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "Eb"),
			createNote("eighth", 4, "C"),
			createNote("eighth", 4, "G"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "Bb")
		]);

		applyTact('quarter', [
			createNote("eighth", 4, "B"),
			createNote("eighth", 4, "Bb"),
			createNote("quarter", 4, "Bb"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "A"),
			createNote("quarter", 4, "Bb")
		]);
	}

	block1();

	gameController.setGame(game);
});