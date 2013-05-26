<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
require_once(SERVER_PROJECT_ROOT_CLASS.'/game.class.inc');

$strGamePermlink	= $_GET['permlink'];
$iOctave			= intval($_GET['octave']);

if($iOctave === 0)
{
	$iOctave	= null;
}

$oGame		= new Game($oSql, $strGamePermlink);
$oAuthor	= $oGame->getAuthor();
$oGameData	= $oGame->getGameData();

header("Content-Type: application/json; charset=utf-8");
echo json_encode(array(
	'title'			=> $oGame->strGameTitle,
	'author'		=> $oAuthor->strAuthorName,
	'year'			=> $oGame->iGameReleased,
	'difficulty'	=> '',
	'illustration'	=> $oGameData->getIllustration($iOctave)
));
?>
