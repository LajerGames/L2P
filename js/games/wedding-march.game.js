require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
	var game = new Game(120);

	function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
		return new Node(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey, isSlur);
	}
	function applyTact(game, nodes) {
		var tact    = new Tact(options.tacts.types.quarter);

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
		createNote("eighthPeriod", 4, "A", false, true),
		createNote("sixteenth", 4, "A", false, true),
		createNote("quarter", 4, "A"),
		createNote("quarter", 4, "A")
	]);

	applyTact(game, [
		createNote("half", 4, "A"),
		createNote("half", 4, "A")
	]);

	applyTact(game, [
		createNote("quarter", 4, "A"),
		createNote("eighthPeriod", 5, "D"),
		createNote("sixteenth", 5, "D"),
		createNote("half", 5, "D")
	]);

	applyTact(game, [
		createNote("quarter", 4, "A"),
		createNote("eighthPeriod", 5, "E"),
		createNote("sixteenth", 5, "C"),
		createNote("half", 5, "D")
	]);

	applyTact(game, [
		createNote("quarter", 4, "A"),
		createNote("eighthPeriod", 5, "D"),
		createNote("sixteenth", 5, "G"),
		createNote("quarter", 5, "G"),
		createNote("eighthPeriod", 5, "F"),
		createNote("sixteenth", 5, "E")
	]);

	applyTact(game, [
		createNote("quarter", 5, "D"),
		createNote("eighthPeriod", 5, "C"),
		createNote("sixteenth", 5, "D"),
		createNote("half", 5, "E")
	]);

	applyTact(game, [
		createNote("quarter", 4, "A"),
		createNote("eighthPeriod", 5, "D"),
		createNote("sixteenth", 5, "D"),
		createNote("half", 5, "D")
	]);

	applyTact(game, [
		createNote("quarter", 4, "A"),
		createNote("eighthPeriod", 5, "E"),
		createNote("sixteenth", 5, "C"),
		createNote("half", 5, "D")
	]);

	applyTact(game, [
		createNote("quarter", 4, "A"),
		createNote("eighthPeriod", 5, "D"),
		createNote("sixteenth", 5, "F"),
		createNote("quarter", 5, "A"),
		createNote("eighthPeriod", 5, "F"),
		createNote("sixteenth", 5, "D")
	]);

	applyTact(game, [
		createNote("quarter", 4, "B"),
		createNote("eighthPeriod", 5, "E"),
		createNote("sixteenth", 5, "F"),
		createNote("half", 5, "D")
	]);

	applyTact(game, [
		createNote("quarter", 5, "G"),
		createNote("eighth", 5, "F"),
		createNote("eighth", 5, "E"),
		createNote("quarter", 4, "B"),
		createNote("quarter", 4, "B")
	]);

	applyTact(game, [
		createNote("quarter", 5, "C"),
		createNote("eighthPeriod", 5, "D"),
		createNote("sixteenth", 5, "E"),
		createNote("half", 5, "E")
	]);

	applyTact(game, [
		createNote("quarter", 5, "G"),
		createNote("eighth", 5, "F"),
		createNote("eighth", 5, "E"),
		createNote("quarter", 4, "B"),
		createNote("quarter", 4, "B")
	]);

	applyTact(game, [
		createNote("quarter", 4, "B"),
		createNote("eighthPeriod", 5, "C"),
		createNote("sixteenth", 5, "D#"),
		createNote("half", 5, "D#")
	]);

	applyTact(game, [
		createNote("quarter", 4, "F"),
		createNote("eighth", 4, "G#"),
		createNote("eighth", 4, "F"),
		createNote("quarter", 4, "E"),
		createNote("quarter", 4, "D#")
	]);

	applyTact(game, [
		createNote("quarter", 4, "F"),
		createNote("eighth", 4, "G#"),
		createNote("eighth", 4, "F"),
		createNote("quarter", 4, "E"),
		createNote("quarter", 4, "D#")
	]);

	gameController.setGame(game);
});