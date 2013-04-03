<?php
// Always have access to config file
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

// READ ABOUT "HACK 1" - I APOLOGIZE FOR THIS!
/**
* Refrence: Hack #1
* We create instances of a new form two places, one in this file if we need the form object in a postsituation
* and one in the respective file if it's not already initiated by postback
*/

// READ ABOUT "HACK 2" - ALSO I APOLOGIZE FOR THIS ONE !
/**
* Refrence: Hack #2
* So, we can deeplink to a user without setting any queystrings, for instance we can link to
* /user/'UserName'/statistics/ and the system will look for the username and load /user/statistics/
* If username is found, a userobject will be set which is called $oPathUser, this object will be set in this file
* thus eneabling access to the data from every file we include
*/

// Postbag
switch($_REQUEST['mode']) // Yep it makes sence to use request here!
{
	case 'login' :
		#Hack 1
		$oLoginForm = new form('login');
		$oLoginForm->TextField('username', '', $oLang->Get('login_username'), new FormFieldValidation(true, PATTERN_USERNAME, $oLang->Get('validation_username')), null, false, array('autocomplete' => 'off'));
		$oLoginForm->TextField('password', '', $oLang->Get('login_password'), new FormFieldValidation(true, PATTERN_PASSWORD, $oLang->Get('validation_password')), 'password', true);

		include(SERVER_PROJECT_ROOT_MODULES.'user/action/login.php');
		break;
	case 'logout' :
		unset($_SESSION['UserObject']);

		Redirect('/');
		break;
	case 'create' :
		#Hack 1
		$oCreateUserForm  = new Form('create');
		$oCreateUserForm->TextField('username', '', $oLang->Get('create_user_username'), new FormFieldValidation(true, PATTERN_USERNAME, $oLang->Get('validation_username'), false), null, false, array('autocomplete' => 'off'));
		$oCreateUserForm->TextField('email', '', $oLang->Get('create_user_email'), new FormFieldValidation(true, PATTERN_MAIL, $oLang->Get('validation_email'), false), 'email', false, array('autocomplete' => 'off'));
		$oCreateUserForm->TextField('email_repeat', '', $oLang->Get('create_user_repeat_email'), new FormFieldValidation(true, PATTERN_MAIL, $oLang->Get('validation_email'), false), 'email', false, array('autocomplete' => 'off'));
		$oCreateUserForm->TextField('password', '', $oLang->Get('create_user_password'), new FormFieldValidation(true, PATTERN_PASSWORD, $oLang->Get('validation_password')), 'password', false, array('autocomplete' => 'off'));
		$oCreateUserForm->TextField('password_repeat', '', $oLang->Get('create_user_repeat_password'), new FormFieldValidation(true, PATTERN_PASSWORD, $oLang->Get('validation_password')), 'password', false, array('autocomplete' => 'off'));

		include(SERVER_PROJECT_ROOT_MODULES.'user/action/create.php');
		break;
	case 'activate' :
		#Hack 1
		$oConfirmEmail  = new Form('activate');
		$oConfirmEmail->TextField('user_id', '', '', null, 'hidden');
		$oConfirmEmail->TextField('confirmation_password', '', $oLang->Get('activate_activationkey'), new FormFieldValidation(true, '[a-Ã¥A-Ã…0-9]{6}', $oLang->Get('activate_validation_activationkey'), true), null, false, array('autocomplete' => 'off'));

		include(SERVER_PROJECT_ROOT_MODULES.'user/action/confirm-email.php');
		break;
	case 'handle' :
		#Hack 1
		$oHandleUserForm = new Form('handle');
		$oHandleUserForm->TextField('first_name', $_SESSION['UserObject']->first_name, $oLang->Get('handle_user_first_name'), new FormFieldValidation(false, PATTERN_FIRST_NAME, $oLang->Get('handle_user_validation_first_name'), false), null, false, array('autocomplete' => 'off', 'maxlength' => 20));
		$oHandleUserForm->TextField('last_name', $_SESSION['UserObject']->last_name, $oLang->Get('handle_user_last_name'), new FormFieldValidation(false, PATTERN_LAST_NAME, $oLang->Get('handle_user_validation_last_name'), false), null, false, array('autocomplete' => 'off', 'maxlength' => 30));

		include(SERVER_PROJECT_ROOT_MODULES.'user/action/handle.php');
		break;
	case 'language' :
		$strLanguage = $_GET['lang'] == 'da-DK' ? 'da-DK' : 'en-US';
		SetLanguageCookie($strLanguage);

		Redirect($_SERVER['HTTP_REFERER']);
		break;
}

if(!IS_DIALOG)
{
	// We cannot have everything point to frontpage, Google surely hate that
    // Find path to load
    $oLoadInfo = FindLoadFile($oSql);

    // Set oPathUser if needed
    if(is_object($oLoadInfo->oPathUser))
    {
        // Hack #2
        $oPathUser = $oLoadInfo->oPathUser;
    }

    // Set oStatisticsSearch if needed
    if(is_object($oLoadInfo->oStatisticsSearch))
    {
        // Hack #2
        $oStatisticsSearch = $oLoadInfo->oStatisticsSearch;
    }

    if(REQUEST_URI == '/' || !empty($oLoadInfo->strLoadfile))
    {
        include(SERVER_PROJECT_ROOT_MODULES.'frontpage/frontpage.php');
    }
}
else
{
    // Find path to load
    $oLoadInfo = FindLoadFile($oSql, true);

    // Set oPathUser if needed
    if(is_object($oLoadInfo->oPathUser))
    {
        // Hack #2
        $oPathUser = $oLoadInfo->oPathUser;
    }

    // Set oStatisticsSearch if needed
    if(is_object($oLoadInfo->oStatisticsSearch))
    {
        // Hack #2
        $oStatisticsSearch = $oLoadInfo->oStatisticsSearch;
    }

    // Include
	include($oLoadInfo->strLoadfile);
}
?>