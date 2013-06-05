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

game.setSharp('F');



applyTact([
createRest('quarter'),
createRest('quarter'),
createRest('quarter'),
createNote('eighth', 0, 'G'),
createNote('eighth', 0, 'A',false,true)
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 1, 'D'),
createNote('quarterPeriod', 1, 'D'),
createNote('eighth', 1, 'E')
]);

applyTact([
createNote('quaeter', 1, 'D'),
createNote('quarter', 0, 'B'),
createNote('quarterPeriod', 0, 'G'),
createNote('eighth', 0, 'A')
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'A'),
createNote('quarter', 0, 'A')
]);

applyTact([
createNote('quaeterPeriod', 0, 'A'),
createNote('quarter', 0, 'G')
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 1, 'D'),
createNote('quarterPeriod', 1, 'D'),
createNote('eighth', 1, 'E')
]);

applyTact([
createNote('quaeter', 1, 'D'),
createNote('quarter', 0, 'B'),
createNote('quarterPeriod', 0, 'G'),
createNote('eighth', 0, 'A')
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'A'),
createNote('quarter', 0, 'A')
]);

applyTact([
createNote('halfPeriod', 0, 'G'),
createNote('eighth', 0, 'G'),
createNote('eighth', 0, 'A',false,true)
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 1, 'D'),
createNote('quarterPeriod', 1, 'D'),
createNote('eighth', 1, 'E')
]);

applyTact([
createNote('quaeter', 1, 'D'),
createNote('quarter', 0, 'B'),
createNote('quarterPeriod', 0, 'G'),
createNote('eighth', 0, 'A')
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'A'),
createNote('quarter', 0, 'G')
]);

applyTact([
createNote('halfPeriod', 0, 'A'),
createNote('quarter', 0, 'G')
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 1, 'D'),
createNote('quarterPeriod', 1, 'D'),
createNote('eighth', 1, 'E')
]);

applyTact([
createNote('quaeter', 1, 'D'),
createNote('quarter', 0, 'B'),
createNote('quarterPeriod', 0, 'G'),
createNote('eighth', 0, 'A')
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'A'),
createNote('quarter', 0, 'A')
]);

applyTact([
createNote('quaeter', 0, 'G'),
createNote('quarter', 0, 'G'),
createNote('quarter', 0, 'A',false,true),
createNote('quarter', 0, 'B',false,true)
]);

applyTact([
createNote('half', 1, 'C'),
createNote('half', 1, 'C')
]);

applyTact([
createNote('quaeter', 1, 'E'),
createNote('half', 1, 'E'),
createNote('quarter', 1, 'E')
]);

applyTact([
createNote('quaeter', 1, 'D'),
createNote('quarter', 1, 'D'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'G')
]);

applyTact([
createNote('halfPeriod', 0, 'A'),
createNote('eighth', 0, 'G'),
createNote('eighth', 0, 'A'),
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 1, 'D'),
createNote('quarterPeriod', 1, 'D'),
createNote('eighth', 1, 'E')
]);

applyTact([
createNote('quaeter', 1, 'D'),
createNote('quarter', 0, 'B'),
createNote('quarterPeriod', 0, 'G'),
createNote('eighth', 0, 'A')
]);

applyTact([
createNote('quaeter', 0, 'B'),
createNote('quarter', 0, 'B'),
createNote('quarter', 0, 'A'),
createNote('quarter', 0, 'A')
]);

applyTact([
createNote('halfPeriod', 0, 'G')
]);

gameController.setGame(game);
});

