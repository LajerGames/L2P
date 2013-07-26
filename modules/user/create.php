<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

#Hack 1
if(!isset($oCreateUserForm))
{
    $oCreateUserForm = new Form('create');
    $oCreateUserForm->TextField('username', '', $oLang->Get('create_user_username'), new FormFieldValidation(true, PATTERN_USERNAME, $oLang->Get('validation_username'), false), null, false, array('autocomplete' => 'off'));
    $oCreateUserForm->TextField('email', '', $oLang->Get('create_user_email'), new FormFieldValidation(true, PATTERN_MAIL, $oLang->Get('validation_email'), false), 'email', false, array('autocomplete' => 'off'));
    $oCreateUserForm->TextField('email_repeat', '', $oLang->Get('create_user_repeat_email'), new FormFieldValidation(true, PATTERN_MAIL, $oLang->Get('validation_email'), false), 'email', false, array('autocomplete' => 'off'));
    $oCreateUserForm->TextField('password', '', $oLang->Get('create_user_password'), new FormFieldValidation(true, PATTERN_PASSWORD, $oLang->Get('validation_password')), 'password', false, array('autocomplete' => 'off'));
    $oCreateUserForm->TextField('password_repeat', '', $oLang->Get('create_user_repeat_password'), new FormFieldValidation(true, PATTERN_PASSWORD, $oLang->Get('validation_password')), 'password', false, array('autocomplete' => 'off'));
}

$strBody    = '
	<div class="float--left">
		'.$oCreateUserForm->RenderFields(false).'
	</div>
	<div class="float--right">
		<button name="facebook_button">Facebook</button>
	</div>
	<div class="clear"></div>
';

$strDialog	= $oPageRenderer->RenderDialogAction($oTemplate, $oLang->Get('create_user_headline'), $strBody, '#8D32B7', $oLang->Get('create_user_submit'), 'user_create');


/*$strBody	= 'PREVIEW';

$strDialog	= $oPageRenderer->RenderDialogAction($oTemplate, $oLang->Get('global_closed_preview'), $oLang->Get('global_closed_preview'), '#8D32B7', '');*/

if(IS_DIALOG)
{
	header('Content-type: application/json');
	echo $strDialog;
}
?>