require(['fragments/game', 'game/game', 'game/tact', 'game/note',
'game/options'], function (gameController, Game, Tact, Node, options) {
var game = new Game(66);

function createNote(type, octave, nodeName, isRemoveKey, isSlur) {
return new Node(options.nodes.types[type],
options.tones.names[octave][nodeName], isRemoveKey, isSlur);
}
function createRest(type) {
return new Node(options.nodes.types.rest[type],
options.tones.rest);
}
function applyTact(nodes) {
var tact = new Tact(options.tacts.types.threeForth);

nodes.forEach(function(node) {
tact.addNode(node);
})

game.addTact(tact);

return;
}

game.setSharp('F');

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('quarter', 1, 'D'),
	createNote('quarter', 1, 'D', false, true)
]);

applyTact([
	createNote('quarter', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'B'),
	createNote('quarter', 0, 'G')
]);

applyTact([
	createNote('quarter', 0, 'A'),
	createNote('quarter', 1, 'D'),
	createNote('quarter', 1, 'C', false, true)
]);

applyTact([
	createNote('half', 0, 'B'),
	createNote('quarter', 0, 'A')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'G')
]);

applyTact([
	createNote('quarter', 1, 'E'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'G')
]);

applyTact([
	createNote('quarter', 0, 'F'),
	createNote('eighth', 0, 'E'),
	createNote('eighth', 0, 'D'),
	createNote('quarter', 0, 'F')
]);

applyTact([
	createNote('halfPeriod', 0, 'G')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('quarter', 1, 'D'),
	createNote('quarter', 1, 'D', false, true)
]);

applyTact([
	createNote('quarter', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'B'),
	createNote('quarter', 0, 'G')
]);

applyTact([
	createNote('quarter', 0, 'A'),
	createNote('quarter', 1, 'D'),
	createNote('quarter', 1, 'C', false, true)
]);

applyTact([
	createNote('half', 0, 'B'),
	createNote('quarter', 0, 'A')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'G')
]);

applyTact([
	createNote('quarter', 1, 'E'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'G')
]);

applyTact([
	createNote('quarter', 0, 'F'),
	createNote('eighth', 0, 'E'),
	createNote('eighth', 0, 'D'),
	createNote('quarter', 0, 'F')
]);

applyTact([
	createNote('halfPeriod', 0, 'G')
]);

applyTact([
	createNote('quarter', 0, 'B'),
	createNote('half', 1, 'E')
]);

applyTact([
	createNote('quarter', 1, 'C#'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 1, 'C'),
	createNote('quarter', 0, 'A')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('quarter', 1, 'E'),
	createNote('quarter', 1, 'F')
]);

applyTact([
	createNote('eighth', 1, 'E'),
	createNote('eighth', 1, 'D'),
	createNote('eighth', 1, 'C#'),
	createNote('eighth', 0, 'B'),
	createNote('quarter', 0, 'A')
]);

applyTact([
	createNote('quarter', 1, 'A'),
	createNote('eighth', 1, 'G'),
	createNote('eighth', 1, 'F'),
	createNote('eighth', 1, 'E'),
	createNote('eighth', 1, 'D')
]);

applyTact([
	createNote('quarter', 1, 'B'),
	createNote('eighth', 1, 'G'),
	createNote('eighth', 1, 'F'),
	createNote('eighth', 1, 'E'),
	createNote('eighth', 1, 'D')
]);

applyTact([
	createNote('quarter', 1, 'C#'),
	createNote('quarter', 0, 'A'),
	createNote('quarter', 1, 'C')
]);

applyTact([
	createNote('halfPeriod', 1, 'D')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('eighth', 1, 'C', true),
	createNote('eighth', 0, 'B'),
	createNote('quarter', 0, 'A')
]);

applyTact([
	createNote('quarter', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'B'),
	createNote('quarter', 0, 'G')
]);

applyTact([
	createNote('half', 1, 'C'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B')
]);

applyTact([
	createNote('halfPeriod', 0, 'A')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'G')
]);

applyTact([
	createNote('quarter', 1, 'E'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'G')
]);

applyTact([
	createNote('quarter', 0, 'F'),
	createNote('eighth', 0, 'E'),
	createNote('eighth', 0, 'D'),
	createNote('quarter', 0, 'F')
]);

applyTact([
	createNote('halfPeriod', 0, 'G')
]);

applyTact([
	createNote('quarter', 0, 'B'),
	createNote('half', 1, 'E')
]);

applyTact([
	createNote('quarter', 1, 'C#'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 1, 'C'),
	createNote('quarter', 0, 'A')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('quarter', 1, 'E'),
	createNote('quarter', 1, 'F')
]);

applyTact([
	createNote('eighth', 1, 'E'),
	createNote('eighth', 1, 'D'),
	createNote('eighth', 1, 'C#'),
	createNote('eighth', 0, 'B'),
	createNote('quarter', 0, 'A')
]);

applyTact([
	createNote('quarter', 1, 'A'),
	createNote('eighth', 1, 'G'),
	createNote('eighth', 1, 'F'),
	createNote('eighth', 1, 'E'),
	createNote('eighth', 1, 'D')
]);

applyTact([
	createNote('quarter', 1, 'B'),
	createNote('eighth', 1, 'G'),
	createNote('eighth', 1, 'F'),
	createNote('eighth', 1, 'E'),
	createNote('eighth', 1, 'D')
]);

applyTact([
	createNote('quarter', 1, 'C#'),
	createNote('quarter', 0, 'A'),
	createNote('quarter', 1, 'C')
]);

applyTact([
	createNote('halfPeriod', 1, 'D')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('eighth', 1, 'C', true),
	createNote('eighth', 0, 'B'),
	createNote('quarter', 0, 'A')
]);

applyTact([
	createNote('quarter', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'B'),
	createNote('quarter', 0, 'G')
]);

applyTact([
	createNote('half', 1, 'C'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B')
]);

applyTact([
	createNote('halfPeriod', 0, 'A')
]);

applyTact([
	createNote('quarter', 1, 'D'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'G')
]);

applyTact([
	createNote('quarter', 1, 'E'),
	createNote('eighth', 1, 'C'),
	createNote('eighth', 0, 'B'),
	createNote('eighth', 0, 'A'),
	createNote('eighth', 0, 'G')
]);

applyTact([
	createNote('quarter', 0, 'F'),
	createNote('eighth', 0, 'E'),
	createNote('eighth', 0, 'D'),
	createNote('quarter', 0, 'F')
]);

applyTact([
	createNote('halfPeriod', 0, 'G')
]);

gameController.setGame(game);
});