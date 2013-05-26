<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: application/json; charset=utf-8");

$iOctave		= intval($_GET['octave']);
$strNoteName	= $_GET['note_name'];


echo json_encode(array(
	'illustration'	=> $oIllustrations->RenderStartPosition(Illustrations::Instrument_Violin, $iOctave, $strNoteName)
));

?>
