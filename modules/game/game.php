<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

$arrURLInfo		= explode('/', REQUEST_URI);

$strPermlink	= $arrURLInfo[2];
$iOctave		= intval($arrURLInfo[3]);
if($iOctave === 0)
{
	$iOctave	= null;
}

$oGame	= $oSql->Select('
	SELECT
		games.title,
		games.game,
		games.type
	FROM
		games
	WHERE
		games.deleted	= 0
	 &&	games.permlink	= "'.$strPermlink.'"
')->fetch_object();

$strDialog	= $oPageRenderer->RenderDialogGame($oTemplate, $oGame->title, json_decode($oGame->game), $oGame->type, $iOctave);

if(IS_DIALOG)
{
	header('Content-type: application/json');
	echo $strDialog;
}
?>