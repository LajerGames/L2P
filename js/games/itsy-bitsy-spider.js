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
        createNote('quarter', 0, 'C'),
        createNote('eighth', 0, 'C'),
        createNote('quarter', 0, 'C'),
        createNote('eighth', 0, 'D')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'E'),
        createNote('quarter', 0, 'E'),
        createNote('eighth', 0, 'E')
    ]);

    applyTact([
        createNote('quarter', 0, 'D'),
        createNote('eighth', 0, 'C'),
        createNote('quarter', 0, 'D'),
        createNote('eighth', 0, 'E')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'C'),
        createRest('quarter'),
        createRest('eighth')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'E'),
        createNote('quarter', 0, 'E'),
        createNote('eighth', 0, 'F')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'G'),
        createNote('quarterPeriod', 0, 'G')
    ]);

    applyTact([
        createNote('quarter', 0, 'D'),
        createNote('eighth', 0, 'C'),
        createNote('quarter', 0, 'D'),
        createNote('eighth', 0, 'E')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'C'),
        createRest('quarter'),
        createRest('eighth')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'E'),
        createNote('quarter', 0, 'E'),
        createNote('eighth', 0, 'F')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'G'),
        createNote('quarterPeriod', 0, 'G')
    ]);

    applyTact([
        createNote('quarter', 0, 'D'),
        createNote('eighth', 0, 'C'),
        createNote('quarter', 0, 'D'),
        createNote('eighth', 0, 'E')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'C'),
        createNote('quarter', 0, 'G'),
        createNote('eighth', 0, 'G')
    ]);

    applyTact([
        createNote('quarter', 0, 'C'),
        createNote('eighth', 0, 'C'),
        createNote('quarter', 0, 'C'),
        createNote('eighth', 0, 'D')
    ]);

    applyTact([
        createNote('quarterPeriod', 0, 'E'),
        createNote('quarter', 0, 'E'),
        createNote('eighth', 0, 'E')
    ]);

    applyTact([
        createNote('quarter', 0, 'D'),
        createNote('eighth', 0, 'C'),
        createNote('quarter', 0, 'D'),
        createNote('eighth', 0, 'E')
    ]);

    applyTact([
        createNote('halfPeriod', 0, 'C')
    ]);

    gameController.setGame(game);
});