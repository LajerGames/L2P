<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

#Hack 1
if(!isset($oCreateUserForm))
{
    $oHandleUserForm = new Form('handle');
    $oHandleUserForm->TextField('first_name', $_SESSION['UserObject']->first_name, $oLang->Get('handle_user_first_name'), new FormFieldValidation(false, PATTERN_FIRST_NAME, $oLang->Get('handle_user_validation_first_name'), false), null, false, array('autocomplete' => 'off', 'maxlength' => 20));
    $oHandleUserForm->TextField('last_name', $_SESSION['UserObject']->last_name, $oLang->Get('handle_user_last_name'), new FormFieldValidation(false, PATTERN_LAST_NAME, $oLang->Get('handle_user_validation_last_name'), false), null, false, array('autocomplete' => 'off', 'maxlength' => 30));
}

$strBody	= $oHandleUserForm->RenderFields(false);

$strDialog	= $oPageRenderer->RenderDialogAction($oTemplate, $oLang->Get('handle_user_headline'), $strBody, '#1DBAE7', $oLang->Get('global_button_save'));

if(IS_DIALOG)
{
	header('Content-type: application/json');
	echo $strDialog;
}
?>