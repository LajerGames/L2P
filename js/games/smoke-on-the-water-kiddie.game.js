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

	applyTact(game, [
		createNote("quarter", 4, "C"),
		createNote("quarter", 4, "D"),
		createNote("half", 4, "E")
	]);

	applyTact(game, [
		createNote("quarter", 4, "C"),
		createNote("quarter", 4, "D"),
		createNote("eighth", 4, "F"),
		createNote("quarter", 4, "E"),
		createRest("eighth")
	]);

	applyTact(game, [
		createNote("quarter", 4, "C"),
		createNote("quarter", 4, "D"),
		createNote("half", 4, "E")
	]);

	applyTact(game, [
		createNote("eighth", 4, "D"),
		createNote("quarter", 4, "C"),
		createRest("eighth"),
		createRest("quarter"),
		createRest("quarter")
	]);

	gameController.setGame(game);
});