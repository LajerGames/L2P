<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

$arrURLInfo		= explode('/', REQUEST_URI);

$strPermlink	= $arrURLInfo[2];
$iOctave		= intval($arrURLInfo[3]);
if($iOctave === 0)
{
	$iOctave	= null;
}

if($strPermlink === 'create')
{
	$strTitle	= 'Create';
	$arrData	= json_decode('[80,[4],[[1,[[4,null,null,0,0],[4,null,null,0,0],[4,null,null,0,0],[4,null,null,0,0]]]],[],[]]');
	$strType	= 'song';
}
else
{
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

	$strTitle	= $oGame->title;
	$arrData	= json_decode($oGame->game);
	$strType	= $oGame->type;
}

$strDialog	= $oPageRenderer->RenderDialogGame($oTemplate, $strTitle, $arrData, $strType, $iOctave);

if(IS_DIALOG)
{
	header('Content-type: application/json');
	echo $strDialog;
}
?>