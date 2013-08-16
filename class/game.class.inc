<?php
class MainClass
{
	public	/**
			* @var MySQLWrapper
			*/
			$oSql,
			$bHasData	    = false,
			$iID		    = 0,
			$strGameType    = '';

	public function __construct(MySQLWrapper $oSql, $iID = 0, $strGameType = '')
	{
		$this->oSql	        = $oSql;
		$this->iID          = $iID;
		$this->strGameType	= $strGameType;

		if($this->iID !== 0)
		{
			$this->getData();
		}
	}

	public function setData($mData)
	{
		if(!is_object($mData))
		{
			$mData	= $this->oSql->SelectSingleObject($mData);
		}
		if(!is_null($mData))
		{
			foreach($mData as $strName => $mValue)
			{
				$this->$strName	= $mValue;
			}

			$this->bHasData	= true;
		}

		return;
	}

	public function getData()
	{
		return;
	}
}

class Author extends MainClass
{
	public	$iAuthorID		= 0,
			$strAuthorName	= '',
			$dAuthorBorn	= null,
			$dAuthorDied	= null;

	public function getData()
	{
		if($this->bHasData)
		{
			return;
		}

		$this->setData('
			SELECT
				authors.id		AS iAuthorID,
				authors.name	AS strAuthorName,
				authors.born	AS dAuthorBorn,
				authors.died	AS dAuthorDied
			FROM
				authors
			WHERE
				authors.deleted	= 0
			 &&	authors.id		= '.$this->iID.'
		');

		return;
	}
}

class GameData extends MainClass
{
	public	$strGameDataData	= '',
			$arrGameDataData	= array(),
			$strGameDataOctave	= '';

	public function getData()
	{
		if($this->bHasData)
		{
			return;
		}

		$this->setData('
			SELECT
				games.game		AS strGameDataData,
				games.octave	AS strGameDataOctave
			FROM
				games
			WHERE
				games.id	= '.$this->iID.'
		');

		$this->arrGameDataData	= json_decode($this->strGameDataData);

		return;
	}

	public function getIllustration($iOctave = null)
	{
		$arrFirstNote	= null;
		$arrTacts		= $this->arrGameDataData[2];

		foreach($arrTacts as $iTactNo => $arrTactInfo)
		{
			if($arrFirstNote)
			{
				break;
			}

			$arrNotes	= $arrTactInfo[1];
			foreach($arrNotes as $iNoteNo => $arrNote)
			{
				if($arrNote[1])
				{
					$arrFirstNote	= $arrNote;
					break;
				}
			}
		}

		$strNoteName	= $arrFirstNote[1];
		if(is_null($iOctave))
		{
			$iOctave	= $this->arrGameDataData[1][0] + $arrFirstNote[0];
		}

		$oIllustrations	= new Illustrations($this->oSql);

		return $oIllustrations->RenderStartPosition(Illustrations::Instrument_Violin, $iOctave, $strNoteName, false, $this->strGameType);
	}

	public function GetEndgameAchievement($iGameID, $iOctave, $iUserID, $iPoints)
	{
		// READ ME
		/**
		* So, this is how this is going to work.
		* We will look for some kind of achievement, we will look for them in the order we hope to meet them, could be
		*   - Is this game top ten
		*   - Is this game top ten this month
		*   - Is it three ten the last seven days
		*   - Is it your own personal record ( This one will be merged with any other message if it's there nomatter what )
		*/

		$oEndgameAchievement    = new AC_EndGameAchievement();

		$bContinueSearch        = true; // If anything was found, then we won't bother looking any further

		$bAnyAchievement        = false;

		// How many games do we require to compare with in order to check for highscores?
		$iLifetimeReq           = 50;
		$iMonthReq              = 50;
		$iSevenDayReq           = 30;
		$iPersonalReq           = 5;

		// First priority is lifetime records
		$iLifetimeGames = $this->oSql->SelectSingleValue('
			SELECT
				COUNT(users_games_history.id)           AS iGames
			FROM
				users_games_history
			WHERE
				users_games_history.deleted             = 0
			 && users_games_history.game_id             = '.$iGameID.'
			 && users_games_history.game_start_octave   = '.$iOctave.'
		');

		if($iLifetimeGames >= $iLifetimeReq)
		{
			// Get the 10 best games ever.
			$rTopTenLifetime = $this->oSql->Select('
				SELECT
					users_games_history.points              AS iPoints,
					users_games_history.user_id             AS iUserID
				FROM
					users_games_history
				WHERE
					users_games_history.deleted             = 0
				 && users_games_history.game_id             = '.$iGameID.'
				 && users_games_history.game_start_octave   = '.$iOctave.'
				ORDER BY
					users_games_history.points DESC
				LIMIT 10
			');

			$iPlacement = 1;
			while($oTopTenLifetime = $this->oSql->FetchObject($rTopTenLifetime))
			{
				if($oTopTenLifetime->iPoints < $iPoints)
				{
					// So yea, this attempt is on a $iPlacement plce thus placing user $oTopTenLifetime->iUserID on the ++$oTopTenLifetime place.
					$bAnyAchievement = true;
					$bContinueSearch = false;
					break;
				}
				$iPlacement++;
			}
		}

		if($bContinueSearch)
		{
			// Did the user break any records this month
			$iMonthGames = $this->oSql->SelectSingleValue('
				SELECT
					COUNT(users_games_history.id)           AS iGames
				FROM
					users_games_history
				WHERE
					users_games_history.deleted             = 0
				 && users_games_history.game_id             = '.$iGameID.'
				 && users_games_history.game_start_octave   = '.$iOctave.'
				 && users_games_history.created_on          >= "'.date('Y-m-01').'"
			');

			if($iMonthGames >= $iMonthReq)
			{
				// Get the 10 best games this month.
				$rTopTenMonth = $this->oSql->Select('
					SELECT
						users_games_history.points              AS iPoints,
						users_games_history.user_id             AS iUserID
					FROM
						users_games_history
					WHERE
						users_games_history.deleted             = 0
					 && users_games_history.game_id             = '.$iGameID.'
					 && users_games_history.game_start_octave   = '.$iOctave.'
					 && users_games_history.created_on          >= "'.date('Y-m-01').'"
					ORDER BY
						users_games_history.points DESC
					LIMIT 10
				');

				$iPlacement = 1;
				while($oTopTenMonth = $this->oSql->FetchObject($rTopTenMonth))
				{
					if($rTopTenMonth->iPoints < $iPoints)
					{
						// This is some sort of record this month.. YAY celebration
						$bAnyAchievement = true;
						$bContinueSearch = false;
						break;
					}
					$iPlacement++;
				}
			}
		}

		if($bContinueSearch)
		{
			$strDateSevenDaysAgo = date('Y-m-d', strtotime('-7 days'));

			// Did the user break any records this week
			$iSevenDayGames = $this->oSql->SelectSingleValue('
				SELECT
					COUNT(users_games_history.id)           AS iGames
				FROM
					users_games_history
				WHERE
					users_games_history.deleted             = 0
				 && users_games_history.game_id             = '.$iGameID.'
				 && users_games_history.game_start_octave   = '.$iOctave.'
				 && users_games_history.created_on          >= "'.$strDateSevenDaysAgo.'"
			');

			if($iSevenDayGames >= $iSevenDayReq)
			{
				// Get the 5 best games ever.
				$rTopTenSevenDays = $this->oSql->Select('
					SELECT
						users_games_history.points              AS iPoints,
						users_games_history.user_id             AS iUserID
					FROM
						users_games_history
					WHERE
						users_games_history.deleted             = 0
					 && users_games_history.game_id             = '.$iGameID.'
					 && users_games_history.game_start_octave   = '.$iOctave.'
					 && users_games_history.created_on          >= "'.$strDateSevenDaysAgo.'"
					ORDER BY
						users_games_history.points DESC
					LIMIT 5
				');

				$iPlacement = 1;
				while($oTopTenSevenDays = $this->oSql->FetchObject($rTopTenSevenDays))
				{
					if($oTopTenSevenDays->iPoints < $iPoints)
					{
						// This is on the top five within the past seven days... YAY YOU!
						$bAnyAchievement = true;
						$bContinueSearch = false;
						break;
					}
					$iPlacement++;
				}
			}
		}

		// Last but not least we will always where this is according to personal records
		$iPersonalPlacement = $this->oSql->SelectSingleValue('
			SELECT
				(COUNT(users_games_history.id) + 1)     AS iPersonalRank
			FROM
				users_games_history
			WHERE
				users_games_history.deleted             = 0
			 && users_games_history.game_id             = '.$iGameID.'
			 && users_games_history.game_start_octave   = '.$iOctave.'
			 && users_games_history.points              > '.$iPoints.'
		');

		if($iPersonalPlacement === 1)
		{
			$bAnyAchievement = true;
		}


		return;
	}
}

class Game
{
	private $oSql,

			$bHasData			= false;

	public	$iGameID			= 0,
			$strGameType        = '',
			$strGameTitle		= '',
			$strGamePermlink	= '',
			$iAuthorID			= 0,
			$iGameReleased		= 0;

	public function __construct(MySQLWrapper $oSql, $mID = '')
	{
		$this->oSql = $oSql;

		if(!empty($mID))
		{
			if(is_int($mID))
			{
				$this->iGameID	= $mID;
			}
			else
			{
				$this->iGameID	= $this->oSql->SelectSingleValue('
					SELECT
						games.id		AS iGameID
					FROM
						games
					WHERE
						games.deleted	= 0
					 &&	games.permlink	= "'.$this->oSql->RealEscape($mID).'"
				');
			}

			$this->strGameType = $this->oSql->SelectSingleValue('
				SELECT
					games.type        AS strGameType
				FROM
					games
				WHERE
					games.deleted    = 0
				 &&    games.permlink    = "'.$this->oSql->RealEscape($mID).'"
			');
		}

		if($this->iGameID !== 0)
		{
			$this->getData();
		}
	}

	public function getData()
	{
		if($this->bHasData)
		{
			return;
		}

		$this->bHasData	= true;
		$strLang = $_COOKIE['country_code'] == 'da-DK'? 'da-DK' : 'en-US';

		$oData	= $this->oSql->SelectSingleObject('
			SELECT
				games.id				    AS iGameID,
				languages.name              AS strGameTitle,
				games.permlink			    AS strGamePermlink,
				games_info.author_id	    AS iAuthorID,
				games_info.released		    AS iGameReleased
			FROM
				games
			RIGHT JOIN
				languages ON
					languages.deleted       = 0
				 && languages.type          = "game_title"
				 && languages.lang          = "'.$strLang.'"
				 && languages.parent_id     = games.id
			LEFT JOIN
				games_info ON
					games_info.deleted	    = 0
				 &&	games_info.game_id	    = games.id
			WHERE
				games.deleted			    = 0
			 &&	games.id				    = '.$this->iGameID.'
		');

		foreach($oData as $strName => $mValue)
		{
			$this->$strName	= $mValue;
		}

		return;
	}

	public function getAuthor()
	{
		return new Author($this->oSql, $this->iAuthorID);
	}

	public function getGameData()
	{
		return new GameData($this->oSql, $this->iGameID, $this->strGameType);
	}
}
class SongGenerator
{
	const   Duration_Short      = 'short',  // ~30 secs
			Duration_Medium     = 'medium', // ~60 secs
			Duration_Long       = 'long',   // ~120 secs
			Speed_Slow          = 'slow',   // 60 bpm
			Speed_Medium        = 'medium', // 80 bom
			Speed_Fast          = 'fast',   // 100 bpm
			Pulse_TwoFourths    = '2/4',
			Pulse_ThreeFourths  = '3/4',
			Pulse_FourFourths   = '4/4',
			Pulse_FiveFourths   = '5/4',
			Pulse_SixFourths    = '6/4',
			Direction_Up        = 'up',
			Direction_Down      = 'down',
			Direction_Stay      = 'stay',
            Difficulty_Easy     = 'easy',
            Difficulty_Medium   = 'medium',
            Difficulty_Hard     = 'hard';

	public  /**
			* @var MySQLWrapper
			*/
			$oSql,
			$iLowestOctave      = 4,
			$strLowestNote      = 'C',
			$iHighestOctave     = 5,
			$strHighestNote     = 'B',
			$cSpeed             = SongGenerator::Speed_Medium,
			$cDuration          = SongGenerator::Duration_Short,
			$cPulse             = SongGenerator::Pulse_FourFourths,
			$arrSharps          = array(),
			$arrFlats           = array(),
            $cDifficulty        = SongGenerator::Difficulty_Easy;


	public function __construct(MySQLWrapper $oSql)
	{
		$this->oSql            = $oSql;

		return;
	}

	public function GenerateSong()
	{
		// So get all info about this song your heart can desire!
		$oBasicSongInfo     = $this->GetBasicSongInfo();

		// To get the starting note we first need to get a random allowed note
		$iRandomNoteEntry   = $this->GetRandomNoteEntry($oBasicSongInfo->iLowestNoteEntry, $oBasicSongInfo->iHighestNoteEntry);

		// Get array with all notes which exists :)
		$arrAllNotes        = $this->GetAllNotes();
        $oNoteInfo          = $this->GetNoteInfo($iRandomNoteEntry, $arrAllNotes);
        $iDefaultOctave     = $oNoteInfo->iOctave;

		$arrSong = json_decode('[100,[4],[[1,[[4,"D",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0]]],[1,[[4,"D",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0]]],[1,[[6,"B",0,0,0],[6,"B",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0]]],[1,[[6,"G",0,0,0],[6,"A",0,0,0],[4,"B",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0]]],[1,[[4,"D",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0]]],[1,[[4,"D",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0]]],[1,[[6,"B",0,0,0],[6,"B",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0],[6,"A",0,0,0]]],[1,[[6,"G",0,0,0],[6,"A",0,0,0],[4,"B",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0]]],[1,[[4,"D",1,0,0],[2,"D",1,0,0],[4,"B",0,0,0]]],[1,[[4,"D",1,0,0],[2,"D",1,0,0],[4,"B",0,0,0]]],[1,[[6,"B",0,0,0],[6,"B",0,0,0],[6,"C",1,0,0],[6,"C",1,0,0],[6,"C",1,0,0],[6,"C",1,0,0],[6,"C",1,0,0],[6,"C",1,0,0]]],[1,[[6,"B",0,0,0],[6,"C",1,0,0],[4,"D",1,0,0],[4,"B",0,0,0],[4,"B",0,0,0]]],[1,[[4,"D",1,0,0],[2,"D",1,0,0],[4,"B",0,0,0]]],[1,[[4,"D",1,0,0],[2,"D",1,0,0],[4,"B",0,0,0]]],[1,[[6,"B",0,0,0],[6,"B",0,0,0],[6,"C",1,0,0],[6,"C",1,0,0],[6,"C",1,0,0],[6,"C",1,0,0],[6,"C",1,0,0],[6,"C",1,0,0]]],[1,[[6,"B",0,0,0],[6,"A",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0],[4,"G",0,0,0]]]],["F"],[]]');
        //printr($arrSong);
		$arrTacts = array();
		for($iTactNo = 0; $iTactNo < $oBasicSongInfo->iAmountOfTacts; $iTactNo++)
		{
			$arrTacts[] = $this->CreateTactTemplate($oBasicSongInfo);
		}

        // Run through all the tacts and give them a
        $iChanceToProceedThisWay    = 50;
        $iLoopsThisDirection        = 0;
        $cCurrentDirection          = SongGenerator::Direction_Up;
        $iNotesLeftThisDirection    = $this->CalculateNotesLeftThisDirection($cSuggestedNewDirection, $arrAllNotes, $oNoteInfo, $oBasicSongInfo);
        foreach($arrTacts as $iTactNo => $arrTactInfo)
        {
            foreach($arrTactInfo[1] as $iNoteID => $arrNote)
            {
                // In which direction are we supposed to go?
                $cSuggestedNewDirection  = $this->GetDirection($cCurrentDirection, $iChanceToProceedThisWay);

                // Only find out if we can go this way if we're not continueing last note
                if($cSuggestedNewDirection !== SongGenerator::Direction_Stay)
                {
                    // Is this new direction valid?
                    $iNotesLeftThisDirection    = $this->CalculateNotesLeftThisDirection($cSuggestedNewDirection, $arrAllNotes, $oNoteInfo, $oBasicSongInfo);

                    // If we cannot continue this direction
                    if($iNotesLeftThisDirection < 1)
                    {
                        // There is no way... :)
                        $cSuggestedNewDirection  = $this->GetDirection($cSuggestedNewDirection, 0);
                        $iNotesLeftThisDirection    = $this->CalculateNotesLeftThisDirection($cSuggestedNewDirection, $arrAllNotes, $oNoteInfo, $oBasicSongInfo);
                    }
                }

                // Did that chance our direction?
                // If so, reset iLoopsThisDirection
                if($cSuggestedNewDirection !== $cCurrentDirection && $cSuggestedNewDirection !== SongGenerator::Direction_Stay)
                {
                    $cCurrentDirection      = $cSuggestedNewDirection;
                    $iLoopsThisDirection    = 0;
                }

                // If we're not going to dublicate the last note we just played, the tell the system thhat's we're proceeding on the current path :)
                if($cSuggestedNewDirection !== SongGenerator::Direction_Stay)
                {
                    // Add one counter to the iLoopsThisDirection variable
                    $iLoopsThisDirection++;

                    // What is the chance that we'll continue this direction the next time?
                    $iChanceToProceedThisWay = $this->CalculateOddsOfKeepingDirection($iLoopsThisDirection);

                    // How many notes do we jump?
                    $iNotesToJump   = $this->HowManyNotesDoWeJump($iNotesLeftThisDirection);

                    $iNotesToJump   = $cCurrentDirection === SongGenerator::Direction_Down ? $iNotesToJump * -1 : $iNotesToJump;

                    // Now fetch the new noteobject Fido!
                    $oNoteInfo = $this->GetNoteInfo(($oNoteInfo->iEntry+$iNotesToJump), $arrAllNotes);
                }

                $iRelativeOctave                    = $oNoteInfo->iOctave - $iDefaultOctave;

                $arrTacts[$iTactNo][1][$iNoteID][1] = $oNoteInfo->strNotename;
                $arrTacts[$iTactNo][1][$iNoteID][2] = $iRelativeOctave;
            }
        }
        /*

        // Now are we starting in an upwards or downwards direction - We'll give at 50/50 chance of going either up or down as start direction

        */
/*
        $bFirstNote             = true;
        $iLoopsThisDirection    = 0;
        foreach($arrTacts as $iTactNo => $arrTactInfo)
        {
            foreach($arrTactInfo[1] as $iNoteID => $arrNote)
            {
                $bResetFirstNote = true;
                if(!$bFirstNote)
                {
                    // Get a new note - can we proceed in the direction we're at right now?
                    $bChangeDirection           = false;
                    $iNotesLeftThisDirection    = $this->CalculateNotesLeftThisDirection($cCurrentDirection, $arrAllNotes, $oNoteInfo, $oBasicSongInfo);
                    if($iNotesLeftThisDirection < 1)
                    {
                        $bChangeDirection = true;
                    }

                    // Do we need to change direction?
                    if($bChangeDirection)
                    {
                        $cNewDirectionSuggestion = $this->GetDirection($cCurrentDirection, 0);

                        if($cNewDirectionSuggestion !== SongGenerator::Direction_Stay)
                        {
                            $cCurrentDirection      = $cNewDirectionSuggestion;
                            $iLoopsThisDirection    = 0;
                        }
                        else
                        {
                            $bRepeatPreviousnote = true;
                        }
                    }

                    // If we're not repeating previous note we need to tell the system that this is one (more) time we're going in this direction
                    $iNotesToJump = 0;
                    if(!$bRepeatPreviousnote)
                    {
                        $iLoopsThisDirection++;
                        // Now to find out how many notes to jump?
                        $iNotesToJump   = $this->HowManyNotesDoWeJump($iNotesLeftThisDirection);
                        $iNotesToJump   = $cCurrentDirection === SongGenerator::Direction_Up ? $iNotesToJump : $iNotesToJump * -1;
                    }

                    // Save the new note in the noteinfo object
                    $oNoteInfo = $this->GetNoteInfo(($oNoteInfo->iEntry+$iNotesToJump), $arrAllNotes);

                    // Do we need to change direction
                    $iOddsOfKeepingDirection = $this->CalculateOddsOfKeepingDirection($iLoopsThisDirection);

                    $cNewDirectionSuggestion = $this->GetDirection($cCurrentDirection, $iOddsOfKeepingDirection);

                    if($cNewDirectionSuggestion !== SongGenerator::Direction_Stay && $cNewDirectionSuggestion !== $cCurrentDirection)
                    {
                        // Looks like we're changing direction
                        $cCurrentDirection      = $cNewDirectionSuggestion;
                        $iLoopsThisDirection    = 0;
                    }
                    elseif($cNewDirectionSuggestion === SongGenerator::Direction_Stay)
                    {
                        $bFirstNote         = true;
                        $bResetFirstNote    = false;
                    }
                }
                $iRelativeOctave                    = $iDefaultOctave - $oNoteInfo->iOctave;

                $arrTacts[$iTactNo][1][$iNoteID][1] = $oNoteInfo->strNotename;
                $arrTacts[$iTactNo][1][$iNoteID][2] = $iRelativeOctave;

                if($bResetFirstNote)
                {
                    $bFirstNote = false;
                }
            }
        }*/

		// Now it's time to start generating the song
		$arrSong = array(
			$oBasicSongInfo->iBPM,
			array($iDefaultOctave),
			$arrTacts,
			$this->arrSharps,
			$this->arrFlats
		);

        echo json_encode($arrSong);

		return;
	}

    private function CalculateOddsOfKeepingDirection($iLoopsThisDirection)
    {
        $iChanceOfKeepingOnDirection = 0;
        switch($iLoopsThisDirection)
        {
            case 1 :
                $iChanceOfKeepingOnDirection = 85;
                break;
            case 2 :
                $iChanceOfKeepingOnDirection = 75;
                break;
            case 3 :
                $iChanceOfKeepingOnDirection = 60;
                break;
            case 4 :
                $iChanceOfKeepingOnDirection = 50;
                break;
            case 5 :
                $iChanceOfKeepingOnDirection = 35;
                break;
            case 6 :
                $iChanceOfKeepingOnDirection = 20;
                break;
            case 7 :
                $iChanceOfKeepingOnDirection = 15;
                break;
            case 8 :
                $iChanceOfKeepingOnDirection = 0;
                break;
        }

        return $iChanceOfKeepingOnDirection;
    }

    private function HowManyNotesDoWeJump($iMaxDistance)
    {
        $arrNoteJump = array();
        switch($this->cDifficulty)
        {
            case SongGenerator::Difficulty_Easy :
                $arrNoteJump[95]    = 1;
                $arrNoteJump[5]     = 2;
                break;
            case SongGenerator::Difficulty_Medium :
                $arrNoteJump[87]    = 1;
                $arrNoteJump[13]    = 2;
                break;
            case SongGenerator::Difficulty_Hard :
                $arrNoteJump[87]    = 1;
                $arrNoteJump[15]    = 2;
                $arrNoteJump[5]     = 3;
                break;
        }

        // Get a random number from 1 to a hundred and find out how many notes to jump?
        $iLuckyNumber = rand(1, 100);

        $iJump = 0;
        foreach($arrNoteJump as $iProbability => $iJumps)
        {
            $iLuckyNumber -= $iProbability;

            if($iLuckyNumber < 1)
            {
                if($iMaxDistance < $iJumps)
                {
                    $iJumps = $iMaxDistance;
                }
                $iJump = $iJumps;

                break;
            }
        }

        return $iJump;
    }

    private function CalculateNotesLeftThisDirection($cDirection, $arrAllNotes, AC_Note $oNoteInfo, AC_GetBasicSongInfo $oBasicSongInfo)
    {
        switch($cDirection)
        {
            case SongGenerator::Direction_Up :
                $iNotesLeftDirection = ($oBasicSongInfo->iHighestNoteEntry - ($oNoteInfo->iEntry));
                break;
            case SongGenerator::Direction_Down :
                $iNotesLeftDirection = ($oNoteInfo->iEntry - $oBasicSongInfo->iLowestNoteEntry);
                break;
        }

        return $iNotesLeftDirection;
    }

    private function CreateTactTemplate($oBasicSongInfo)
    {
        $arrNoteProperties  = $this->MakeNoteProperties($oBasicSongInfo->iBeatsPerTact);
        $iPercentLeftOfTact = 100;
        $iChanceToWorkWith  = 100;

        $arrTactNotes = array();
        while($iPercentLeftOfTact > 0)
        {
            // Find out how much chance we have left to work with
            if($iPercentLeftOfTact != 100)
            {
                $iChanceToWorkWith = 0;
                foreach($arrNoteProperties as $arrNote)
                {
                    if($arrNote[0] <= $iPercentLeftOfTact)
                    {
                        $iChanceToWorkWith += $arrNote[1];
                    }
                }
            }

            // Get a number between 1 and the amount of chance we have
            $iLuckyNumber = rand(1, $iChanceToWorkWith);

            // Now loop through the array and find the lucky number's note
            foreach($arrNoteProperties as $iNoteID => $arrNote)
            {
                $iLuckyNumber -= $arrNote[1];
                // Do we choose this one?
                if($iLuckyNumber < 1)
                {
                    $arrTactNotes[] = array(
                        $iNoteID,
                        '#NoteName#',
                        0,
                        0,
                        0
                    );
                    // Now we have less percent left of the tact
                    $iPercentLeftOfTact -= $arrNote[0];
                    break;
                }
            }
        }

        // Create the tact array
        return array(
            $oBasicSongInfo->oGamePulse->iPulseID,
            $arrTactNotes
        );
    }

    private function MakeNoteProperties($iQuarterBeatsPerTact)
    {
        // Create percentage change for either note to be chosen according to difficulty
        switch($this->cDifficulty)
        {
            case SongGenerator::Difficulty_Easy :
                $iWholenote         = 0;
                $iHalfnotePeriod    = 0;
                $iHalfnote          = 100;
                $iQuarternotePeriod = 0;
                $iQuarternote       = 0;
                $iEighthnotePeriod  = 0;
                $iEighthnote        = 0;
                break;
            case SongGenerator::Difficulty_Medium :
                $iWholenote         = 5;
                $iHalfnotePeriod    = 10;
                $iHalfnote          = 25;
                $iQuarternotePeriod = 10;
                $iQuarternote       = 40;
                $iEighthnotePeriod  = 0;
                $iEighthnote        = 10;
                break;
            case SongGenerator::Difficulty_Hard :
                $iWholenote         = 2;
                $iHalfnotePeriod    = 3;
                $iHalfnote          = 5;
                $iQuarternotePeriod = 10;
                $iQuarternote       = 30;
                $iEighthnotePeriod  = 25;
                $iEighthnote        = 25;
                break;
        }
        return array(
            6   => array(100 / ($iQuarterBeatsPerTact / 0.5),   $iEighthnote),          // Eighthnote
            //7   => array(100 / ($iQuarterBeatsPerTact / 0.75),  $iEighthnotePeriod),    // Eighthperiod
            4   => array(100 / $iQuarterBeatsPerTact,           $iQuarternote),         // Quarternote
            5   => array(100 / ($iQuarterBeatsPerTact / 1.5),   $iQuarternotePeriod),   // Quarterperiod
            2   => array(100 / ($iQuarterBeatsPerTact / 2),     $iHalfnote),            // Halfnote
            3   => array(100 / ($iQuarterBeatsPerTact / 3),     $iHalfnotePeriod),      // Halfperiod
            1   => array(100,                                   $iWholenote)            // Wholenote
        );
    }

	/**
	* Tells you which way the notes need to go next :)
	*
	* @param const $cCurrentDirection
	* @param int $iPercentualChanceOfKeepingOnTrack
	* @param int $iChanceOfStayingAtCurrentNote
	* @returns constant
	*/
	private function GetDirection($cCurrentDirection, $iPercentualChanceOfKeepingOnTrack, $iChanceOfStayingAtCurrentNote = 10)
	{
		// First of all, do we stay here?
		if(GetPercentualChange($iChanceOfStayingAtCurrentNote))
		{
			$cDirection       = SongGenerator::Direction_Stay;
		}
		else
		{
			// Now, do we then change direction?
			$bContinueDirection = GetPercentualChange($iPercentualChanceOfKeepingOnTrack);

			if($bContinueDirection)
			{
				$cDirection = $cCurrentDirection;
			}
			else
			{
				$cDirection = $cCurrentDirection === SongGenerator::Direction_Up ? SongGenerator::Direction_Down : SongGenerator::Direction_Up;
			}
		}

		return $cDirection;
	}

	/**
	* Will give a random number between the allowed number entries in the note array, in order to give out a starting note
	*
	* @param int $iLowestNoteEntry
	* @param int $iHighestNoteEntry
	*/
	private function GetRandomNoteEntry($iLowestNoteEntry, $iHighestNoteEntry)
	{
		return rand($iLowestNoteEntry, $iHighestNoteEntry);
	}

	private function GetNoteInfo($iEntryID, $arrAllNotes)
	{
		$strNotename            = $arrAllNotes[$iEntryID];

		$arrNoteInfo            = explode(',', $strNotename);

		$oNoteInfo              = new AC_Note();
		$oNoteInfo->iEntry      = $iEntryID;
		$oNoteInfo->iOctave     = intval($arrNoteInfo[0]);
		$oNoteInfo->strNotename = $arrNoteInfo[1];

		return $oNoteInfo;
	}

	public function GetBasicSongInfo()
	{
		// Get neccesary calculation info
		$iBPM               = $this->GetGameBPM();
		$iTargetDuration    = $this->GetTargetDuration();
		$oGamePulse         = $this->GetGamePulse();

		// How long time does one beat last?
		$iDurationPerBeat   = 60/$iBPM;

		// Now get amount of quarternote beats per tact
		$iBeatsPerTact      = ($oGamePulse->iNumerator / $oGamePulse->iDenominator) * 4;

		// How long time does one tact take?
		$fTactDuration      = $iDurationPerBeat * $iBeatsPerTact;

		// Find out how many tacts to make to get nearest to the target duration
		$iAmountOfTacts     = round($iTargetDuration / $fTactDuration);

		// Now get the actual gametime
		$fActualDuration    = $iAmountOfTacts * $fTactDuration;

		// Now we're about to calculate which note entries we're about to use from the notes array.

		// Get all the basic notes
		$arrAllNotes = $this->GetAllNotes();

		// Which notes can we use in this instance
		$iLowestNoteEntry   = 0;
		$iHighestNoteEntry  = 16;
		foreach($arrAllNotes as $iNoteEntry => $strNote)
		{
			if($strNote == $this->iLowestOctave.','.$this->strLowestNote)
			{
				$iLowestNoteEntry = $iNoteEntry;
			}
			if($strNote == $this->iHighestOctave.','.$this->strHighestNote)
			{
				$iHighestNoteEntry = $iNoteEntry;
			}
		}

		// Now create an instance of the GameInfo class in order to get all of this information into a neat object
		$oBasicSongInfo = new AC_GetBasicSongInfo();
		$oBasicSongInfo->iBPM               = $iBPM;
		$oBasicSongInfo->iTargetDuration    = $iTargetDuration;
		$oBasicSongInfo->oGamePulse         = $oGamePulse;
		$oBasicSongInfo->iDurationPerBeat   = $iDurationPerBeat;
        $oBasicSongInfo->fDurationPerTact   = $fTactDuration;
		$oBasicSongInfo->iBeatsPerTact      = $iBeatsPerTact;
		$oBasicSongInfo->iAmountOfTacts     = $iAmountOfTacts;
		$oBasicSongInfo->fActualDuration    = $fActualDuration;
		$oBasicSongInfo->iLowestNoteEntry   = $iLowestNoteEntry;
		$oBasicSongInfo->iHighestNoteEntry  = $iHighestNoteEntry;

		return $oBasicSongInfo;
	}

	/**
	* Gives you a BPM in numbers instead of the useless string constant we have now.. that is only for the user :D
	*
	*/
	private function GetGameBPM()
	{
		$iBPM = 0;
		switch($this->cSpeed)
		{
			case SongGenerator::Speed_Slow :
				$iBPM = 60;
				break;
			case SongGenerator::Speed_Medium :
				$iBPM = 80;
				break;
			case SongGenerator::Speed_Fast :
				$iBPM = 100;
				break;
		}

		return $iBPM;
	}

	/**
	* Gives you a number, which is the amount of seconds we're trying to make this song last
	*
	*/
	private function GetTargetDuration()
	{
		$iTargetDuration = 0;
		switch($this->cDuration)
		{
			case SongGenerator::Duration_Short :
				$iTargetDuration = 30;
				break;
			case SongGenerator::Duration_Medium :
				$iTargetDuration = 60;
				break;
			case SongGenerator::Duration_Long :
				$iTargetDuration = 120;
				break;
		}

		return $iTargetDuration;
	}

	/**
	* Gives you an object containing info about the game pulse.
	*
	*/
	private function GetGamePulse()
	{
		$strGamePulse   = '';
		$iGamePulseID   = 0;
		switch($this->cPulse)
		{
			case SongGenerator::Pulse_TwoFourths :
				$strGamePulse   = '2/4';
				$iGamePulseID   = 5;
				break;
			case SongGenerator::Pulse_ThreeFourths :
				$strGamePulse = '3/4';
				$iGamePulseID   = 2;
				break;
			case SongGenerator::Pulse_FourFourths :
				$strGamePulse = '4/4';
				$iGamePulseID   = 1;
				break;
			case SongGenerator::Pulse_FiveFourths :
				$strGamePulse = '5/4';
				$iGamePulseID   = 3;
				break;
			case SongGenerator::Pulse_SixFourths :
				$strGamePulse = '6/4';
				$iGamePulseID   = 4;
				break;
		}

		$arrGamePulse = explode('/', $strGamePulse);

		$oGamePulse = new AC_GetGamePulse();
		$oGamePulse->strPulse       = $strGamePulse;
		$oGamePulse->iPulseID       = $iGamePulseID; // Used in JS :)
		$oGamePulse->iNumerator     = intval($arrGamePulse[0]);
		$oGamePulse->iDenominator   = intval($arrGamePulse[1]);

		return $oGamePulse;
	}

	/**
	* Made to give octave/note combination a mathmatical number which will be easier to calculate with! :)
	*
	*/
	private function GetAllNotes()
	{
		return array(
			'3,G',
			'3,A',
			'3,B',
			'4,C',
			'4,D',
			'4,E',
			'4,F',
			'4,G',
			'4,A',
			'4,B',
			'5,C',
			'5,D',
			'5,E',
			'5,F',
			'5,G',
			'5,A',
			'5,B',
			'6,C',
			'6,D',
			'6,E',
			'6,F',
			'6,G',
			'6,A',
			'6,B'
		);
	}
}
class Illustrations
{
	private $oSql;

	const   Instrument_Violin   = 'violin',
			Instrument_Guitar   = 'guitar',
			GameType_Song       = 'song',
			GameType_Scale      = 'scale';

	public function __construct($oSql)
	{
		$this->oSql = $oSql;
	}

	/**
	* Will create the actual illustration container
	*
	* @param int $iOctave
	* @param string $strNoteName
	*/
	private function ViolinFirstPosIllustration($iOctave, $strNoteName, $bPreferFourthPos, $cGameType = Illustrations::GameType_Scale)
	{
		$iTopPosition   = 0;
		$strString      = '';

		if($iOctave === 3)
		{
			$strString = 'G';
			// In octave 3 we're absolutely certain that we're in the left column
			switch($strNoteName)
			{
				case 'G#' :
				case 'Ab' :
					$iTopPosition += 46;
					break;
				case 'A' :
					$iTopPosition += 92;
					break;
				case 'A#' :
				case 'Bb' :
					$iTopPosition += 138;
					break;
				case 'B' :
					$iTopPosition += 184;
					break;
			}
		}

		if($iOctave === 4)
		{
			$strString = 'D';
			switch($strNoteName)
			{
				case 'C' :
					$strString = 'G';
					$iTopPosition += 230;
					break;
				case 'C#' :
				case 'Db' :
					$strString = 'G';
					$iTopPosition += 276;
					break;
				case 'D#' :
				case 'Eb' :
					$iTopPosition += 46;
					break;
				case 'E' :
					$iTopPosition += 92;
					break;
				case 'F' :
					$iTopPosition += 138;
					break;
				case 'F#' :
				case 'Gb' :
					$iTopPosition += 184;
					break;
				case 'G' :
					$iTopPosition += 230;
					break;
				case 'G#' :
				case 'Ab' :
					$iTopPosition += 276;
					break;
				case 'A' :
					$strString = 'A';
					break;
				case 'A#' :
				case 'Bb' :
					$strString = 'A';
					$iTopPosition += 46;
					break;
				case 'B' :
					$strString = 'A';
					$iTopPosition += 92;
					break;
			}
		}

		if($iOctave === 5)
		{
			$strString = 'E';
			switch($strNoteName)
			{
				case 'C' :
					$strString = 'A';
					$iTopPosition += 138;
					break;
				case 'C#' :
				case 'Db' :
					$strString = 'A';
					$iTopPosition += 184;
					break;
				case 'D' :
					$strString = 'A';
					$iTopPosition += 230;
					break;
				case 'D#' :
				case 'Eb' :
					$strString = 'A';
					$iTopPosition += 276;
					break;
				case 'F' :
					$iTopPosition += 46;
					break;
				case 'F#' :
				case 'Gb' :
					$iTopPosition += 92;
					break;
				case 'G' :
					$iTopPosition += 138;
					break;
				case 'G#' :
				case 'Ab' :
					$iTopPosition += 184;
					break;
				case 'A' :
					$iTopPosition += 230;
					break;
				case 'A#' :
				case 'Bb' :
					$iTopPosition += 276;
					break;
				case 'B' :
					$iTopPosition += 322;
					break;
			}
		}

		$strColor = $cGameType === Illustrations::GameType_Scale ? '#E2A30C' : '#71C211';

		$strGString = $strString == 'G' ? '<span class="TopNote" style="position:absolute;top:'.$iTopPosition.'px;background-color:'.$strColor.';">'.$strNoteName.'</span>' : '';
		$strDString = $strString == 'D' ? '<span class="TopNote" style="position:absolute;top:'.$iTopPosition.'px;background-color:'.$strColor.';">'.$strNoteName.'</span>' : '';
		$strAString = $strString == 'A' ? '<span class="TopNote" style="position:absolute;top:'.$iTopPosition.'px;background-color:'.$strColor.';">'.$strNoteName.'</span>' : '';
		$strEString = $strString == 'E' ? '<span class="TopNote" style="position:absolute;top:'.$iTopPosition.'px;background-color:'.$strColor.';">'.$strNoteName.'</span>' : '';

		return '
		<table border="0" cellspacing="0" cellpadding="0" id="ViolinFingerBoard">
			<tr>
				<td align="center">
					<span class="TopNote">G</span>
					<div></div>
					'.$strGString.'
				</td>
				<td align="center">
					<span class="TopNote">D</span>
					<div></div>
					'.$strDString.'
				</td>
				<td align="center">
					<span class="TopNote">A</span>
					<div></div>
					'.$strAString.'
				</td>
				<td align="center">
					<span class="TopNote">E</span>
					<div></div>
					'.$strEString.'
				</td>
			</tr>
		</table>
		';
	}

	/**
	* Returns a start div a image of the instrument with a marked position for the first note
	*
	* @param const $cInstrument
	* @param int $iOctave
	* @param string $strNoteName
	* @param bool $bPreferFourthPos
	*/
	public function RenderStartPosition($cInstrument, $iOctave, $strNoteName, $bPreferFourthPos = false, $cGameType = Illustrations::GameType_Scale)
	{

		$strPositionIllustration = '';
		switch($cInstrument)
		{
			case Illustrations::Instrument_Violin :
				$strPositionIllustration =  $this->ViolinFirstPosIllustration($iOctave, $strNoteName, $bPreferFourthPos, $cGameType);
				break;
		}

		return $strPositionIllustration;
	}
}
class AC_EndGameAchievement
{
	public  $bAnyAchievement,
			$cType,
			$iPlace,
			$iUserOvertaken,
			$bPersonalRecord;
}
class AC_GetBasicSongInfo
{
	public  $iBPM,
			$iTargetDuration,
			$fActualDuration,
            $iBeatsPerTact,
			$oGamePulse,
			$iDurationPerBeat,
			$fDurationPerTact,
			$iAmountOfTacts,
			$iLowestNoteEntry,
			$iHighestNoteEntry;
}
class AC_GetGamePulse
{
	public  $strPulse,
			$iPulseID,
			$iNumerator,
			$iDenominator;
}
class AC_Note
{
	public  $iEntry,
			$iOctave,
			$strNotename;
}
?>