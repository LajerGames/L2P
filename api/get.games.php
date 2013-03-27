<?php
header("Content-Type: application/json; charset=utf-8");
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

require_once(SERVER_PROJECT_ROOT_CLASS.'/game.class.inc');

$oGame      = new Game($oSql);
$arrGames   = $oGame->GetAllGames();

echo json_encode($arrGames);
?>