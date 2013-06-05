<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: application/json; charset=utf-8");

$arrNamespaces	= $_GET['namespaces'];
$arrData		= array();
if($_SESSION['UserObject']->id > 0)
{
	if(sizeof($arrNamespaces) > 0)
	{
		foreach($arrNamespaces as $strNamespace)
		{
			$oData	= $oSql->SelectSingleObject('
				SELECT
					storage.data		AS strData,
					storage.updated_on	AS tUpdatedOn
				FROM
					storage
				WHERE
					storage.deleted		= 0
				 &&	storage.user_id		= '.$_SESSION['UserObject']->id.'
				 &&	storage.namespace	= "'.$oSql->RealEscape($strNamespace).'"
			');
			if(!empty($oData))
			{
				$arrData[$strNamespace]	= json_decode($oData->strData);
			}
		}
	}
}
echo json_encode($arrData);
?>
