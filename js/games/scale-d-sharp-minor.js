require(['fragments/game', 'game/game', 'game/tact', 'game/note', 'game/options'], function (gameController, Game, Tact, Node, options) {
    var game = new Game(150);

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

    game.setSharp('G');
    game.setSharp('F');
    game.setSharp('C');
    game.setSharp('D');
    game.setSharp('A');
    game.setSharp('E');

    // 0
    applyTact([
        createNote('whole', 4, 'D')
    ]);

    applyTact([
        createNote('whole', 4, 'E')
    ]);

    applyTact([
        createNote('whole', 4, 'F')
    ]);

    applyTact([
        createNote('whole', 4, 'G')
    ]);

    applyTact([
        createNote('whole', 4, 'A')
    ]);

    applyTact([
        createNote('whole', 4, 'B')
    ]);

    applyTact([
        createNote('whole', 5, 'C')
    ]);

    applyTact([
        createNote('whole', 5, 'D')
    ]);

    applyTact([
        createNote('whole', 5, 'C')
    ]);

    applyTact([
        createNote('whole', 4, 'B')
    ]);

    applyTact([
        createNote('whole', 4, 'A')
    ]);

   applyTact([
        createNote('whole', 4, 'G')
    ]);

    applyTact([
        createNote('whole', 4, 'F')
    ]);

    applyTact([
        createNote('whole', 4, 'E')
    ]);

    applyTact([
        createNote('whole', 4, 'D')
    ]);

    gameController.setGame(game);
});