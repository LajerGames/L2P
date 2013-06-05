require(['fragments/game', 'game/game', 'game/tact', 'game/note',
'game/options'], function (gameController, Game, Tact, Node, options) {
var game = new Game(80);

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

game.setSharp('C');
game.setSharp('F');
game.setSharp('G');

applyTact([
createNote('quarterPeriod', 0, 'A'),
createNote('eighth', 1, 'C'),
createNote('quarter', 1, 'E'),
createNote('quarter', 1, 'A')
]);

applyTact([
createNote('quarter', 1, 'F'),
createNote('eighth', 1, 'A'),
createNote('eighth', 1, 'F'),
createNote('half', 1, 'E')
]);

applyTact([
createNote('quarterPeriod', 1, 'D'),
createNote('eighth', 1, 'E'),
createNote('quarter', 1, 'C'),
createNote('quarter', 0, 'A')
]);

applyTact([
createNote('half', 0, 'B'),
createNote('half', 0, 'A')
]);

applyTact([
createNote('quarter', 1, 'E'),
createNote('quarter', 1, 'E'),
createNote('quarter', 1, 'D'),
createNote('quarter', 1, 'D')
]);

applyTact([
createNote('quarter', 1, 'C'),
createNote('eighth', 1, 'E'),
createNote('eighth', 1, 'C'),
createNote('half', 0, 'B')
]);

applyTact([
createNote('quarter', 1, 'E'),
createNote('quarter', 1, 'E'),
createNote('quarter', 1, 'D'),
createNote('quarter', 1, 'D')
]);

applyTact([
createNote('quarter', 1, 'C'),
createNote('eighth', 1, 'E'),
createNote('eighth', 1, 'C'),
createNote('half', 0, 'B')
]);

applyTact([
createNote('quarterPeriod', 0, 'A'),
createNote('eighth', 1, 'C'),
createNote('quarter', 1, 'E'),
createNote('quarter', 1, 'A')
]);

applyTact([
createNote('quarter', 1, 'F'),
createNote('eighth', 1, 'A'),
createNote('eighth', 1, 'F'),
createNote('half', 1, 'E')
]);

applyTact([
createNote('quarterPeriod', 1, 'D'),
createNote('eighth', 1, 'E'),
createNote('quarter', 1, 'C'),
createNote('quarter', 0, 'A')
]);

applyTact([
createNote('half', 0, 'B'),
createNote('half', 0, 'A')
]);
gameController.setGame(game);
});