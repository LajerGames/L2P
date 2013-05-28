<?php
include($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header('Content-Type: application/json; charset=utf-8');

// Generate the UUID
$strUUID	= GenerateStatisticSearchUUID($oSql, $_GET['search']);

// Send back the UUID
echo json_encode(array(
	'uuid'	=> $strUUID
));
?>
