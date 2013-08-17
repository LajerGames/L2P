<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: application/json; charset=utf-8");

$oSongGeneration	= new SongGenerator($oSql);
$oSongGeneration->cDifficulty	= $_GET['difficulty'];
$oSongGeneration->cDuration		= $_GET['duration'];
$oSongGeneration->cPulse		= $_GET['pulse'];
$oSongGeneration->cSpeed		= $_GET['speed'];

$oSongData	= $oSongGeneration->GetBasicSongInfo();

echo json_encode(array(
	'duration'	=> $oSongData->fActualDuration,
	'sec'		=> $oSongData->fActualDuration === 1 ? $oLang->Get('time_second') : $oLang->Get('time_seconds')
));
?>
