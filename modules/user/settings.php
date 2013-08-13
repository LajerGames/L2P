<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

#Hack 1
if(!isset($oUserSettingsForm))
{
	$arrCountdownTime = array(
		1 => '1 '.$oLang->Get('time_second'),
		2 => '2 '.$oLang->Get('time_seconds'),
		3 => '3 '.$oLang->Get('time_seconds'),
		4 => '4 '.$oLang->Get('time_seconds'),
		5 => '5 '.$oLang->Get('time_seconds'),
		6 => '6 '.$oLang->Get('time_seconds'),
		7 => '7 '.$oLang->Get('time_seconds'),
		8 => '8 '.$oLang->Get('time_seconds'),
		9 => '9 '.$oLang->Get('time_seconds'),
		10 => '10 '.$oLang->Get('time_seconds')
	);
	$oUserSettingsForm = new Form('settings');
	$oUserSettingsForm->TextField('concert_pitch', $_SESSION['UserObject']->concert_pitch, $oLang->Get('user_settings_concert_pitch'), new FormFieldValidation(true, PATTERN_INT, $oLang->Get('user_settings_validation_concert_pitch'), false), null, false, array('maxlength' => 3));
	$oUserSettingsForm->Box(false, 'color_nodes', $_SESSION['UserObject']->colored_notes, $oLang->Get('user_settings_color_notes'));
	$oUserSettingsForm->SelectBox('language', $_COOKIE['country_code'], array('da-DK' => 'Dansk', 'en-US' => 'English'), $oLang->Get('create_user_language'));
	$oUserSettingsForm->Box(false, 'kiddie_mode', $_SESSION['UserObject']->kiddie_mode, $oLang->Get('user_settings_kiddie_mode'));
	$oUserSettingsForm->SelectBox('countdown_time', $_SESSION['UserObject']->countdown_time, $arrCountdownTime, $oLang->Get('user_settings_countdown_time'));
	$oUserSettingsForm->Box(false, 'metronome', $_SESSION['UserObject']->metronome, $oLang->Get('user_settings_metronome'));
	$oUserSettingsForm->Box(false, 'blind_mode', $_SESSION['UserObject']->blind_mode, $oLang->Get('user_settings_blind_mode'));
}

$strBody    = $oUserSettingsForm->RenderFields(false, null, null, true);

$strDialog  = $oPageRenderer->RenderDialogAction($oTemplate, $oLang->Get('frontpage_user_settings'), $strBody, '#8D32B7', $oLang->Get('global_button_save'));

if(IS_DIALOG)
{
	header('Content-type: application/json; charset=utf-8');
	echo $strDialog;
}
?>