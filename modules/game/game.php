<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

$strPermlink	= substr(REQUEST_URI, 6, (strrpos(REQUEST_URI, '/', 6) !== false ? strrpos(REQUEST_URI, '/', 6) : 6) - 6);

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

$strDialog	= $oPageRenderer->RenderDialogGame($oTemplate, $oGame->title, json_decode($oGame->game), $oGame->type);

if(IS_DIALOG)
{
	header('Content-type: application/json');
	echo $strDialog;
}
?>