setGame(function(Game, Tact, Node, options){
    var game = new Game(120);

    function createNode(type, octave, nodeName) {
        return new Node(options.nodes.types[type], options.tones.names[octave][nodeName]);
    }
    function createRest(type) {
        return new Node(options.nodes.types.rest[type], options.tones.rest);
    }
    function applyTact(game, nodes) {
        var tact    = new Tact(options.tacts.types.quarter);

        nodes.forEach(function(node) {
            tact.addNode(node);
        })

        game.addTact(tact);

        return;
    }

    applyTact(game, [
        createNode("wholenote", 5, "C")
    ]);

    applyTact(game, [
        createNode("wholenote", 5, "B")
    ]);

    applyTact(game, [
        createNode("wholenote", 5, "A")
    ]);

    applyTact(game, [
        createNode("wholenote", 4, "G")
    ]);

    applyTact(game, [
        createNode("wholenote", 4, "F")
    ]);

    applyTact(game, [
        createNode("wholenote", 4, "E")
    ]);

    applyTact(game, [
        createNode("wholenote", 4, "D")
    ]);

    applyTact(game, [
        createNode("wholenote", 4, "C")
    ]);

    return game;
});