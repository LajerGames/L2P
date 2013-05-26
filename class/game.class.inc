<?php
class MainClass
{
	public	/**
			* @var MySQLWrapper
			*/
			$oSql,
			$bHasData	= false,
			$iID		= 0;

	public function __construct(MySQLWrapper $oSql, $iID = 0)
	{
		$this->oSql	= $oSql;
		$this->iID	= $iID;

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
		foreach($mData as $strName => $mValue)
		{
			$this->$strName	= $mValue;
		}

		$this->bHasData	= true;

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

		return $oIllustrations->RenderStartPosition(Illustrations::Instrument_Violin, $iOctave, $strNoteName);
	}
}

class Game
{
	private $oSql,

			$bHasData			= false;

	public	$iGameID			= 0,
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

		$this->bHasData;

		$oData	= $this->oSql->SelectSingleObject('
			SELECT
				games.id				AS iGameID,
				games.title				AS strGameTitle,
				games.permlink			AS strGamePermlink,
				games_info.author_id	AS iAuthorID,
				games_info.released		AS iGameReleased
			FROM
				games
			RIGHT JOIN
				games_info ON
					games_info.deleted	= 0
				 &&	games_info.game_id	= games.id
			WHERE
				games.deleted			= 0
			 &&	games.id				= '.$this->iGameID.'
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
		return new GameData($this->oSql, $this->iGameID);
	}
}
class Illustrations
{
    private $oSql;

    const   Instrument_Violin   = 'violin',
            Instrument_Guitar   = 'guitar';

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
    private function ViolinFirstPosIllustration($iOctave, $strNoteName, $bPreferFourthPos)
    {
        $iTopPosition   = 25;
        $iLeftPosition  = 7; // Default position starts here - we will add to it, as we find the true position of the marker

        if($iOctave === 3)
        {
            // In octave 3 we're absolutely certain that we're in the left column
            switch($strNoteName)
            {
                case 'G#' :
                case 'Ab' :
                    $iTopPosition += 40;
                    break;
                case 'A' :
                    $iTopPosition += 79;
                    break;
                case 'A#' :
                case 'Bb' :
                    $iTopPosition += 119;
                    break;
                case 'B' :
                    $iTopPosition += 158;
                    break;
            }
        }

        if($iOctave === 4)
        {
            switch($strNoteName)
            {
                case 'C' :
                    $iTopPosition += 198;
                    break;
                case 'C#' :
                case 'Db' :
                    $iTopPosition += 237;
                    break;
                case 'D' :
                    if($bPreferFourthPos)
                    {
                        $iTopPosition += 277;
                    }
                    else
                    {
                        $iLeftPosition += 33;
                    }
                    break;
                case 'D#' :
                case 'Eb' :
                    $iLeftPosition += 33;
                    $iTopPosition += 40;
                    break;
                case 'E' :
                    $iLeftPosition += 33;
                    $iTopPosition += 79;
                    break;
                case 'F' :
                    $iLeftPosition += 33;
                    $iTopPosition += 119;
                    break;
                case 'F#' :
                case 'Gb' :
                    $iLeftPosition += 33;
                    $iTopPosition += 158;
                    break;
                case 'G' :
                    $iLeftPosition += 33;
                    $iTopPosition += 198;
                    break;
                case 'G#' :
                case 'Ab' :
                    $iLeftPosition += 33;
                    $iTopPosition += 237;
                    break;
                case 'A' :
                    if($bPreferFourthPos)
                    {
                        $iLeftPosition += 33;
                        $iTopPosition += 277;
                    }
                    else
                    {
                         $iLeftPosition += 66;
                    }
                    break;
                case 'A#' :
                case 'Bb' :
                    $iLeftPosition += 66;
                    $iTopPosition += 40;
                    break;
                case 'B' :
                    $iLeftPosition += 66;
                    $iTopPosition += 79;
                    break;
            }
        }

        if($iOctave === 5)
        {
            $iLeftPosition += 66;
            switch($strNoteName)
            {
                case 'C' :
                    $iTopPosition += 119;
                    break;
                case 'C#' :
                case 'Db' :
                    $iTopPosition += 158;
                    break;
                case 'D' :
                    $iTopPosition += 198;
                    break;
                case 'D#' :
                case 'Eb' :
                    $iTopPosition += 237;
                    break;
                case 'E' :
                    if($bPreferFourthPos)
                    {
                        $iTopPosition += 277;
                    }
                    else
                    {
                         $iLeftPosition += 33;
                    }
                    break;
                case 'F' :
                    $iLeftPosition += 33;
                    $iTopPosition += 40;
                    break;
                case 'F#' :
                case 'Gb' :
                    $iLeftPosition += 33;
                    $iTopPosition += 79;
                    break;
                case 'G' :
                    $iLeftPosition += 33;
                    $iTopPosition += 119;
                    break;
                case 'G#' :
                case 'Ab' :
                    $iLeftPosition += 33;
                    $iTopPosition += 158;
                    break;
                case 'A' :
                    $iLeftPosition += 33;
                    $iTopPosition += 198;
                    break;
                case 'A#' :
                case 'Bb' :
                    $iLeftPosition += 33;
                    $iTopPosition += 237;
                    break;
                case 'B' :
                    $iLeftPosition += 33;
                    $iTopPosition += 277;
                    break;
            }
        }

        return '
        <div id="ViolinFingerBoard">
            <img src="/img/game/start-position/position-marker.png" style="position: absolute;top:'.$iTopPosition.'px;left:'.$iLeftPosition.'px;" alt="Finger start position" />
        </div>
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
    public function RenderStartPosition($cInstrument, $iOctave, $strNoteName, $bPreferFourthPos = false)
    {

        $strPositionIllustration = '';
        switch($cInstrument)
        {
            case Illustrations::Instrument_Violin :
                $strPositionIllustration =  $this->ViolinFirstPosIllustration($iOctave, $strNoteName, $bPreferFourthPos);
                break;
        }

        return $strPositionIllustration;
    }
}
?>