<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

$strJsonGameString = $_POST['data'];
$arrGame    = json_decode($strJsonGameString);

// Make sure user is logged in
if($_SESSION['UserObject']->id == 0)
{
    exit; // Don't proceed due to error
}

// Find the ID on the game played
$strGamename = $arrGame[5];

$rGameInfo = $oSql->Select('
    SELECT
        id
    FROM
        games
    WHERE
        deleted = 0
     && permlink = "'.$strGamename.'"
');
$oGameInfo = $rGameInfo->fetch_object();

// Did we find a GameID?
$iGameID = $oGameInfo->id;
if($iGameID == 0)
{
    exit;
}

// Save points into a variable
$iPoints        = $arrGame[3];

// When did the game start and end
$iStartTime     = $arrGame[4][0]; // In ms
$iGameTime      = $arrGame[4][1]; // In ms
$fGameDuration  = $arrGame[4][2]; // Decimal seconds

$strStartDate   = date('Y-m-d H:i:s', ($iStartTime / 1000));

// When did the game end
$strEndDateTime = date('Y-m-d H:i:s', (($iStartTime + $iGameTime) / 1000));

// Initialize analysis arrays
$arrTuneAnalyser = array();
// Check if we're receiving an array
if(is_array($arrGame))
{
    $bIsFirstArray = true; // First array contains the tacts
	foreach($arrGame as $iDataEntry => $arrData)
	{
		if(is_array($arrData))
		{
			foreach($arrData as $iTactEntry => $strTactJSON)
			{
                if($bIsFirstArray)
                {
                    $arrTact = json_decode($strTactJSON);

                    if(is_array($arrTact))
                    {
                        foreach($arrTact as $iNote => $arrNote)
                        {
                            if(is_array($arrNote))
                            {
                                foreach($arrNote as $iNoteInfoEntry => $arrNoteInfoEntry)
                                {
                                    // Some statistics for this perticular note
                                    $iPercentAccuracy   = $arrNoteInfoEntry[1]->percent;
                                    $iFactor            = $arrNoteInfoEntry[1]->factor;
                                    $strEvaluationText  = $arrNoteInfoEntry[1]->text;
                                    $strEvalTextColor   = $arrNoteInfoEntry[1]->color;
                                    $iPoints            = $arrNoteInfoEntry[2];
                                    $strExpectedNote    = $arrNoteInfoEntry[3];
                                    $strExpectedOctave  = $arrNoteInfoEntry[4];

                                    // If this note in this octave isn't already in to the tune analyser array, then... well... do it!
                                    if(!is_array($arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave]))
                                    {
                                        $arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave] = array(
                                            'expected_freq' => 0,
                                            'pct'           => 0,
                                            'played'        => 0,
                                            'avg_freq'      => 0,
                                            'ticks'         => 0
                                        );
                                    }

                                    if(is_array($arrNoteInfoEntry[0]))
                                    {
                                        // Loop through each tick to find the avg frequency
                                        foreach($arrNoteInfoEntry as $iTicksEntry => $arrTicks)
                                        {
                                            if(is_array($arrTicks))
                                            {
                                                foreach($arrTicks as $iTickEntry => $arrTick)
                                                {
                                                    $arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave]['avg_freq'] += $arrTick[1];
                                                    $arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave]['ticks']++;
                                                }
                                            }
                                        }
                                    }

                                    // We temporarily save the SUM of the accuracy in the percentage entry in the spicific note array, we'll recalculate when we've looped through all of the music-data
                                    $arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave]['pct'] += $iPercentAccuracy;
                                    $arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave]['played']++;
                                }
                            }
                        }
                        /*
                        // The first note info loop contains multidementional array containing ticks
                        $bIsFirstNoteInfoLoop = false;
                        foreach($arrNote as $iNoteEntry => $arrNoteInfo)
                        {
                            if(is_array($arrNoteInfo))
                            {
                                foreach($arrNoteInfo[0] as $iTickEntry => $arrTicks)
                                {
                                    if(is_array($arrTicks))
                                    {
                                        foreach($arrTicks as $iTickInfo => $arrTickInfo)
                                        {
                                            //printr($arrTickInfo);
                                        }
                                    }
                                }

                                // Some statistics for this perticular note
                                $iPercentAccuracy   = $arrNoteInfo[1]->percent;
                                $iFactor            = $arrNoteInfo[1]->factor;
                                $strEvaluationText  = $arrNoteInfo[1]->text;
                                $strEvalTextColor   = $arrNoteInfo[1]->color;
                                $iPoints            = $arrNoteInfo[2];
                                $strExpectedNote    = $arrNoteInfo[3];
                                $strExpectedOctave  = $arrNoteInfo[4];

                                // If this note in this octave isn't already in to the tune analyser array, then... well... do it!
                                if(!is_array($arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave]))
                                {
                                    $arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave] = array(
                                        'avg_accuracy_percent'  => 0,
                                        'times_played'          => 0,
                                        'average_frequency'     => 0
                                    );
                                }

                                // We temporarily save the SUM of the accuracy in the percentage entry in the spicific note array, we'll recalculate when we've looped through all of the music-data
                                $arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave]['avg_accuracy_percent'] += $iPercentAccuracy;
                                $arrTuneAnalyser[$strExpectedNote.','.$strExpectedOctave]['times_played']++;
                            }
                        }*/
                    }
                }
				if(is_array($arrNote))
				{

				}
			}
            $bIsFirstArray = false; // Done loading tacts!
		}
	}
}

// Now fetch all tunes so we can match each tune with the appropriate frequency
$rTones = $oSql->Select('
    SELECT
        tones
    FROM
        tones
');
$oTones = $rTones->fetch_object();

$arrTones = json_decode($oTones->tones);

// Calculate numbers from the tune analyzer
foreach($arrTuneAnalyser as $strTuneIdentifyer => $arrTuneAnalyzerData)
{
    // Calculate average precent
    $arrTuneAnalyser[$strTuneIdentifyer]['pct'] = $arrTuneAnalyzerData['pct'] / $arrTuneAnalyzerData['played'];

    // Calculate average frequency
    $arrTuneAnalyser[$strTuneIdentifyer]['avg_freq'] = $arrTuneAnalyzerData['avg_freq'] / $arrTuneAnalyzerData['ticks'];

    // Now look for the frequancy we actually needed we actually looked for

    // First identify tone and octave we're looking at
    $arrCurrentTone = explode(',', $strTuneIdentifyer);

    // Loop through all tones that we know of
    foreach($arrTones as $iToneEntry => $oToneInfo)
    {
        // Check if we've arrived at the correct tone
        if($arrCurrentTone[0] == $oToneInfo->name && $arrCurrentTone[1] == $oToneInfo->octav)
        {
            $arrTuneAnalyser[$strTuneIdentifyer]['expected_freq'] = $oToneInfo->hz;
        }
    }
}

$strGameStatistics = json_encode($arrTuneAnalyser);

// Now save it all :D

// Create array to insert
$arrSavegame = array(
    'user_id'               => $_SESSION['UserObject']->id,
    'game_id'               => $iGameID,
    'points'                => $iPoints,
    'game_start'            => $strStartDate,
    'game_finished'         => $strEndDateTime,
    'game_duration'         => $fGameDuration,
    'json_gamestring'       => $strJsonGameString,
    'json_statisticsstring' => $strGameStatistics
);

// Insert it <3
$oSql->Insert('users_games_history', $arrSavegame, 'Game saved');

// Now pull out some easy-to-lookup, for instance which tunes the player had most difficulties playing

// Will maybe be done later :D
?>
