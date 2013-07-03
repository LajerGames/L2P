<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

#Hack 1
if(!isset($oUserSubscriptionForm))
{
    //form
}

$strBody    = 'SUBSCRIPTION PART';

$strDialog  = $oPageRenderer->RenderDialogAction($oTemplate, $oLang->Get('frontpage_user_subscription'), $strBody, '#8D32B7', $oLang->Get('global_button_save'));

if(IS_DIALOG)
{
    header('Content-type: application/json; charset=utf-8');
    echo $strDialog;
}
?>