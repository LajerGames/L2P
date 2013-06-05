<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

// Is this a game or a scale?
//printr($_SERVER);
/*
$rCheckGametype = $oSql->Select('
	SELECT

	FROM

	WHERE

');*/

echo $oPageRenderer->Renderpage($oLang, '
<script src="'.HTTP_PROJECT_ROOT_JAVASCRIPT.'games/tunetester.js"></script>
<div>
	<b>Games</b><br>
	<div id="gamesBox"></div>
</div>
<input type="range" min="20" max="210" value="80" id="speed" /> <div style="display: inline-block;"><span id="speedShow">80</span> bpm</div> <button id="startGame" type="button">Start Game</button> <button id="stopGame" type="button">Stop Game</button> <button id="exportGame" type="button">Export</button><br>
<canvas id="gameContainer" width="1333" height="500" style="display:none;"></canvas>
<svg height="500" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg_container" version="1.1">
	<g id="background"></g>
	<g id="notes"></g>
	<g id="start"></g>
</svg>
');
?>