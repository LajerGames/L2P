require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
    var game = new Game(60);

    function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
        return new Node(options.nodes.types[type], options.tones.names[octave][nodeName], isRemoveKey, isSlur);
    }
    function createRest(type) {
        return new Node(options.nodes.types.rest[type], options.tones.rest);
    }
    function applyTact(nodes) {
        var tact    = new Tact(options.tacts.types.twoForth);

        nodes.forEach(function(node) {
            tact.addNode(node);
        })

        game.addTact(tact);

        return;
    }

    applyTact([
        createNote('eighth', 0, 'E'),
        createNote('eighth', 0, 'D'),
        createNote('eighth', 0, 'C'),
        createNote('eighth', 0, 'D')
    ]);

    applyTact([
        createNote('eighth', 0, 'E'),
        createNote('eighth', 0, 'E'),
        createNote('quarter', 0, 'E')
    ]);

    applyTact([
        createNote('eighth', 0, 'D'),
        createNote('eighth', 0, 'D'),
        createNote('quarter', 0, 'D')
    ]);

    applyTact([
        createNote('eighth', 0, 'E'),
        createNote('eighth', 0, 'G'),
        createNote('quarter', 0, 'G')
    ]);

    applyTact([
        createNote('eighth', 0, 'E'),
        createNote('eighth', 0, 'D'),
        createNote('eighth', 0, 'C'),
        createNote('eighth', 0, 'D')
    ]);

    applyTact([
        createNote('eighth', 0, 'E'),
        createNote('eighth', 0, 'E'),
        createNote('eighth', 0, 'E'),
        createNote('eighth', 0, 'E')
    ]);

    applyTact([
        createNote('eighth', 0, 'D'),
        createNote('eighth', 0, 'D'),
        createNote('eighth', 0, 'E'),
        createNote('eighth', 0, 'D')
    ]);

    applyTact([
        createNote('half', 0, 'C')
    ]);

    gameController.setGame(game);
});