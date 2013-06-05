<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

#Hack 1
if(!isset($oUserSettingsForm))
{
    $oUserSettingsForm = new Form('settings');
    $oUserSettingsForm->TextField('concert_pitch', $_SESSION['UserObject']->concert_pitch, $oLang->Get('user_settings_concert_pitch'), new FormFieldValidation(true, PATTERN_INT, $oLang->Get('user_settings_validation_concert_pitch'), false), null, false, array('maxlength' => 3));
    $oUserSettingsForm->Box(false, 'color_nodes', $_SESSION['UserObject']->colored_notes, $oLang->Get('user_settings_color_notes'));
    $oUserSettingsForm->SelectBox('language', $_COOKIE['country_code'], array('da-DK' => 'Dansk', 'en-US' => 'English'), $oLang->Get('create_user_language'));
}

$strBody    = $oUserSettingsForm->RenderFields(false, null, null, true);

$strDialog  = $oPageRenderer->RenderDialogAction($oTemplate, $oLang->Get('frontpage_user_settings'), $strBody, '#8D32B7', $oLang->Get('global_button_save'));

if(IS_DIALOG)
{
    header('Content-type: application/json; charset=utf-8');
    echo $strDialog;
}
?>