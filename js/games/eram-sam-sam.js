require(['fragments/game', 'game/game', 'game/tact', 'game/note',
'game/options'], function (gameController, Game, Tact, Node, options) {
var game = new Game(100);

function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
return new Node(options.nodes.types[type],
options.tones.names[octave][nodeName], isRemoveKey, isSlur);
}
function createRest(type) {
return new Node(options.nodes.types.rest[type],
options.tones.rest);
}
function applyTact(nodes) {
var tact = new Tact(options.tacts.types.quarter);

nodes.forEach(function(node) {
tact.addNode(node);
})

game.addTact(tact);

return;
}

game.setSharp('F');


applyTact([
createNote('quarter', 0, 'D'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E')
]);


applyTact([
createNote('quarter', 0, 'D'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E')
]);

applyTact([
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'A'),
createNote('eighth', 0, 'A'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'A'),
createNote('eighth', 0, 'A')
]);

applyTact([
createNote('eighth', 0, 'E'),
createNote('eighth', 0, 'A'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E')
]);

applyTact([
createNote('quarter', 0, 'D'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E')
]);


applyTact([
createNote('quarter', 0, 'D'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E')
]);

applyTact([
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'A'),
createNote('eighth', 0, 'A'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'A'),
createNote('eighth', 0, 'A')
]);

applyTact([
createNote('eighth', 0, 'E'),
createNote('eighth', 0, 'A'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'E'),
createNote('quarter', 0, 'E')
]);

applyTact([
createNote('quarter', 1, 'D'),
createNote('half', 1, 'D'),
createNote('quarter', 0, 'B')

]);

applyTact([
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C')
]);

applyTact([
createNote('eighth', 0, 'B'),
createNote('eighth', 1, 'C'),
createNote('quarter', 1, 'D'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'B')
]);

applyTact([
createNote('quarter', 1, 'D'),
createNote('half', 1, 'D'),
createNote('quarter', 0, 'B')
]);

applyTact([
createNote('quarter', 1, 'D'),
createNote('half', 1, 'D'),
createNote('quarter', 0, 'B')
]);


applyTact([
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C')
]);

applyTact([
createNote('eighth', 0, 'B'),
createNote('half', 0, 'G'),
createNote('quarter', 0, 'G'),
createNote('quarter', 0, 'G')
]);
gameController.setGame(game);
});