require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(80);
	game.speed    = 140;

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
		applyTact('quarter', [
			createNote("quarter", 5, "E"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "D"),
			createNote("sixteenth", 5, "E"),
			createNote("sixteenth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "A"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarterPeriod", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("half", 4, "A")
		]);

		applyTact('quarter', [
			createRest("eighth"),
			createNote("quarter", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F")
		]);

		applyTact('quarter', [
			createNote("quarterPeriod", 5, "E"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "B"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("quarter", 4, "A")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "E"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "D"),
			createNote("sixteenth", 5, "E"),
			createNote("sixteenth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "A"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarterPeriod", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("half", 4, "A")
		]);

		applyTact('quarter', [
			createRest("eighth"),
			createNote("quarter", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F")
		]);

		applyTact('quarter', [
			createNote("quarterPeriod", 5, "E"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "B"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("quarter", 4, "A")
		]);

		applyTact('quarter', [
			createNote("half", 4, "E"),
			createNote("half", 4, "C")
		]);

		applyTact('quarter', [
			createNote("half", 4, "D"),
			createNote("half", 3, "B")
		]);

		applyTact('quarter', [
			createNote("half", 4, "C"),
			createNote("half", 3, "A")
		]);

		applyTact('quarter', [
			createNote("half", 3, "G#"),
			createNote("quarter", 3, "B")
		]);

		applyTact('quarter', [
			createNote("half", 4, "E"),
			createNote("half", 4, "C")
		]);

		applyTact('quarter', [
			createNote("half", 4, "D"),
			createNote("half", 3, "B")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "C"),
			createNote("quarter", 4, "E"),
			createNote("half", 4, "A")
		]);

		applyTact('quarter', [
			createNote("half", 4, "G#")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "E"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "D"),
			createNote("sixteenth", 5, "E"),
			createNote("sixteenth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "A"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarterPeriod", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("half", 4, "A")
		]);

		applyTact('quarter', [
			createRest("eighth"),
			createNote("quarter", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F")
		]);

		applyTact('quarter', [
			createNote("quarterPeriod", 5, "E"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "B"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("quarter", 4, "A")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "E"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 5, "D"),
			createNote("sixteenth", 5, "E"),
			createNote("sixteenth", 5, "D"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 4, "B")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "A"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarterPeriod", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("half", 4, "A")
		]);

		applyTact('quarter', [
			createRest("eighth"),
			createNote("quarter", 5, "D"),
			createNote("eighth", 5, "F"),
			createNote("quarter", 5, "A"),
			createNote("eighth", 5, "G"),
			createNote("eighth", 5, "F")
		]);

		applyTact('quarter', [
			createNote("quarterPeriod", 5, "E"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "E"),
			createNote("eighth", 5, "D"),
			createNote("eighth", 5, "C")
		]);

		applyTact('quarter', [
			createNote("quarter", 4, "B"),
			createNote("eighth", 4, "B"),
			createNote("eighth", 5, "C"),
			createNote("quarter", 5, "D"),
			createNote("quarter", 5, "E")
		]);

		applyTact('quarter', [
			createNote("quarter", 5, "C"),
			createNote("quarter", 4, "A"),
			createNote("quarter", 4, "A")
		]);
	}

	block1();

	gameController.setGame(game);
});