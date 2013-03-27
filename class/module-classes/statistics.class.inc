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
    private function GetGameData($bReturnEntireGamestring = false)
    {
        // Do we limit the amount of songs we return?
        $strLimit = $iLimit > 0 ? 'LIMIT '.$iLimit : '';
echo $strLimit;
        // Build a conditions string
        $strConditions = '
         && users_games_history.user_id     = '.$this->oSearch->iUserID.'
        ';

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
                users_games_history.json_statisticsstring   AS strGameStatistics
            FROM
                users_games_history
            WHERE
                users_games_history.deleted                 = 0
                '.$strConditions.'
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

            $arrGameData[] = $oGameData;
        }

        return $arrGameData;
    }

    /**
    * Returns a array containing precision data matching the search criterias
    *
    * @param array $arrGameData
    */
    private function GetPrecisionArray($arrGameData)
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

        // Create HighChart friendly array to return
        $arrChartData = array();

        // Loop through all the diffrent notes and calculate their true avrage
        foreach($arrNotesPrecision as $strNoteLetter => $arrNoteTotals)
        {
            $arrChartData[] = array(
                'name'  => $strNoteLetter,
                'y'     => ($arrNotesPrecision[$strNoteLetter]['accuracy_sum'] / $arrNotesPrecision[$strNoteLetter]['played'])
            );
        }

        return $arrChartData;
    }

    /**
    * Returns a array containing points per minute pr. day user is playing
    *
    * @param array $arrGameData
    */
    private function GetPointsPerMinuteArray($arrGameData)
    {
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
        $arrChartData = array();
        foreach($arrDailyPoints as $strDate => $arrDayData)
        {
            // Calculate points per minute
            $iPointsPerMinute = intval(($arrDayData['points'] / $arrDayData['playtime']) * 60);
            $arrChartData[] = array(
                'name'  => $strDate,
                'y'     => $iPointsPerMinute
            );
        }

        return $arrChartData;
    }

    function SortArray (&$arrFavourites, $strKey)
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

    private function RenderavouriteSongs($arrGameData)
    {
        // Get sorted array with favourite songs
        $arrFavouriteSongs = $this->GetFavouriteSongs($arrGameData);

        // Create rows for the table containing favourite songs
        $strFavouriteSongsRows = '';
        $iLoopID = 1;
        foreach($arrFavouriteSongs as $iGameID => $arrGameInfo)
        {
            $strFavouriteSongs .= '
                <tr>
                    <td>'.$iLoopID.'</td>
                    <td>'.$arrGameInfo['name'].'</td>
                    <td>'.$arrGameInfo['played'].'</td>
                    <td>'.$arrGameInfo['avg_points'].'</td>
                </tr>
            ';
            $iLoopID++;
        }
        if(!empty($strFavouriteSongs))
        {
            $strFavouriteSongs = '
            <table border="0" cellspacing="0" cellpadding="0" class="table FavouriteSongList">
                <tr>
                    <th style="width:100px;">#</th>
                    <th>Name</th>
                    <th style="width:50px;">Played</th>
                    <th style="width:50px;">Avg. pts.</th>
                </tr>
                '.$strFavouriteSongs.'
            </table>
            ';
        }

        return '
            <div id="FavouriteSongs">
                <a href="">'.$this->oLang->Get('statistics_view_all').'</a>
                <h3>'.$this->oLang->Get('statistics_favourites').' (Top 10)</h3>
            </div>
            '.$strFavouriteSongs.'
        ';
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

            // Get array for user precision
            $arrPrecision = $this->GetPrecisionArray($arrGameData);

            // Get array for userpoints
            $arrPointsPerMinute = $this->GetPointsPerMinuteArray($arrGameData);

            // Create a string containing favourite songs
            $strFavouriteSongs  = $this->RenderavouriteSongs($arrGameData);

            $strReturn	= '
            	<div class="hidden" data-statistic="'.htmlentities(json_encode(array($arrPrecision, $arrPointsPerMinute))).'"></div>
				<div class="statistic-graph"></div>
				<div class="statistic-graph"></div>
				<div class="clear"></div>
                '.$strFavouriteSongs.'
            ';
        }

        return $strReturn;
    }
}
class AC_RenderStatisticsSearch
{
    public $iUserID;
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
}