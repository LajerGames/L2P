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
$oStatisticsSearchObject = new AC_RenderStatisticsSearch();
$oStatisticsSearchObject->iUserID = $oPathUser->iUserID > 0 ? $oPathUser->iUserID : $_SESSION['UserObject']->id;

if(is_object($oStatisticsSearch))
{
	if(strlen($oStatisticsSearch->arrSearch['game_history_ids']) > 0)
	{
		$oStatisticsSearchObject->arrGameHistoryIDs	= explode(',', $oStatisticsSearch->arrSearch['game_history_ids']);
	}
	if(strlen($oStatisticsSearch->arrSearch['game_ids']) > 0)
	{
		$oStatisticsSearchObject->arrGameIDs		= explode(',', $oStatisticsSearch->arrSearch['game_ids']);
	}
	if(strlen($oStatisticsSearch->arrSearch['game_startoctave']) > 0)
	{
		$oStatisticsSearchObject->arrStartOctaves	= explode(',', $oStatisticsSearch->arrSearch['game_startoctave']);
	}
    if(strlen($oStatisticsSearch->arrSearch['game_handposition']) > 0)
    {
        $oStatisticsSearchObject->arrGameHandPositions    = explode(',', $oStatisticsSearch->arrSearch['game_handposition']);
    }
    if(strlen($oStatisticsSearch->arrSearch['game_isblindmode']) > 0)
    {
        $oStatisticsSearchObject->iGameIsBlindMode    = intval($oStatisticsSearch->arrSearch['game_isblindmode']);
    }
}

// Create new instance of the statistics class
$oStatistics = new Statistics($oSql, $oStatisticsSearchObject, $oLang);

$strDialog    = $oPageRenderer->RenderDialogInfo($oTemplate, $strHeadline, $oStatistics->RenderStatistics(), '#1DBAE7', null, 'statistic');

if(IS_DIALOG)
{
    header('Content-type: application/json');
    echo $strDialog;
}
?>