setGame(function(Game, Tact, Node, options){
	var game = new Game(80);
	game.speed	= 200;

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
		applyTact('sixForth', [
			createNote("eighth", 4, "C"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 3, "A"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 3, "Bb"),
			createNote("eighth", 4, "Bb")
		]);
		applyTact('sixForth', [
			createNote("eighth", 4, "C"),
			createNote("eighth", 5, "C"),
			createNote("eighth", 3, "A"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 3, "Bb"),
			createNote("eighth", 4, "Bb")
		]);
		applyTact('sixForth', [
			createNote("eighth", 3, "G"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 3, "Eb"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 3, "F"),
			createNote("eighth", 4, "Eb")
		]);

		applyTact('sixForth', [
			createNote("eighth", 3, "G"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 3, "Eb"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 3, "F"),
			createNote("eighth", 4, "Eb"),
			createRest("quarter"),
			createRest("quarter"),
			createNote("eighth", 4, "Eb"),
			createNote("eighth", 4, "D"),
			createNote("eighth", 4, "Db")
		]);
		applyTact('sixForth', [
			createNote("eighth", 4, "C"),
			createRest("eighth"),
			createNote("eighth", 4, "Eb"),
			createRest("eighth"),
			createNote("eighth", 4, "D"),
			createRest("eighth"),
			createNote("eighth", 3, "Bb"),
			createRest("eighth"),
			createNote("eighth", 3, "A"),
			createRest("eighth"),
			createNote("eighth", 4, "Db")
		]);

		applyTact('sixForth', [
			createNote("eighth", 4, "C"),
			createNote("eighth", 4, "Gb"),
			createNote("eighth", 4, "F"),
			createNote("eighth", 4, "E"),
			createNote("eighth", 4, "Bb"),
			createNote("eighth", 4, "A"),
			createNote("eighth", 4, "Ab"),
			createRest("eighth"),
			createNote("eighth", 4, "Eb"),
			createRest("eighth"),
			createNote("eighth", 4, "C"),
			createRest("eighth")
		]);
		applyTact('sixForth', [
			createNote("eighth", 3, "Bb"),
			createRest("eighth"),
			createNote("eighth", 3, "A"),
			createRest("eighth"),
			createNote("eighth", 3, "Ab")
		]);
	}

	block1();
	block1();

	return game;
});