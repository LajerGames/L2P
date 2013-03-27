<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

// Require the statistics class
require_once(SERVER_PROJECT_ROOT_CLASS_MODULE.'statistics.class.inc');

// Headline will shift according to who we're looking at :)

#Hack 2 - are we looking at our own or another user
$strHeadline = '';
if(is_object($oPathUser) && $oPathUser->iUserID != $_SESSION['UserObject']->id)
{
     $strHeadline = $oLang->Get('statistics_headline_other');

    // Insert username for the user
    $strHeadline = str_replace('#username#', $oPathUser->strUsername, $strHeadline);
}
else
{
    $strHeadline = $oLang->Get('statistics_headline_own');
}

// Create a instance of the new search class for the statistics
$oStatisticsSearch = new AC_RenderStatisticsSearch();
$oStatisticsSearch->iUserID = $oPathUser->iUserID > 0 ? $oPathUser->iUserID : $_SESSION['UserObject']->id;

// Create new instance of the statistics class
$oStatistics = new Statistics($oSql, $oStatisticsSearch, $oLang);

$strDialog    = $oPageRenderer->RenderDialogInfo($oTemplate, $strHeadline, $oStatistics->RenderStatistics(), '#8D32B7', null, 'statistic');

if(IS_DIALOG)
{
    header('Content-type: application/json');
    echo $strDialog;
}
?>