require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
    var game = new Game(80);

    function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
        return new Node(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey, isSlur);
    }
    function createRest(type) {
        return new Node(options.nodes.types.rest[type], options.tones.rest);
    }
    function applyTact(nodes) {
        var tact    = new Tact(options.tacts.types.quarter);

        nodes.forEach(function(node) {
            tact.addNode(node);
        })

        game.addTact(tact);

        return;
    }

    game.setSharp('F');
    game.setSharp('C');

    applyTact([
        createRest("quarter"),
        createRest("quarter"),
        createRest("quarter"),
        createRest("eighth"),
        createNote("eighth", 0, "D")
    ]);

    applyTact([
        createNote("quarterPeriod", 0, "A"),
        createNote("eighth", 0, "A"),
        createNote("quarter", 0, "F"),
        createNote("quarter", 0, "D")
    ]);

    applyTact([
        createNote("half", 0, "B"),
        createRest("quarter"),
        createRest("eighth"),
        createNote("eighth", 0, "D")
    ]);

    applyTact([
        createNote("quarterPeriod", 1, "D"),
        createNote("eighth", 1, "D"),
        createNote("quarter", 1, "C"),
        createNote("quarter", 0, "B")
    ]);

    applyTact([
        createNote("quarter", 0, "B"),
        createNote("quarter", 0, "A"),
        createRest("quarter"),
        createNote("quarter", 0, "A")
    ]);

    applyTact([
        createNote("quarterPeriod", 0, "C"),
        createNote("eighth", 0, "C"),
        createNote("quarter", 0, "D"),
        createNote("quarter", 0, "E")
    ]);

    applyTact([
        createNote("quarter", 0, "F"),
        createNote("quarter", 0, "G#"),
        createNote("quarter", 0, "A"),
        createNote("quarter", 0, "B")
    ]);

    applyTact([
        createNote("half", 0, "A"),
        createNote("half", 0, "G#")
    ]);

    applyTact([
        createNote("half", 0, "A"),
        createRest("quarter"),
        createRest("eighth"),
        createNote("eighth", 0, "A")
    ]);

    applyTact([
        createNote("quarterPeriod", 1, "C"),
        createNote("eighth", 1, "C"),
        createNote("quarter", 0, "B"),
        createNote("quarter", 0, "A")
    ]);

    applyTact([
        createNote("quarterPeriod", 0, "A"),
        createNote("eighth", 1, "D"),
        createNote("quarter", 1, "D"),
        createNote("quarter", 0, "F")
    ]);

    applyTact([
        createNote("quarterPeriod", 0, "B"),
        createNote("eighth", 0, "B"),
        createNote("quarter", 0, "B"),
        createNote("quarter", 0, "B")
    ]);

    applyTact([
        createNote("half", 0, "B"),
        createNote("quarter", 0, "A#"),
        createRest("eighth"),
        createNote("eighth", 0, "A", true)
    ]);

    applyTact([
        createNote("quarter", 0, "A"),
        createNote("quarter", 0, "G#"),
        createNote("quarter", 0, "G", true),
        createNote("quarter", 0, "F")
    ]);

    applyTact([
        createNote("quarter", 0, "B"),
        createNote("quarterPeriod", 1, "D", false, true),
        createNote("eighth", 1, "D"),
        createNote("eighthPeriod", 1, "C"),
        createNote("sixteenth", 0, "B")
    ]);

    applyTact([
        createNote("quarter", 0, "B"),
        createNote("half", 0, "A", false, true),
        createNote("quarter", 0, "C")
    ]);

    applyTact([
        createNote("half", 0, "D"),
        createRest("quarter"),
        createRest("quarter")
    ]);

    gameController.setGame(game);
});