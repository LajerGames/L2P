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
		createNote("quarter", 4, "G"),
		createNote("eighth", 4, "G"),
		createNote("eighth", 4, "A"),
		createNote("quarter", 4, "B"),
		createNote("eighth", 4, "G"),
		createNote("eighth", 4, "D")
	]);
	applyTact(game, [
		createNote("quarter", 4, "E"),
		createNote("eighth", 4, "E"),
		createNote("eighth", 4, "E"),
		createNote("quarter", 4, "A"),
		createRest("eighth"),
		createNote("eighth", 4, "G")
	]);
	applyTact(game, [
		createNote("quarter", 4, "F#"),
		createNote("eighth", 4, "F#"),
		createNote("eighth", 4, "F#"),
		createNote("quarter", 4, "E"),
		createNote("quarter", 4, "F#")
	]);
	applyTact(game, [
		createNote("quarter", 4, "G"),
		createNote("quarter", 4, "B"),
		createNote("quarter", 5, "D")
	]);
	applyTact(game, [
		createNote("quarter", 4, "G"),
		createNote("eighth", 4, "G"),
		createNote("eighth", 4, "A"),
		createNote("eighth", 4, "B"),
		createNote("eighth", 4, "A"),
		createNote("eighth", 4, "G"),
		createNote("eighth", 4, "D")
	]);
	applyTact(game, [
		createNote("quarter", 4, "E"),
		createNote("quarter", 4, "E"),
		createNote("quarter", 4, "A"),
		createRest("eighth"),
		createNote("eighth", 4, "G")
	]);
	applyTact(game, [
		createNote("quarter", 4, "F#"),
		createNote("eighth", 4, "F#"),
		createNote("eighth", 4, "F#"),
		createNote("quarter", 4, "F#"),
		createNote("eighth", 4, "E"),
		createNote("eighth", 4, "F#")
	]);
	applyTact(game, [
		createNote("quarter", 4, "G"),
		createNote("eighth", 4, "G"),
		createNote("eighth", 4, "G"),
		createNote("quarter", 4, "G")
	]);

	applyTact(game, [
		createNote("quarterPeriod", 4, "G"),
		createNote("eighth", 4, "A"),
		createNote("eighth", 4, "B"),
		createNote("eighth", 4, "A"),
		createNote("eighth", 4, "G"),
		createNote("eighth", 4, "D")
	]);
	applyTact(game, [
		createNote("quarter", 4, "E"),
		createNote("quarter", 4, "E"),
		createNote("quarter", 4, "A"),
		createRest("eighth"),
		createNote("eighth", 4, "G")
	]);
	applyTact(game, [
		createNote("quarter", 4, "F#"),
		createNote("eighthPeriod", 4, "F#"),
		createNote("sixteenth", 4, "F#"),
		createNote("quarter", 4, "F#"),
		createNote("eighthPeriod", 4, "E"),
		createNote("sixteenth", 4, "F#")
	]);
	applyTact(game, [
		createNote("quarter", 4, "G"),
		createNote("eighthPeriod", 4, "G"),
		createNote("sixteenth", 4, "G"),
		createNote("quarter", 4, "G")
	]);

	gameController.setGame(game);
});