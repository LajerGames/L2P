require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(100);

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
		applyTact("quarter", [
			createNote("quarterPeriod", 5, "C"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);

		applyTact("quarter", [
			createNote("half", 4, "B"),
			createNote("half", 4, "G")
		]);

		applyTact("quarter", [
			createNote("half", 4, "A"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);

		applyTact("quarter", [
			createNote("halfPeriod", 4, "G"),
			createNote("quarter", 4, "G")
		]);

		applyTact("quarter", [
			createNote("quarter", 4, "F"),
			createNote("quarter", 4, "F"),
			createNote("quarterPeriod", 4, "G"),
			createNote("eighth", 4, "F")
		]);

		applyTact("quarter", [
			createNote("quarter", 4, "E"),
			createNote("quarter", 4, "G"),
			createNote("quarter", 5, "C"),
			createRest("eighth"),
			createNote("eighth", 5, "C")
		]);

		applyTact("quarter", [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("quarter", 4, "B"),
			createNote("quarter", 5, "C")
		]);

		applyTact("quarter", [
			createNote("halfPeriod", 5, "D")
		]);

		applyTact("quarter", [
			createNote("quarterPeriod", 5, "C"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);

		applyTact("quarter", [
			createNote("half", 4, "B"),
			createNote("half", 4, "G")
		]);

		applyTact("quarter", [
			createNote("half", 4, "A"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 5, "C")
		]);

		applyTact("quarter", [
			createNote("halfPeriod", 4, "G"),
			createNote("quarter", 4, "G"),
		]);

		applyTact("quarter", [
			createNote("quarter", 4, "F"),
			createNote("quarter", 4, "F"),
			createNote("quarterPeriod", 4, "G"),
			createNote("eighth", 4, "F")
		]);

		applyTact("quarter", [
			createNote("quarter", 4, "E"),
			createNote("quarter", 4, "G"),
			createNote("quarterPeriod", 5, "C"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "C")
		]);

		applyTact("quarter", [
			createNote("quarter", 4, "A"),
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "B"),
			createNote("quarter", 5, "D")
		]);

		applyTact("quarter", [
			createNote("halfPeriod", 5, "C")
		]);
	}

	block1();

	gameController.setGame(game);
});