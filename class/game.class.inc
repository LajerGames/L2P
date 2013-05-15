<?php
class Game
{
	private $oSql;

	public function __construct($oSql)
	{
		$this->oSql = $oSql;
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