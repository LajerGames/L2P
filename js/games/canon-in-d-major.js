require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
    var game = new Game(92);

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

    game.setSharp('F');
    game.setSharp('C');

    function block1() {
        applyTact("quarter", [
            createNote("half", 5, "D"),
            createNote("half", 5, "C")
        ]);

        applyTact("quarter", [
            createNote("half", 4, "B"),
            createNote("half", 4, "A")
        ]);

        applyTact("quarter", [
            createNote("half", 4, "G"),
            createNote("half", 4, "F")
        ]);

        applyTact("quarter", [
            createNote("half", 4, "G"),
            createNote("half", 4, "F")
        ]);

        applyTact("quarter", [
            createNote("half", 5, "D"),
            createNote("half", 5, "C")
        ]);

        applyTact("quarter", [
            createNote("half", 4, "B"),
            createNote("half", 4, "A")
        ]);

        applyTact("quarter", [
            createNote("half", 4, "G"),
            createNote("half", 4, "F")
        ]);

        applyTact("quarter", [
            createNote("half", 4, "G"),
            createNote("half", 4, "F")
        ]);

        applyTact("quarter", [
            createNote("eighth", 5, "D"),
            createNote("eighth", 5, "C"),
            createNote("quarter", 5, "D"),
            createNote("half", 5, "C")
        ]);

        applyTact("quarter", [
            createNote("quarter", 5, "D"),
            createNote("quarter", 5, "F"),
            createNote("quarterPeriod", 5, "A"),
            createNote("eighth", 5, "B")
        ]);

        applyTact("quarter", [
            createNote("eighth", 5, "G"),
            createNote("eighth", 5, "F"),
            createNote("eighth", 5, "E"),
            createNote("eighth", 5, "G"),
            createNote("eighth", 5, "F"),
            createNote("eighth", 5, "E"),
            createNote("eighth", 5, "D"),
            createNote("eighth", 5, "C")
        ]);

        applyTact("quarter", [
            createNote("eighth", 4, "B"),
            createNote("eighth", 4, "A"),
            createNote("eighth", 4, "B"),
            createNote("eighth", 5, "D"),
            createNote("quarter", 5, "D"),
            createNote("quarter", 5, "C")
        ]);

        applyTact("quarter", [
            createNote("eighth", 5, "D"),
            createNote("eighth", 5, "C"),
            createNote("quarter", 5, "D"),
            createNote("half", 5, "C")
        ]);

        applyTact("quarter", [
            createNote("quarter", 5, "D"),
            createNote("quarter", 5, "F"),
            createNote("quarterPeriod", 5, "A"),
            createNote("eighth", 5, "B")
        ]);

        applyTact("quarter", [
            createNote("eighth", 5, "G"),
            createNote("eighth", 5, "F"),
            createNote("eighth", 5, "E"),
            createNote("eighth", 5, "G"),
            createNote("eighth", 5, "F"),
            createNote("eighth", 5, "E"),
            createNote("eighth", 5, "D"),
            createNote("eighth", 5, "C")
        ]);

        applyTact("quarter", [
            createNote("eighth", 4, "B"),
            createNote("eighth", 4, "A"),
            createNote("eighth", 4, "B"),
            createNote("eighth", 5, "D"),
            createNote("quarter", 5, "D"),
            createNote("quarter", 5, "C")
        ]);

        applyTact("quarter", [
            createNote("eighth", 5, "A"),
            createNote("sixteenth", 5, "F"),
            createNote("sixteenth", 5, "G"),
            createNote("eighth", 5, "A"),
            createNote("sixteenth", 5, "F"),
            createNote("sixteenth", 5, "G"),
            createNote("sixteenth", 5, "A"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 5, "C"),
            createNote("sixteenth", 5, "D"),
            createNote("sixteenth", 5, "E"),
            createNote("sixteenth", 5, "F"),
            createNote("sixteenth", 5, "G"),
        ]);

        applyTact("quarter", [
            createNote("eighth", 5, "F"),
            createNote("sixteenth", 5, "D"),
            createNote("sixteenth", 5, "E"),
            createNote("eighth", 5, "F"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "G"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "G"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "G"),
            createNote("sixteenth", 4, "A"),
        ]);

        applyTact("quarter", [
            createNote("eighth", 4, "G"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 4, "A"),
            createNote("eighth", 4, "G"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "E"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "E"),
            createNote("sixteenth", 4, "D"),
            createNote("sixteenth", 4, "E"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "G"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "B"),
        ]);

        applyTact("quarter", [
            createNote("eighth", 4, "G"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 4, "A"),
            createNote("eighth", 4, "B"),
            createNote("sixteenth", 5, "C"),
            createNote("sixteenth", 5, "E"),
            createNote("sixteenth", 5, "C"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 5, "C"),
            createNote("sixteenth", 5, "D"),
            createNote("sixteenth", 5, "E"),
            createNote("sixteenth", 5, "F"),
        ]);

        applyTact("quarter", [
            createNote("eighth", 5, "A"),
            createNote("sixteenth", 5, "F"),
            createNote("sixteenth", 5, "G"),
            createNote("eighth", 5, "A"),
            createNote("sixteenth", 5, "F"),
            createNote("sixteenth", 5, "G"),
            createNote("sixteenth", 5, "A"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 5, "C"),
            createNote("sixteenth", 5, "D"),
            createNote("sixteenth", 5, "E"),
            createNote("sixteenth", 5, "F"),
            createNote("sixteenth", 5, "G"),
        ]);

        applyTact("quarter", [
            createNote("eighth", 5, "F"),
            createNote("sixteenth", 5, "D"),
            createNote("sixteenth", 5, "E"),
            createNote("eighth", 5, "F"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "G"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "G"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "G"),
            createNote("sixteenth", 4, "A"),
        ]);

        applyTact("quarter", [
            createNote("eighth", 4, "G"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 4, "A"),
            createNote("eighth", 4, "G"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "E"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "E"),
            createNote("sixteenth", 4, "D"),
            createNote("sixteenth", 4, "E"),
            createNote("sixteenth", 4, "F"),
            createNote("sixteenth", 4, "G"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "B"),
        ]);

        applyTact("quarter", [
            createNote("eighth", 4, "G"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 4, "A"),
            createNote("eighth", 4, "B"),
            createNote("sixteenth", 5, "C"),
            createNote("sixteenth", 5, "E"),
            createNote("sixteenth", 5, "C"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 4, "A"),
            createNote("sixteenth", 4, "B"),
            createNote("sixteenth", 5, "C"),
            createNote("sixteenth", 5, "D"),
            createNote("sixteenth", 5, "E"),
            createNote("sixteenth", 5, "F"),
        ]);
    }

    block1();

    gameController.setGame(game);
});