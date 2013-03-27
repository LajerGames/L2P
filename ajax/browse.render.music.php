<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: application/json; charset=utf-8");

// Require the browse class
require_once(SERVER_PROJECT_ROOT_CLASS_MODULE.'browse.class.inc');

// Initialize data
$strSearch	= $oSql->RealEscape($_POST['searchstring']);
$strType 	= $oSql->RealEscape($_POST['type']);

// Create a new instance of the browse class
$oBrowse = new browse($oSql);

echo $oBrowse->RenderMusic($strType, $strSearch);
?>
