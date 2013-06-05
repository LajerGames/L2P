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

    applyTact([
        createNote('half', 0, 'D'),
        createNote('half', 0, 'A')
    ]);

    applyTact([
        createNote('half', 0, 'D'),
        createNote('half', 0, 'A')
    ]);

    applyTact([
        createNote('half', 0, 'D'),
        createNote('half', 0, 'A')
    ]);

    applyTact([
        createNote('half', 0, 'D'),
        createNote('half', 0, 'A')
    ]);

    applyTact([
        createNote('half', 0, 'D'),
        createNote('half', 0, 'A')
    ]);

    applyTact([
        createNote('half', 0, 'D'),
        createNote('half', 0, 'A')
    ]);

    applyTact([
        createNote('half', 0, 'D'),
        createNote('half', 0, 'A')
    ]);
    
    applyTact([
        createNote('half', 0, 'D'),
        createNote('half', 0, 'A')
    ]);

    gameController.setGame(game);
});