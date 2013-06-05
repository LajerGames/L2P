require(['fragments/game', 'game/game', 'game/tact', 'game/note',
'game/options'], function (gameController, Game, Tact, Node, options) {
var game = new Game(60);

function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
return new Node(options.nodes.types[type],
options.tones.names[octave][nodeName], isRemoveKey, isSlur);
}
function createRest(type) {
return new Node(options.nodes.types.rest[type],
options.tones.rest);
}
function applyTact(nodes) {
var tact = new Tact(options.tacts.types.twoForth);

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
createNote('eighth', 0, 'A'),
createNote('eighth', 0, 'B'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'D')
]);

applyTact([
createNote('eighth', 1, 'E'),
createNote('eighth', 1, 'E'),
createNote('eighth', 1, 'E'),
createNote('eighth', 1, 'E')
]);

applyTact([
createNote('eighth', 1, 'F'),
createNote('eighth', 1, 'D'),
createNote('eighth', 1, 'A'),
createNote('eighth', 1, 'F')
]);

applyTact([
createNote('quarter', 1, 'E'),
createRest('quarter')
]);

applyTact([
createNote('eighth', 1, 'F'),
createNote('eighth', 1, 'D'),
createNote('eighth', 1, 'A'),
createNote('eighth', 1, 'F')
]);

applyTact([
createNote('quarter', 1, 'E'),
createRest('quarter')
]);

applyTact([
createNote('eighth', 1, 'E'),
createNote('eighth', 1, 'D'),
createNote('eighth', 1, 'D'),
createNote('eighth', 1, 'D')
]);

applyTact([
createNote('eighth', 1, 'D'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C')
]);

applyTact([
createNote('eighth', 1, 'C'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B')
]);

applyTact([
createNote('eighth', 0, 'A'),
createNote('eighth', 1, 'C'),
createNote('quarter', 1, 'E'),
]);

applyTact([
createNote('eighth', 1, 'E'),
createNote('eighth', 1, 'D'),
createNote('eighth', 1, 'D'),
createNote('eighth', 1, 'D')
]);

applyTact([
createNote('eighth', 1, 'D'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C'),
createNote('eighth', 1, 'C')
]);

applyTact([
createNote('eighth', 1, 'C'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B'),
createNote('eighth', 0, 'B')
]);

applyTact([
createNote('quarter', 0, 'A'),
createRest('quarter'),
]);
gameController.setGame(game);
});