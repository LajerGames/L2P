<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

// Get userid
$iUserID = $oPathUser->iUserID;

// Fetch the typed e-mail adress
$rUserEmail = $oSql->Select('
    SELECT
        email,
        last_login_ip
    FROM
        users
    WHERE
        id = '.$iUserID.'
');

$oUserEmail = $rUserEmail->fetch_object();

if(!isset($oConfirmEmail))
{
    $oConfirmEmail  = new Form('activate', null, false);
    $oConfirmEmail->TextField('user_id', '', '', null, 'hidden');
    $oConfirmEmail->TextField('confirmation', '', $oLang->Get('activate_activationkey'), new FormFieldValidation(true, '[a-åA-Å0-9]{6}', $oLang->Get('activate_validation_activationkey'), true), null, false, array('autocomplete' => 'off'));
}

$strBody    = $oConfirmEmail->RenderFields(false);

// Create the interactive headline with the e-mail adress in it, only if last login ip is equal to the one which user has now
if($oUserEmail->last_login_ip == $_SERVER['REMOTE_ADDR'])
{
    $strHeadline = str_replace('#email#', '('.$oUserEmail->email.')', $oLang->Get('activate_headline'));
}
else
{
    $strHeadline = str_replace('#email#', '', $oLang->Get('activate_headline'));
}

$strDialog  = $oPageRenderer->RenderDialogAction($oTemplate, $strHeadline, $strBody, '#8D32B7', $oLang->Get('activate_submit'));

if(IS_DIALOG)
{
    header('Content-type: application/json');
    echo $strDialog;
}
?>