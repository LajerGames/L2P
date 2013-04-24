<?php
class statistics
{
    public $oSql;
    public $oSearch;
    public $oLang;

    public function __construct(MySQLWrapper $oSql, AC_RenderStatisticsSearch $oSearch, Language $oLang)
    {
        $this->oSql     = $oSql;
        $this->oSearch  = $oSearch;
        $this->oLang	= $oLang;

        return;
    }

    /**
    * Returns gamedata
    *
    * @return AC_GameData[]
    */
    private function GetGameData($bReturnEntireGamestring = false, $oCustomSearch = null)
    {
        // Do we limit the amount of songs we return?
        $strLimit = $iLimit > 0 ? 'LIMIT '.$iLimit : '';

        if($oCustomSearch === null)
        {
			$oCustomSearch = $this->oSearch;
		}

        // Build a conditions string
        $strConditions = '
         && users_games_history.user_id     = '.$oCustomSearch->iUserID.'
        ';

        # GameIDs
        if(is_array($oCustomSearch->arrGameIDs))
        {
            // Create a string which will contain CSV with GameIDs
            $strINClause = '';
            foreach($oCustomSearch->arrGameIDs as $iGameID)
            {
                $strINClause .= $iGameID.',';
            }
            $strINClause = empty($strINClause) ? 0 : rtrim($strINClause, ',');

            $strConditions .= '
             && users_games_history.game_id     IN('.$strINClause.')
            ';
        }

        # GameHistoryIDs
        if(is_array($oCustomSearch->arrGameHistoryIDs))
        {
            // Create a string whhich will contain CSV with GameHistoryIDs
            $strINClause = '';
            foreach($oCustomSearch->arrGameHistoryIDs as $iGameHistoryID)
            {
                $strINClause .= $iGameHistoryID.',';
            }
            $strINClause = empty($strINClause) ? 0 : rtrim($strINClause, ',');

            $strConditions .= '
             && users_games_history.id      IN('.$strINClause.')
            ';
        }

        // The entire gamestring is pretty damn huge, only fetch it if it's neccesary
        $strSelect = $bReturnEntireGamestring ? 'users_games_history.json_gamestring            AS strEntireGame' : '';

        // Fetch all the gamedata
        $rGameData = $this->oSql->Select('
            SELECT
                users_games_history.id                      AS iDataID,
                users_games_history.game_id                 AS iGameID,
                users_games_history.points                  AS iPoints,
                users_games_history.game_start              AS tGameStart,
                users_games_history.game_finished           AS tGameFinished,
                users_games_history.game_duration           AS fGameDuration,
                '.$strSelect.'
                users_games_history.json_statisticsstring   AS strGameStatistics,
                users_games_history.json_tactstats          AS strTactStatistics
            FROM
                users_games_history
            WHERE
                users_games_history.deleted                 = 0
                '.$strConditions.'
            ORDER BY
                users_games_history.points                  DESC
            '.$strLimit.'
        ');

        // We'll return a array containing oGameData
        $arrGameData = array();

        // Loop through the gamedata and save it in the autocomplete class
        while($oGameObject = $this->oSql->FetchObject($rGameData))
        {
            // Create new instance of the GameData autocompleteclass
            $oGameData = new AC_GameData();
            $oGameData->iDataID             = $oGameObject->iDataID;
            $oGameData->iGameID             = $oGameObject->iGameID;
            $oGameData->iPoints             = $oGameObject->iPoints;
            $oGameData->tGameStart          = $oGameObject->tGameStart;
            $oGameData->tGameFinished       = $oGameObject->tGameFinished;
            $oGameData->fGameDuration       = $oGameObject->fGameDuration;
            $oGameData->strEntireGame       = $oGameObject->strEntireGame;
            $oGameData->strGameStatistics   = $oGameObject->strGameStatistics;
            $oGameData->strTactStatistics   = $oGameObject->strTactStatistics;

            $arrGameData[] = $oGameData;
        }

        return $arrGameData;
    }

    /**
    * Returns a array containing precision data matching the search criterias
    *
    * @param array $arrGameData
    * @param array $arrAverageData
    */
    private function GetPrecisionArray($arrGameData, $arrAverageData = null)
    {
    	// Get note precision
    	$arrNotesPrecision = $this->CalculateNotePrecision($arrGameData);

    	// If we have a average gamedata we'll need to put that into a neat array aswell
    	$arrAverageNotePrecision = array();
    	if(is_array($arrAverageData))
    	{
			$arrAverageNotePrecision = $this->CalculateNotePrecision($arrAverageData);
		}

        // Create HighChart friendly array to return
        $arrChartData = array();

        // Start building the array

        //loop through the notes precision to build the x-axis
        $arrXAxis = array();
        foreach($arrNotesPrecision as $strNoteLetter => $arrNoteTotal)
        {
			$arrXAxis[] = $strNoteLetter;
		}

		// Create the x-axis
		$arrChartData['categories'] = $arrXAxis;

        // Loop through all the diffrent notes and calculate their true avrage and add it to the precision array "Series"
        $arrNotePrecisionThisGame = array();
        foreach($arrNotesPrecision as $strNoteLetter => $arrNoteTotals)
        {
            $arrNotePrecisionThisGame[] = ($arrNotesPrecision[$strNoteLetter]['accuracy_sum'] / $arrNotesPrecision[$strNoteLetter]['played']);
        }

        $arrChartData['series'][] = array(
				'name' => $this->oLang->Get('statistics_this_game'),
				'data' => $arrNotePrecisionThisGame
		);

		// Do this all over again if we have some average gamedata to show
		if(sizeof($arrAverageNotePrecision) > 0)
		{
			// Loop through all the diffrent notes and calculate their true avrage and add it to the precision array "Series"
	        $arrNotePrecisionaverageGame = '';
	        foreach($arrAverageNotePrecision as $strNoteLetter => $arrNoteTotals)
	        {
	            $arrNotePrecisionaverageGame[] = ($arrNotesPrecision[$strNoteLetter]['accuracy_sum'] / $arrNotesPrecision[$strNoteLetter]['played']);
	        }

	        $arrChartData['series'][] = array(
					'name' => $this->oLang->Get('statistics_average_games'),
					'data' => $arrNotePrecisionaverageGame
			);
		}

        return $arrChartData;
    }
    private function CalculateNotePrecision($arrGameData)
    {
		$arrNotesPrecision = array();
        foreach($arrGameData as $oGameData)
        {
            // Now loop through all of the game statistics in order to get avrage precision on all notes
            $arrGameStatistics = json_decode($oGameData->strGameStatistics, true);

            // Loop through all of the notes in the statistics
            foreach($arrGameStatistics as $strNote => $arrStatistics)
            {
                // Save the NoteLetter with no octave, sharp and flats
                $strNoteLetter = substr($strNote, 0, 1);

                // Check if this NoteLetter is already in the precision array
                if(!is_array($arrNotesPrecision[$strNoteLetter]))
                {
                    $arrNotesPrecision[$strNoteLetter] = array(
                        'played'            => 0,
                        'accuracy_sum'      => 0
                    );
                }

                // Add to played and accuracy_sum
                $arrNotesPrecision[$strNoteLetter]['accuracy_sum']  += ($arrStatistics['pct'] * $arrStatistics['played']);
                $arrNotesPrecision[$strNoteLetter]['played']        += $arrStatistics['played'];
            }
        }

        return $arrNotesPrecision;
	}

    /**
    * Returns a array containing points per minute pr. day user is playing
    *
    * @param array $arrGameData
    */
    private function GetPointsPerMinuteArray($arrGameData)
    {
    	// Initialize the Chart data array
    	$arrChartData = array();

		// Create the x-axis and the series
		$arrChartData['categories'] = array();
		$arrChartData['series'] = array(
			array(
				'name' => $this->oLang->Get('statistics_this_game'),
				'data' => array()
			)
		);

        // Initialize the array to contain sorted data about points each day
        $arrDailyPoints = array();
        foreach($arrGameData as $oGameData)
        {
            // What date was this made Y-m-d
            $strDate = date('Y-m-d', strtotime($oGameData->tGameStart));

            // Check if this date is saved in our points per minute array
            if(!is_array($arrDailyPoints[$strDate]))
            {
                $arrDailyPoints[$strDate] = array(
                    'points'    => 0,
                    'playtime'  => 0
                );
            }

            // Add points and playtime to array
            $arrDailyPoints[$strDate]['points']     += $oGameData->iPoints;
            $arrDailyPoints[$strDate]['playtime']   += $oGameData->fGameDuration;
        }

        // Now loop through each day and find the points per minute on that particular day
        foreach($arrDailyPoints as $strDate => $arrDayData)
        {
            // Calculate points per minute
            $iPointsPerMinute 						= intval(($arrDayData['points'] / $arrDayData['playtime']) * 60);
            $arrChartData['categories'][] 			= $strDate;
            $arrChartData['series'][0]['data'][]	= $iPointsPerMinute;
        }

        return $arrChartData;
    }

    private function SortArray (&$arrFavourites, $strKey)
    {
        $arrSorter  = array();
        $arrRet     = array();

        reset($arrFavourites);

        foreach($arrFavourites as $iGameID => $arrFavouriteInfo)
        {
            $arrSorter[$iGameID] = $arrFavouriteInfo[$strKey];
        }

        // Sort this descending
        arsort($arrSorter);

        foreach($arrSorter as $ii => $va)
        {
            $arrRet[$ii]=$arrFavourites[$ii];
        }

        $arrFavourites = $arrRet;
    }

    /**
    * Creates a array containing your favourite songs - sorted by most played
    *
    * @param array $arrGameData
    */
    private function GetFavouriteSongs($arrGameData)
    {
        // Initialize array which will contain keydata about each song, array will be ordered according to number of played
        $arrFavouriteSongs = array();
        foreach($arrGameData as $oGameData)
        {
            if(!is_array($arrFavouriteSongs[$oGameData->iGameID]))
            {
                if($oGameData->iGameID > 0)
                {
                    // Find information about this song
                    $oSongInfo = $this->oSql->SelectSingleObject('
                        SELECT
                            games.id        AS iSongID,
                            games.title     AS strSongTitle,
                            games.permlink  AS strPermlink
                        FROM
                            games
                        WHERE
                            games.id = '.$oGameData->iGameID.'
                    ');

                    $iSongFound = $oSongInfo->iSongID > 0 ? 1 : 0;

                    $arrFavouriteSongs[$oGameData->iGameID] = array(
                        'song_found'    => $iSongFound,
                        'name'          => $oSongInfo->strSongTitle,
                        'permlink'      => $oSongInfo->strPermlink,
                        'played'        => 0,
                        'avg_points'    => 0
                    );
                }
            }

            // Update the information about this song
            $arrFavouriteSongs[$oGameData->iGameID]['played']++;
            $arrFavouriteSongs[$oGameData->iGameID]['avg_points'] += $oGameData->iPoints;
        }

        // Now loop through the song array in order to calculate the avrage points obtained on this song
        foreach($arrFavouriteSongs as $iGameID => $arrGameInfo)
        {
            $arrFavouriteSongs[$iGameID]['avg_points'] = ($arrGameInfo['avg_points'] / $arrGameInfo['played']);
        }

        $this->SortArray($arrFavouriteSongs, 'played');

        return $arrFavouriteSongs;
    }

    /**
    * Creates a array containing avg. accuracy in each tact
    *
    * @param array $arrGameData
    */
    private function GetTactAccuracyArray($arrGameData, $arrAverageData = null)
    {
        // We know how the game data looks, and we know that we cannot be in here unless we've received only one game from the game history, make that JSON string into a array which can be interped by the graph thingy
        $strTactString = $arrGameData[0]->strTactStatistics;

        // Make JSON string into a array
        $arrTacts = json_decode($strTactString);

        // Create HighChart friendly array to return
        $arrChartData = array();

        // Loop through the Tacts array to create the x-axis
        $arrXAxis = array();
        for($i = 1; $i <= sizeof($arrTacts); $i++)
        {
			$arrXAxis[] = $i;
		}

		// Create the x-axis
		$arrChartData['categories'] = $arrXAxis;

        // Create array with y-axis values for this game
        $arrTactPrecisionThisGame = array();
        foreach($arrTacts as $iAvgPct)
        {
        	$arrTactPrecisionThisGame[] = $iAvgPct;
        }

        // Add data to the series
        $arrChartData['series'][] = array(
				'name' => $this->oLang->Get('statistics_this_game'),
				'data' => $arrTactPrecisionThisGame
		);

		// Now check if we need to add the average data to this array
		if(is_array($arrAverageData))
		{
			// In here we need to loop through each game and get to an average on each tact in this game
			$arrAverageTactData = array();
			foreach($arrAverageData as $oAverageGameData)
			{
				// Add the pct of this game foreach tact foreach game
				$arrTactAverageGame	= json_decode($oAverageGameData->strTactStatistics);

				// Loop through each tact in this particular game
				$iLoopNo = 0;
				foreach($arrTactAverageGame as $iAvgPct)
				{
					$iLoopNo++;
					if(!isset($arrAverageTactData[$iLoopNo]))
					{
						$arrAverageTactData[$iLoopNo] = 0;
					}

					$arrAverageTactData[$iLoopNo] += $iAvgPct;
				}
			}

			// Loop through the average tact data and divide the percentage in the values by the amount of times this is played
			$arrTactPrecisionAverageGame = array();
			foreach($arrAverageTactData as $iTactNo => $iAvgPct)
			{
				$arrTactPrecisionAverageGame[] = $iAvgPct / sizeof($arrAverageData);
			}

			// Add data to the series
	        $arrChartData['series'][] = array(
					'name' => $this->oLang->Get('statistics_average_games'),
					'data' => $arrTactPrecisionAverageGame
			);
		}

        return $arrChartData;
    }

    /**
    * Returns a "most played" html-songstring! - sorted by most played
    *
    * @param array $arrGameData
    */
    private function RenderFavouriteSongs($arrGameData)
    {
        // Get sorted array with favourite songs
        $arrFavouriteSongs = $this->GetFavouriteSongs($arrGameData);

        // Create rows for the table containing favourite songs
        $strFavouriteSongsRows = '';
        $iLoopID = 1;
        foreach($arrFavouriteSongs as $iGameID => $arrGameInfo)
        {
            // Is points and played plural?
            $strPlayed = $arrGameInfo['played'] == 1 ? $this->oLang->Get('statistics_time') : $this->oLang->Get('statistics_times');
            $strPoints = $arrGameInfo['avg_points'] == 1 ? $this->oLang->Get('global_point') : $this->oLang->Get('global_points');

            $strFavouriteSongs .= '
                <tr data-gameid="'.$iGameID.'">
                    <td>'.$iLoopID.'</td>
                    <td>'.$arrGameInfo['name'].'</td>
                    <td>'.$arrGameInfo['played'].' '.$strPlayed.'</td>
                    <td>'.$arrGameInfo['avg_points'].' '.$strPoints.'</td>
                </tr>
            ';
            $iLoopID++;
        }
        if(!empty($strFavouriteSongs))
        {
            $strFavouriteSongs = '
            <table border="0" cellspacing="0" cellpadding="0" class="table BottomTableView">
                <tr>
                    <th>#</th>
                    <th>'.$this->oLang->Get('statistics_title').'</th>
                    <th>'.$this->oLang->Get('statistics_played').'</th>
                    <th>'.$this->oLang->Get('statistics_avg_pts').'</th>
                </tr>
                '.$strFavouriteSongs.'
            </table>
            ';
        }

        return '
            <div id="BottomList">
                <a href="">'.$this->oLang->Get('statistics_view_all').'</a>
                <h3>'.$this->oLang->Get('statistics_favourites').' (Top 10)</h3>
            </div>
            '.$strFavouriteSongs.'
        ';
    }

    private function RenderTopPlayed($arrGameData)
    {
        // Create rows for the table containing top played - meaning most most points gain playing this particular song
        $strTopPlayedRows = '';
        $iLoopID = 1;
        foreach($arrGameData as $oGameData)
        {
            // Is points plural?
            $strPoints = $oGameData->points == 1 ? $this->oLang->Get('global_point') : $this->oLang->Get('global_points');

            $strTopPlayedRows .= '
                <tr data-gamehistoryid="'.$oGameData->iDataID.'">
                    <td>'.$iLoopID.'</td>
                    <td>'.RenderDate($oGameData->tGameStart, $this->oLang).'</td>
                    <td>'.$oGameData->iPoints.' '.$strPoints.'</td>
                </tr>
            ';
            $iLoopID++;
        }

        if(!empty($strTopPlayedRows))
        {
            $strTopPlayedRows = '
            <table border="0" cellspacing="0" cellpadding="0" class="table BottomTableView">
                <tr>
                    <th>#</th>
                    <th>'.$this->oLang->Get('time_date').'</th>
                    <th>'.$this->oLang->Get('global_points').'</th>
                </tr>
                '.$strTopPlayedRows.'
            </table>
            ';
        }

        return '
            <div id="BottomList">
                <a href="">'.$this->oLang->Get('statistics_view_all').'</a>
                <h3>'.$this->oLang->Get('statistics_plays').'</h3>
            </div>
            '.$strTopPlayedRows.'
        ';
    }

    private function RenderSongAdditionalStats($arrGameData, $arrAverageGameData)
    {
        $oSongInfo = $this->oSql->SelectSingleObject('
            SELECT
                games.title     AS strSongTitle
            FROM
                games
            WHERE
                games.id = '.$arrGameData[0]->iGameID.'
        ');

        // Calculate averages
        $iAveragePoints             = 0;
        $iAveragePointsPerMinute    = 0;
        foreach($arrAverageGameData as $oGameData)
        {
            //printr($oGameData);
            $iAveragePoints             += $oGameData->iPoints;
            $iAveragePointsPerMinute    += $oGameData->iPoints / ($oGameData->fGameDuration / 60); // This is currently a float, it will be re-int'ifyed soon... sry 'bout that :)

            //$iGamePrecision             += $this->CalculateGamePrecision($oGameData->$strGameStatistics);
        }

        // Divide total amounts with amount of games played to get average
        $iAveragePoints             = $iAveragePoints / count($arrAverageGameData);
        $iAveragePointsPerMinute    = round($iAveragePointsPerMinute / count($arrAverageGameData));

        $iGamePointsPerMinute       = round($arrGameData[0]->iPoints / ($arrGameData[0]->fGameDuration / 60));

        // Find out if we need to write plural or non-plural points on each value

        # Points
        $strAvgPointsPlural             = $iAveragePoints           == 1 ? $this->oLang->Get('global_point') : $this->oLang->Get('global_points');
        $strGamePointsPlural            = $arrGameData[0]->iPoints  == 1 ? $this->oLang->Get('global_point') : $this->oLang->Get('global_points');

        # Points per minute
        $strAvgPointsPerMinutePlural    = $iAveragePointsPerMinute  == 1 ? $this->oLang->Get('global_point') : $this->oLang->Get('global_points');
        $strGamePointsPerMinutePlural   = $iGamePointsPerMinute     == 1 ? $this->oLang->Get('global_point') : $this->oLang->Get('global_points');

        return '
            <div id="BottomList">
                <h3>'.$this->oLang->Get('statistics_summery').'</h3>
            </div>
            <table border="0" cellspacing="0" cellpadding="0" class="table Summery">
                <tr>
                    <td>'.$this->oLang->Get('statistics_title').'</td>
                    <td colspan="2">'.$oSongInfo->strSongTitle.'</td>
                </tr>
                <tr>
                    <td>'.$this->oLang->Get('statistics_play_time').'</td>
                    <td colspan="2">'.RenderGameDuration($arrGameData[0]->fGameDuration, $this->oLang).'</td>
                </tr>
                <tr>
                    <th>&nbsp;</th>
                    <th>'.$this->oLang->Get('statistics_played').'</th>
                    <th>'.$this->oLang->Get('statistics_avg_pts').'</th>
                </tr>
                <tr>
                    <td>'.$this->oLang->Get('global_points').'</td>
                    <td>'.$iAveragePoints.' '.$strAvgPointsPlural.'</td>
                    <td>'.$arrGameData[0]->iPoints.' '.$strGamePointsPlural.'</td>
                </tr>
                <tr>
                    <td>'.$this->oLang->Get('statistics_graph_pointsprminute').'</td>
                    <td>'.$iGamePointsPerMinute.' '.$strGamePointsPerMinutePlural.'</td>
                    <td>'.$iAveragePointsPerMinute.' '.$strAvgPointsPerMinutePlural.'</td>
                </tr>
                <!--tr>
                    <td>'.$this->oLang->Get('statistics_graph_precision').'</td>
                    <td>xx</td>
                    <td>xx</td>
                </tr-->
            </table>
        ';
    }
    private function CalculateGamePrecision($strGameStatistics)
    {
        //echo $strGameStatistics;

        return;   
    }

    /**
    * Returns 0-3 to tell which statistics screen we'll show, if 0 is returned you've got a bug!
    *
    * @param array $arrGameData
    */
    private function ChooseScreen($arrGameData)
    {
    	// Initialize return variable
    	$iReturn = 0;

		// Does the game have more then one GameID?
		$bMultipleGameIDs 	= false;
		$bIsFirstLoop 		= true;
		$iGameID 			= 0;
		foreach($arrGameData as $oGameData)
		{
			if($bIsFirstLoop)
			{
				$iGameID = 	$oGameData->iGameID;
				$bIsFirstLoop = false;
			}
			else
			{
				if($iGameID !== $oGameData->iGameID)
				{
					$bMultipleGameIDs = true;
					break;
				}
			}
		}

		// If we have multiple games, we'll need to show screen 1 nomatter what
		if($bMultipleGameIDs)
		{
			$iReturn = 1;
		}
		else
		{
			// So we've only got 1 GameID (Or 0 but that would mean a bug)
			// Find out if we've got more than one GameHistoryID
			if(sizeof($arrGameData) == 1)
			{
				// We've only got one GameHistoryID - Hussah! Let's show screen 3
				$iReturn = 3;
			}
			elseif(sizeof($arrGameData) > 1)
			{
				// Only 1 GameID but multiple GameHistoryID's let's show screen two
				$iReturn = 2;
			}
		}

		// Return the screen we found best to show, if we return 0, we didn't find anything and we've got ourselves a bug!
		return $iReturn;
	}

    /**
    * Renders an entire statistics viewport
    *
    * @param AC_RenderStatisticsSearch $oSearch
    */
    public function RenderStatistics()
    {
        $strReturn = '';

        // We might aswell check that we have a UserID, without it there is no use of showing anything
        if(intval($this->oSearch->iUserID) == 0)
        {
            $strReturn = 'Error';
        }
        else
        {
            // Get Gamedata
            $arrGameData = $this->GetGameData();

            /**
            * Read this carefully if you wish to understand what's going on here!
            * We have 3 optional screens to show.
            * 1. The default screen, has no search besides the UserID needed
            * 2. The Game screen, it requires the search provided to return nothing more than 1 Game - it has multiple GameHistoryIDs but only one GameID will be shown.
            * 	We could get this if we've received a array containing multiple GameHistoryIDs which all leads to only one game, or we could get a search for this particular GameID, all of it will result in screen 2
            * 3. A spicific GameHistoryScreen... shows a particular game the user has played, this screen provides additional info plus a extra demention to the graph which shows how well the user has performed compared to his average skill.
            */

            // First of all, find out which screen we will be showing
            $iChosenScreen = $this->ChooseScreen($arrGameData);

            // Render the correct screen
            switch($iChosenScreen)
            {
				case 1 :
					// Create a string containing favourite songs
	                $strInfoList  = $this->RenderFavouriteSongs($arrGameData);

	                // Get array for user precision
		            $arrLeftChart = $this->GetPrecisionArray($arrGameData);

		            // Get array for userpoints
		            $arrRightChart = $this->GetPointsPerMinuteArray($arrGameData);
					break;
				case 2 :
					// Create a string to contain top specific times this has been played
	                $strInfoList  = $this->RenderTopPlayed($arrGameData);

	                // Get array for user precision
		            $arrLeftChart = $this->GetPrecisionArray($arrGameData);

		            // Get array for userpoints
		            $arrRightChart = $this->GetPointsPerMinuteArray($arrGameData);
					break;
				case 3 :
					// If we only have one specific GameID we'll show a bit more statistics about this game

					// Which GameID is this

	                // Create a new instance of the search class in order to get GameData from the GameData function
	                $oAverageData = new AC_RenderStatisticsSearch();
	                $oAverageData->iUserID 		= $this->oSearch->iUserID;
	                $oAverageData->arrGameIDs 	= array($arrGameData[0]->iGameID);

	                $arrAverageGameData = $this->GetGameData(false, $oAverageData);

	                // First of all, show a graph which will contain a graph over tacts
	                $arrRightChart = $this->GetTactAccuracyArray($arrGameData, $arrAverageGameData);

	                $arrLeftChart = $this->GetPrecisionArray($arrGameData, $arrAverageGameData);

                    $strInfoList  = $this->RenderSongAdditionalStats($arrGameData, $arrAverageGameData);
					break;
				default :

					break;
			}

            $strReturn	= '
            	<form class="hidden" name="search">
					<input type="hidden" name="game_history_ids" value="'.implode(',', $this->oSearch->arrGameHistoryIDs).'" />
					<input type="hidden" name="game_ids" value="'.implode(',', $this->oSearch->arrGameIDs).'" />
            	</form>
            	<div class="hidden" data-statistic="'.htmlentities(json_encode(array($arrLeftChart, $arrRightChart))).'"></div>
				<div class="statistic-graph"></div>
				<div class="statistic-graph"></div>
				<div class="clear"></div>
                '.$strInfoList.'
            ';
        }

        return $strReturn;
    }
}
class AC_RenderStatisticsSearch
{
    public $iUserID;
    public $arrGameIDs;
    public $arrGameHistoryIDs;
}
class AC_GameData
{
    public $iDataID;
    public $iGameID;
    public $iPoints;
    public $tGameStart;
    public $tGameFinished;
    public $fGameDuration;
    public $strEntireGame;
    public $strGameStatistics;
    public $strTactStatistics;
}