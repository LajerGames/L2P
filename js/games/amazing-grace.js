require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
    var game = new Game(80);

    function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
        return new Node(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey, isSlur);
    }
    function createRest(type) {
        return new Node(options.nodes.types.rest[type], options.tones.rest);
    }
    function applyTact(nodes) {
        var tact    = new Tact(options.tacts.types.threeForth);

        nodes.forEach(function(node) {
            tact.addNode(node);
        })

        game.addTact(tact);

        return;
    }

    applyTact([
        createRest('quarter'),
        createRest('quarter'),
        createNote('quarter', 0, 'D')
    ]);

    applyTact([
        createNote('half', 0, 'G'),
        createNote('eighth', 0, 'B'),
        createNote('eighth', 0, 'G')
    ]);

    applyTact([
        createNote('half', 0, 'B'),
        createNote('quarter', 0, 'A')
    ]);

    applyTact([
        createNote('half', 0, 'G'),
        createNote('quarter', 0, 'E')
    ]);

    applyTact([
        createNote('half', 0, 'D'),
        createNote('quarter', 0, 'D')
    ]);

    applyTact([
        createNote('half', 0, 'G'),
        createNote('eighth', 0, 'B'),
        createNote('eighth', 0, 'G')
    ]);

    applyTact([
        createNote('half', 0, 'B'),
        createNote('quarter', 0, 'A')
    ]);

    applyTact([
        createNote('halfPeriod', 1, 'D')
    ]);

    applyTact([
        createNote('half', 1, 'D', false, true),
        createNote('quarter', 0, 'B')
    ]);

    applyTact([
        createNote('half', 1, 'D'),
        createNote('eighth', 1, 'D'),
        createNote('eighth', 0, 'B')
    ]);

    applyTact([
        createNote('half', 0, 'G'),
        createNote('quarter', 0, 'D')
    ]);

    applyTact([
        createNote('quarter', 0, 'E'),
        createNote('quarter', 0, 'G'),
        createNote('eighth', 0, 'G'),
        createNote('eighth', 0, 'E')
    ]);

    applyTact([
        createNote('half', 0, 'D'),
        createNote('quarter', 0, 'D')
    ]);

    applyTact([
        createNote('half', 0, 'G'),
        createNote('eighth', 0, 'B'),
        createNote('eighth', 0, 'G')
    ]);

    applyTact([
        createNote('half', 0, 'B'),
        createNote('quarter', 0, 'A')
    ]);

    applyTact([
        createNote('halfPeriod', 0, 'G')
    ]);

    applyTact([
        createNote('half', 0, 'G', false, true),
        createRest('quarter')
    ]);

    gameController.setGame(game);
});