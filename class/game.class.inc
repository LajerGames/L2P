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
                 && languages.type      = "game_title"
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
?>