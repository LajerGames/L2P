<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: application/json; charset=utf-8");

$arrKeys = $_GET['keys'];

$arrLanguage = array();
foreach($arrKeys as $strKey)
{
	$arrLanguage[$strKey] = $oLang->Get($strKey);
}

echo json_encode($arrLanguage);
?>