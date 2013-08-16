<?php
function printr($arr)
{
	echo '<pre>';
	print_r($arr);
	echo '</pre>';

	return;
}
/**
* Redirects to another location
*
* @param string $strLocation
* @param bool $bForceReload
*/
function Redirect($strLocation, $bForceReload = false)
{
	if(IS_DIALOG)
	{
		global	$oPageRenderer,
				$oTemplate;

		header('Content-type: application/json');
		echo $oPageRenderer->RenderDialogRedirect($oTemplate, $strLocation, $bForceReload);
	}
	else
	{
		header('Location: '.$strLocation);
	}
	exit;

	return;
}
/**
* Strip tags and slashed from a string
*
* @param string $strString
* @return string
*/
function NoTags($strString)
{
	return strip_tags(stripslashes($strString));
}
/**
* Generates a Universally Unique IDentifier (UUID). According to the RFC 4122 section 4.1.2
*
* @param bool $bRemoveDashes
* @return string
*/
function UUID($bRemoveDashes = true)
{
	$strUUID = sprintf('%04x%04x-%04x-%03x4-%04x-%04x%04x%04x',
	   mt_rand(0, 65535), mt_rand(0, 65535), // 32 bits for "time_low"
	   mt_rand(0, 65535), // 16 bits for "time_mid"
	   mt_rand(0, 4095),  // 12 bits before the 0100 of (version) 4 for "time_hi_and_version"
	   bindec(substr_replace(sprintf('%016b', mt_rand(0, 65535)), '01', 6, 2)),
	   // 8 bits, the last two of which (positions 6 and 7) are 01, for "clk_seq_hi_res"
	   // (hence, the 2nd hex digit after the 3rd hyphen can only be 1, 5, 9 or d)
	   // 8 bits for "clk_seq_low"
	   mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535) // 48 bits for "node"
	);

	if($bRemoveDashes)
	{
		$strUUID = str_replace("-", "", $strUUID);
	}

	return $strUUID;
}
function GenerateStatisticSearchUUID(MySQLWrapper $oSql, $arrSearch)
{
	$strSearch	= json_encode($arrSearch);
	$strUUID	= '';

	// We need to make sure, that we only use the generated UUID once pr user - therefore we make a check here and loop untill we have found a uniqe UUID
	while(empty($strUUID))
	{
		$strUUID	= substr(UUID(true), 0, 6);

		$rCheck		= $oSql->Select('
			SELECT
				users_statistics_search.id
			FROM
				users_statistics_search
			WHERE
				users_statistics_search.uuid	= "'.$strUUID.'"
		');

		// If we found any rows with this UUID for this user, we empty the UUID and try again
		if($rCheck->num_rows > 0)
		{
			$strUUID	= '';
		}
	}

	// Insert the UUID
	$oSql->Insert('users_statistics_search', array(
		'uuid'		=> $strUUID,
		'search'	=> $strSearch
	));

	return $strUUID;
}
function GetCountryCode()
{
	$strCountryCode	= '';

	if(!empty($_GET['lang']))
	{
		$strCountryCode	= $_GET['lang'];
	}

	if($strCountryCode === '' && isset($_COOKIE['country_code']))
	{
		$strCountryCode	= $_COOKIE['country_code'];
	}

	if($strCountryCode === '')
	{
		$arrCountryCodes	= array(
			'DK'	=> 'da-DK',
			'SE'	=> 'sv-SE',
			'US'	=> 'en-US',
			'IE'	=> 'en-IE',
			'GB'	=> 'en-GB'
		);

		// Get available languages from $_SERVER
        $arrAcceptedLanguages = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
        $bDanishHack = false;
        foreach($arrAcceptedLanguages as $strLang)
        {
            if($strLang == 'da-DK')
            {
                $bDanishHack = true;
            }
        }
        $strCountryCode = $bDanishHack ? 'da-DK' : 'en-US';
	}

	$strCountryCode	= $strCountryCode === '' ? DEFAULT_LANGUAGE : $strCountryCode;

	SetLanguageCookie($strCountryCode);

	return $strCountryCode;
}
function SetLanguageCookie($strCountryCode)
{
	setcookie('country_code', $strCountryCode, time() + 60*60*24*30, '/', $_SERVER['HTTP_HOST']);

	return;
}
/**
* Will render the properties
*
* @param array $arrProperties
* @return string
*/
function RenderProperties($arrProperties)
{
	$strProperties = '';
	foreach($arrProperties as $strProperty => $strValue)
	{
		$strProperties .= ' '.$strProperty.'="'.htmlentities($strValue).'"';
	}

	return $strProperties;
}
function GetMusic($oSql, $strType = 'song', $iLimit = 0, $strSearch = '')
{
	$strType = $strType == 'song' ? 'song' : 'scale';

	$strLimit = $iLimit > 0 ? ' LIMIT '.$iLimit : '';

	$strWhereCondition = '';
	if(!empty($strSearch))
	{
		$strWhereCondition = '
		 &&	games.title LIKE "%'.$strSearch.'%"
		';
	}

    $strLang = $_COOKIE['country_code'] == 'da-DK'? 'da-DK' : 'en-US';

	return $rMusic = $oSql->Select('
        SELECT
            games.id,
            languages.name  AS title,
            games.permlink,
            games.availability,
            games.octave,
            games.start_tone
        FROM
            games
        RIGHT JOIN
            languages ON
                languages.deleted   = 0
             && languages.type      = "game_title"
             && languages.parent_id = games.id
             && languages.lang      = "'.$strLang.'"
        WHERE
            games.deleted           = 0
         && games.type              = "'.$strType.'"
         && games.status            = "ready"
         '.$strWhereCondition.'
        GROUP BY
            languages.name
        ORDER BY
            games.availability ASC,
            games.title ASC
        '.$strLimit.'
    ');
}
/**
* Returns a object, contains strLoadFile nomatter what, and may return oPathUser aswell
*
* @param object $oSql
* @param bool $bReturn404
* @return AC_LoadFileInfo
*/
function FindLoadFile(MySQLWrapper $oSql, $bReturn404 = false)
{
    $oLoadInfo = new AC_LoadFileInfo();
    if(is_file(SERVER_PROJECT_ROOT.REQUEST_URI))
    {
        $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT.REQUEST_URI;
    }
    // Next check is for deep link
    elseif(is_file(SERVER_PROJECT_ROOT_MODULES.substr(REQUEST_URI, 0, -1).'.php'))
    {
        $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT_MODULES.substr(REQUEST_URI, 0, -1).'.php';
    }
    elseif(is_file(SERVER_PROJECT_ROOT_MODULES.REQUEST_URI.'/index.php'))
    {
        $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT_MODULES.REQUEST_URI.'/index.php';
    }
    elseif(substr(REQUEST_URI, 0, 6) === '/game/' && substr(REQUEST_URI, -6) !== '/save/')
    {
        $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT_MODULES.'game/game.php';
    }
    elseif(substr(REQUEST_URI, 0, 8) === '/browse/')
    {
    	$arrURI	= explode('/', REQUEST_URI);
        $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT_MODULES.'browse/'.$arrURI['2'].'.php';
    }
    else
    {
        // If we wind up in here, there is a chance we're looking at a username in the permlink... Find out which part of the url we know, and see if we can identify the a username afterwards
        // Explode the URI
        $arrURI = explode('/', REQUEST_URI, 4);

        // Initialize readable variables
        $strFolder          = urldecode($arrURI[1]);
        $strUsername        = urldecode($arrURI[2]);
        $strRemainingPath   = urldecode($arrURI[3]);

        // Set two booleans, a path and a recognized username - both is false as default. If both is true once we're done checking we've got ourselves a custom permlink
        $bRecognizedPath    = false;
        $bRecognizedUser    = false;

        // Do we know this path
        switch($strFolder)
        {
            case 'game':
            case 'user':
                $bRecognizedPath = true;
                break;
        }

        if($strFolder === 'user')
        {
	        // Do we recognize the user?
	        $oPathUser = $oSql->SelectSingleObject('
	            SELECT
	                users.id        AS iUserID,
	                users.username  AS strUsername
	            FROM
	                users
	            WHERE
	                users.username = "'.$oSql->RealEscape($strUsername).'"
	        ');

	        // Did we find a user?
	        if($oPathUser->iUserID > 0)
	        {
	            $bRecognizedUser = true;
	        }

	        // Did our last desperate attempt of finding a page to load pay off?
	        $bPageLoaded = false;
	        if($bRecognizedPath && $bRecognizedUser)
	        {
	            $oLoadInfo->oPathUser = $oPathUser;
	            // Now check if we recognize the destination without the username
	            if(is_file(SERVER_PROJECT_ROOT_MODULES.$strFolder.'/'.substr($strRemainingPath, 0, -1).'.php'))
	            {
	                # Hack 2 (oPathUser is already set)
	                $bPageLoaded = true;

	                $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT_MODULES.$strFolder.'/'.substr($strRemainingPath, 0, -1).'.php';
	            }
	            elseif(is_file(SERVER_PROJECT_ROOT_MODULES.$strFolder.$strRemainingPath.'/index.php'))
	            {
	                # Hack 2 (oPathUser is already set)
	                $bPageLoaded = true;

	                $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT_MODULES.$strFolder.$strRemainingPath.'/index.php';
	            }
	            elseif(substr($strRemainingPath, 0, 11) === 'statistics/')
	            {
            		// We might have an UUID for a search here
					$arrRemainingURI	= explode('/', $strRemainingPath);

					// Test weither this looks like an UUID
					if(!empty($arrRemainingURI[1]) && strlen($arrRemainingURI[1]) === 6)
					{
						$strUUID	= $arrRemainingURI[1];

						$oStatisticsSearch	= $oSql->SelectSingleObject('
							SELECT
								users_statistics_search.id		AS iUserStatisticsSearchID,
								users_statistics_search.search	AS arrSearchFromJSON
							FROM
								users_statistics_search
							WHERE
								users_statistics_search.uuid	= "'.$strUUID.'"
						');
						if(!empty($oStatisticsSearch))
						{
							$bPageLoaded = true;

							$oLoadInfo->oStatisticsSearch	= $oStatisticsSearch;
							$oLoadInfo->strLoadfile 		= SERVER_PROJECT_ROOT_MODULES.$strFolder.'/statistics.php';

							$oSql->Touch('users_statistics_search', $oStatisticsSearch->iUserStatisticsSearchID);
						}
					}
	            }
	        }
		}
		elseif($strFolder === 'game')
		{
			if($strUsername === 'create')
			{
				$oPathGame	= new stdClass();
				$oPathGame->iGameID	= 0;
			}
			else
			{
				$oPathGame	= $oSql->SelectSingleObject('
					SELECT
						game.id		AS iGameID
					FROM
						games
					WHERE
						games.deleted	= 0
					 &&	games.permlink	= "'.$oSql->RealEscape($strUsername).'"
				');
			}
			$bPageLoaded = false;
			if(!empty($oPathGame))
			{
	            $oLoadInfo->oPathGame = $oPathGame;

	            // Now check if we recognize the destination without the username
	            if(is_file(SERVER_PROJECT_ROOT_MODULES.$strFolder.'/'.substr($strRemainingPath, 0, -1).'.php'))
	            {
	                # Hack 2 (oPathUser is already set)
	                $bPageLoaded = true;

	                $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT_MODULES.$strFolder.'/'.substr($strRemainingPath, 0, -1).'.php';
	            }
			}
		}

        if(!$bPageLoaded)
        {
            if($bReturn404)
            {
                // Is this a folder with a indexfile
                $oLoadInfo->strLoadfile = '/404.php';
            }
            else
            {
                // Just return nothing in the loadfile
                $oLoadInfo->strLoadfile = null;
            }
        }
    }

    return $oLoadInfo;
}
/**
* Returns a nice datestring in the correct language
*
* @param string $strDate
* @param object $oLang
*/
function RenderDate($strDate, $oLang)
{
    // Decide what to write, we'll always write the date in human words, unless it's more than two days ago
    $iUnixTimeToday     = strtotime(date('Y-m-d H:i:s'));
    $iUnixTimeDate      = strtotime($strDate);

    // What is the timedifference in seconds
    $iTimeDifferenceSeconds = $iUnixTimeToday - $iUnixTimeDate;
    $iTimeDifferenceMinutes = floor($iTimeDifferenceSeconds / 60);
    $iTimeDifferenceHours   = floor($iTimeDifferenceSeconds / 60 / 60);
    $iTimeDifferenceDays    = floor($iTimeDifferenceSeconds / 60 / 60 / 24);

    $bIsEnglish = $_COOKIE['country_code'] != 'da-DK';

    // Now decide what to put out
    $strRtrn = '';

    // Are we in the same day as today?
    if(date('Y-m-d') === date('Y-m-d', $iUnixTimeDate))
    {
        if($iTimeDifferenceSeconds < 60)
        {
            // Less than a minute
            $strRtrn = $oLang->Get('time_less_than_minute');
        }
        elseif($iTimeDifferenceSeconds < 180)
        {
            // A few minutes ago
            $strRtrn = $oLang->Get('time_few_minutes');
        }
        elseif($iTimeDifferenceSeconds < 3500)
        {
            // A specific amount of minutes
            $strRtrn = $iTimeDifferenceMinutes.' '.$oLang->Get('time_minutes').' '.$oLang->Get('time_ago');
        }
        elseif($iTimeDifferenceSeconds < 7140)
        {
            // About an hour
            $strRtrn = $oLang->Get('time_about_an_hour');
        }
        else
        {
            // XX hours ago
            $strRtrn = $iTimeDifferenceHours.' '.$oLang->Get('time_hours').' '.$oLang->Get('time_ago');
        }
    }
    else
    {
        // English time?
        $strTime = $bIsEnglish ? 'at '.date('h:i a', $iUnixTimeDate) : 'klokken '.date('H:i', $iUnixTimeDate);
        if(date('Y-m-d', strtotime('-1 day')) == date('Y-m-d', $iUnixTimeDate))
        {
            // Yesterday a XX o clock
            $strRtrn = $oLang->Get('time_yesterday').' '.$strTime;
        }
        elseif($iTimeDifferenceDays < 7)
        {
            $strRtrn = $oLang->Get('global_last').' '.RenderWeekdayName($strDate, $oLang).' '.$strTime;
        }
        elseif($iTimeDifferenceDays < 365)
        {
            // Date and time
            if($bIsEnglish)
            {
                $strRtrn = date('jS', $iUnixTimeDate).' of '.RenderMonthName($strDate, $oLang).' '.$strTime;
            }
            else
            {
                $strRtrn = 'D. '.date('j', $iUnixTimeDate).'. '.RenderMonthName($strDate, $oLang).' '.$strTime;
            }
        }
        else
        {
            // More than a year ago
            $strRtrn = $oLang->Get('time_more_than_a_year');
        }
    }

    return $strRtrn;
}
/**
* Returns a weekdayname in the correct language
*
* @param string $strDate
* @param object $oLang
*/
function RenderWeekdayName($strDate, $oLang)
{
    $iWeekday = date('N', strtotime($strDate));

    $strRtrn = '';
    switch($iWeekday)
    {
        case 1 :
            $strRtrn = $oLang->Get('time_monday');
            break;
        case 2 :
            $strRtrn = $oLang->Get('time_tuesday');
            break;
        case 3 :
            $strRtrn = $oLang->Get('time_wednesday');
            break;
        case 4 :
            $strRtrn = $oLang->Get('time_thursday');
            break;
        case 5 :
            $strRtrn = $oLang->Get('time_friday');
            break;
        case 6 :
            $strRtrn = $oLang->Get('time_saturday');
            break;
        case 7 :
            $strRtrn = $oLang->Get('time_sunday');
            break;
    }

    return $strRtrn;
}
/**
* Returns a monthname in the correct language
*
* @param string $strDate
* @param object $oLang
*/
function RenderMonthName($strDate, $oLang)
{
    $iMonth = date('n', strtotime($strDate));

    $strRtrn = '';
    switch($iMonth)
    {
        case 1 :
            $strRtrn = $oLang->Get('time_january');
            break;
        case 2 :
            $strRtrn = $oLang->Get('time_febuary');
            break;
        case 3 :
            $strRtrn = $oLang->Get('time_march');
            break;
        case 4 :
            $strRtrn = $oLang->Get('time_april');
            break;
        case 5 :
            $strRtrn = $oLang->Get('time_may');
            break;
        case 6 :
            $strRtrn = $oLang->Get('time_june');
            break;
        case 7 :
            $strRtrn = $oLang->Get('time_july');
            break;
        case 8 :
            $strRtrn = $oLang->Get('time_august');
            break;
        case 9 :
            $strRtrn = $oLang->Get('time_september');
            break;
        case 10 :
            $strRtrn = $oLang->Get('time_october');
            break;
        case 11 :
            $strRtrn = $oLang->Get('time_november');
            break;
        case 12 :
            $strRtrn = $oLang->Get('time_december');
            break;
    }

    return $strRtrn;
}
/**
* Returns game duration in xx min xx seconds in correct language also
*
* @param mixed $fGameTime
* @param object $oLang
*/
function RenderGameDuration($fGameTime, $oLang)
{
    $iGameTimeSeconds   = round($fGameTime);

    $iGameTimeMinutes   = floor($iGameTimeSeconds / 60);
    $iRemainingSeconds  = $iGameTimeSeconds % 60;

    $strGameTime = '';
    if($iGameTimeMinutes > 0)
    {
        $strMinutesPlural = $iGameTimeMinutes > 1 ? $oLang->Get('time_minutes') : $oLang->Get('time_minute');

        $strGameTime .= $iGameTimeMinutes.' '.$strMinutesPlural.' ';
    }

    if($iRemainingSeconds > 0)
    {
        $strSecondsPlural = $iRemainingSeconds > 1 ? $oLang->Get('time_seconds') : $oLang->Get('time_second');

        $strGameTime .= $iRemainingSeconds.' '.$strSecondsPlural;
    }

    return $strGameTime;
}
/**
* Returns a correct numberformat that matches the language you're currently using
*
* @param float $fValue
* @param int $iDecimals
*/
function LangNumberFormat($fValue, $iDecimals)
{
    $strCountryCode         = GetCountryCode();
    $strThousindSeperator   = $strCountryCode === 'da-DK' ? '.' : ',';
    $strDecimalSeperator    = $strCountryCode === 'da-DK' ? ',' : '.';

    return number_format($fValue, $iDecimals, $strDecimalSeperator, $strThousindSeperator);
}
function reportError($strErrorDescription, $strUniqueErrorID = "", $strFilename = null, $iLineNum = null)
{
	$iBacktraceLvl = 1;

	$arrBacktrace 	= debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);

	if (!isset ($strFilename) || !isset ($iLineNum))
	{
		foreach ($arrBacktrace as $trace)
		{
			if ($trace['file'] !== __FILE__ && $trace['file'] !== $_SERVER['DOCUMENT_ROOT'].'/class/class.mysql.inc.php')
			{
				$strFilename = $trace['file'];
				$iLineNum = $trace['line'];
				break;
			}
		}
	}
	// Send postback
	$strPostback = '
	<table border="1" cellspacing="0" cellpadding="5">
	';
	$iPostAmt = 0;
	foreach($_POST as $strName => $strValue)
	{
		if(is_array($strValue))
		{
			$strValue = '
			<pre>
			'.print_r($strValue, true).'
			</pre>
			';
		}
		$strPostback .= '
		<tr>
			<td>'.$strName.'</td>
			<td>'.$strValue.'</td>
		</tr>
		';
		$iPostAmt++;
	}

	if($iPostAmt == 0)
	{
		$strPostback .= '
		<tr>
			<td>Postback was empty!</td>
		</tr>
		';
	}
	$strPostback .= '</table>';


	// Send debug_backtrace
	$strBacktrace = '
	<table border="1" cellspacing="0" cellpadding="5">
	';
	$arrBacktrace = debug_backtrace (DEBUG_BACKTRACE_IGNORE_ARGS);
	foreach($arrBacktrace as $strName => $strValue)
	{
		$strBacktrace .= '
		<tr>
			<td>'.$strName.'</td>
			<td><pre>'.print_r($strValue, true).'</pre></td>
		</tr>
		';
	}
	$strBacktrace .= '</table>';


	// Send _SERVER
	$strServer = '
	<table border="1" cellspacing="0" cellpadding="5">
	';
	foreach($_SERVER as $strName => $strValue)
	{
		$strServer .= '
		<tr>
			<td>'.$strName.'</td>
			<td>'.$strValue.'</td>
		</tr>
		';
	}
	$strServer .= '</table>';

	// Send SESSION
	$strLongSession = '
	<table border="1" cellspacing="0" cellpadding="5">
	';
	$i = 0;
	foreach($_SESSION as $strName => $strValue)
	{
		if(is_array($strValue))
		{
			$strValue = '
			<pre>
			'.print_r($strValue, true).'
			</pre>
			';
		}
		$strLongSession .= '
		<tr>
			<td>'.$strName.'</td>
			<td>'.$strValue.'</td>
		</tr>
		';

	}
	$strLongSession .= '</table>';

	$message	= "
	<div style='border:#000 1px solid;padding:10px;'>{$strErrorDescription}</div><br><br>
	Postback:<br>
	".$strPostback."<br><br>
	Debug Backtrace:<br>
	".$strBacktrace."<br><br>
	Server:<br>
	".$strServer."<br><br>
	Session:<br>
	".$strLongSession."<br><br><br>
	- HAVE FUN!!!
	";

	if(SYSTEM_DEV)
	{
		echo $message;
	}

	return;
}
function handlePHPError($errno, $errstr, $errfile, $errline)
{
	switch ($errno)
	{
		case E_USER_ERROR:
		case E_COMPILE_ERROR:
		case E_ERROR:
			reportError($errstr, 'Uncaught PHP Error', $errfile, $errline);
			//exit;
			break;

		case E_USER_WARNING:
		case E_COMPILE_WARNING:
		case E_WARNING:
			//reportError($errstr, 'Uncaught PHP warning', $errfile, $errline);
			break;

		case E_USER_NOTICE:
		//case E_COMPILE_NOTICE: REMOVED DUE TO NOTICE
		case E_NOTICE:
			//portError($errstr, 'Uncaught PHP notice', $errfile, $errline);
			break;

		default:
			//reportError($errstr, 'Uncaught unknown PHP error', $errfile, $errline);
			break;
	}

	return true;
}
function handleShutdown ()
{
	$arrLastError = error_get_last();
	handlePHPError($arrLastError['type'], $arrLastError['message'], $arrLastError['file'], $arrLastError['line']);
}
function CalculateSubscriptionTimeleft($dSubscriptionEnd)
{
    $iDateTodayUnix         = strtotime(date('Y-m-d'));
    $iSubscriptionEndUnix   = strtotime(date('Y-m-d', strtotime($dSubscriptionEnd)));

    $iTimeLeft              = $iSubscriptionEndUnix - $iDateTodayUnix;

    $iDaysLeft              = ($iTimeLeft / 60 / 60 / 24) - 1; // Today is not included!

    return;
}
/**
* If you give it the int 10, you have a 10% chance if getting a true bool in return :) simple !
*
* @param int $iChanceOfTrue
*/
function GetPercentualChange($iChanceOfTrue)
{
    $iGeneratedNumber = rand(1, 100);

    return $iGeneratedNumber <= $iChanceOfTrue;
}
function GetNoteNamesArray()
{
    return array(
        'C' => 'C',
        'D' => 'D',
        'E' => 'E',
        'F' => 'F',
        'G' => 'G',
        'A' => 'A',
        'B' => 'B'
    );
}
function GetOctavesArray()
{
    return array(
        3 => 3,
        4 => 4,
        5 => 5
    );
}
class AC_LoadFileInfo
{
    public $strLoadfile;
    public $oPathUser;
    public $oPathGame;
    public $oStatisticsSearch;
}
?>