<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: application/json; charset=utf-8");

$strNamespace	= $_POST['namespace'];
$arrData		= $_POST['data'];
if($_SESSION['UserObject']->id > 0)
{
	$iStorageID	= $oSql->SelectSingleValue('
		SELECT
			storage.id			AS iStorageID
		FROM
			storage
		WHERE
			storage.deleted		= 0
		 &&	storage.user_id		= '.$_SESSION['UserObject']->id.'
		 &&	storage.namespace	= "'.$oSql->RealEscape($strNamespace).'"
	');
	if($iStorageID > 0)
	{
		$oSql->Update('storage', array(
			'data'	=> json_encode($arrData)
		), $iStorageID);
	}
	else
	{
		$oSql->Insert('storage', array(
			'user_id'	=> $_SESSION['UserObject']->id,
			'namespace'	=> $strNamespace,
			'data'		=> json_encode($arrData)
		));
	}
}
?>
