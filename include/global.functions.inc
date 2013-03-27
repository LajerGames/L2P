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
*/
function Redirect($strLocation)
{
	header('Location: '.$strLocation);
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

		$rCurl		= curl_init('http://freegeoip.net/xml/'.$_SERVER['REMOTE_ADDR']);
		curl_setopt($rCurl, CURLOPT_RETURNTRANSFER, true);
		$strTest	= curl_exec($rCurl);
		curl_close($rCurl);

		$oXML	= new SimpleXMLElement($strTest);

		if(isset($arrCountryCodes[$oXML->CountryCode->__toString()]))
		{
			$strCountryCode	= $arrCountryCodes[$oXML->CountryCode->__toString()];
		}
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

	return $rMusic = $oSql->Select('
		SELECT
			games.id,
			games.title,
			games.permlink,
			games.availability
		FROM
			games
		WHERE
			games.deleted    = 0
		 && games.type       = "'.$strType.'"
		 '.$strWhereCondition.'
		GROUP BY
			games.title
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
function FindLoadFile($oSql, $bReturn404 = false)
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
    elseif(substr(REQUEST_URI, 0, 6) === '/game/')
    {
        $oLoadInfo->strLoadfile = SERVER_PROJECT_ROOT_MODULES.'game/game.php';
    }
    else
    {
        
        // If we wind up in here, there is a chance we're looking at a username in the permlink... Find out which part of the url we know, and see if we can identify the a username afterwards
        // Explode the URI
        $arrURI = explode('/', REQUEST_URI, 4);

        // Initialize readable variables
        $strFolder          = $arrURI[1];
        $strUsername        = $arrURI[2];
        $strRemainingPath   = $arrURI[3];

        // Set two booleans, a path and a recognized username - both is false as default. If both is true once we're done checking we've got ourselves a custom permlink
        $bRecognizedPath    = false;
        $bRecognizedUser    = false;

        // Do we know this path
        switch($strFolder)
        {
            case 'user':
                $bRecognizedPath = true;
                break;
        }

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
class AC_LoadFileInfo
{
    public $strLoadfile;   
    public $oPathUser;   
}
?>