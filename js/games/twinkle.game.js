require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(120);

	function createNote(type, octave, nodeName) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName]);
	}
	function applyTact(game, nodes) {
		var tact	= new Tact(options.tacts.types.quarter);

		nodes.forEach(function(node) {
			tact.addNode(node);
		})

		game.addTact(tact);

		return;
	}

	game.setSharp("C");
	game.setSharp("F");

	applyTact(game, [
		createNote("quarter", 4, "A"),
		createNote("quarter", 4, "A"),
		createNote("quarter", 5, "E"),
		createNote("quarter", 5, "E")
	]);

	applyTact(game, [
		createNote("quarter", 5, "F"),
		createNote("quarter", 5, "F"),
		createNote("half", 5, "E")
	]);

	applyTact(game, [
		createNote("quarter", 5, "D"),
		createNote("quarter", 5, "D"),
		createNote("quarter", 5, "C"),
		createNote("quarter", 5, "C")
	]);

	applyTact(game, [
		createNote("quarter", 4, "B"),
		createNote("quarter", 4, "B"),
		createNote("half", 4, "A")
	]);

	applyTact(game, [
		createNote("quarter", 5, "E"),
		createNote("quarter", 5, "E"),
		createNote("quarter", 5, "D"),
		createNote("quarter", 5, "D")
	]);

	applyTact(game, [
		createNote("quarter", 5, "C"),
		createNote("quarter", 5, "C"),
		createNote("half", 4, "B")
	]);

	applyTact(game, [
		createNote("quarter", 5, "E"),
		createNote("quarter", 5, "E"),
		createNote("quarter", 5, "D"),
		createNote("quarter", 5, "D")
	]);

	applyTact(game, [
		createNote("quarter", 5, "C"),
		createNote("quarter", 5, "C"),
		createNote("half", 4, "B")
	]);

	applyTact(game, [
		createNote("quarter", 4, "A"),
		createNote("quarter", 4, "A"),
		createNote("quarter", 5, "E"),
		createNote("quarter", 5, "E")
	]);

	applyTact(game, [
		createNote("quarter", 5, "F"),
		createNote("quarter", 5, "F"),
		createNote("half", 5, "E")
	]);

	applyTact(game, [
		createNote("quarter", 5, "D"),
		createNote("quarter", 5, "D"),
		createNote("quarter", 5, "C"),
		createNote("quarter", 5, "C")
	]);

	applyTact(game, [
		createNote("quarter", 4, "B"),
		createNote("quarter", 4, "B"),
		createNote("half", 4, "A")
	]);

	gameController.setGame(game);
});