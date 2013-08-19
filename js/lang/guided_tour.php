<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

$arrLang	= array(
	'tour_button_got_it'	=> $oLang->Get('tour_button_got_it'),
	'tour_button_end_tour'	=> $oLang->Get('tour_button_end_tour')
);
$arrItems	= array(
	1,
	9,
	6,
	1,
	2,
	1
);
foreach($arrItems as $iItemNo => $iItemCount)
{
	for($iItem = 0; $iItem < $iItemCount; $iItem++)
	{
		$strItemName	= 'tour_'.$iItemNo.'_'.$iItem.'_title';
		$arrLang[$strItemName]	= $oLang->Get($strItemName);

		$strItemName	= 'tour_'.$iItemNo.'_'.$iItem;
		$arrLang[$strItemName]	= $oLang->Get($strItemName);
	}
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($arrLang);
exit;
?>
