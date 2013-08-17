<?php
// Get data
$strDifficulty      = $_POST['difficulty'];
$strSpeed           = $_POST['speed'];
$strPulse           = $_POST['pulse'];
$strDuration        = $_POST['duration'];
$strLowestNote      = $_POST['lowest_note'];
$strLowestOctave    = intval($_POST['lowest_octave']);
$strHighestNote     = $_POST['highest_note'];
$strHighestOctave   = intval($_POST['highest_octave']);
$strKey             = $_POST['key'];

//printr(GetMusicKeys($oLang));

// Now make a new instance of the SongGenerator
$oSongGenerator = new SongGenerator($oSql);

# Difficulty
if($strDifficulty === SongGenerator::Difficulty_Easy ||$strDifficulty === SongGenerator::Difficulty_Medium || $strDifficulty === SongGenerator::Difficulty_Hard)
{
    $oSongGenerator->cDifficulty    = $strDifficulty;
}

# Speed
if($strSpeed === SongGenerator::Speed_Slow ||$strSpeed === SongGenerator::Speed_Medium || $strSpeed === SongGenerator::Speed_Fast)
{
    $oSongGenerator->cSpeed         = $strSpeed;
}

# Pulse
if($strPulse === SongGenerator::Pulse_TwoFourths ||$strPulse === SongGenerator::Pulse_ThreeFourths || $strPulse === SongGenerator::Pulse_FourFourths || $strPulse === SongGenerator::Pulse_FiveFourths || $strPulse === SongGenerator::Pulse_SixFourths)
{
    $oSongGenerator->cPulse         = $strPulse;
}

# Duration
if($strDuration === SongGenerator::Duration_Short ||$strDuration === SongGenerator::Duration_Medium || $strDuration === SongGenerator::Duration_Long)
{
    $oSongGenerator->cDuration      = $strDuration;
}

# Notes
$arrNotes   = GetNoteNamesArray();
$arrOctaves = GetOctavesArray();
if(in_array($strLowestNote, $arrNotes))
{
    $oSongGenerator->strLowestNote  = $strLowestNote;
}
if(in_array($strLowestOctave, $arrOctaves))
{
    $oSongGenerator->iLowestOctave  = $strLowestOctave;
}

if(in_array($strHighestNote, $arrNotes))
{
    $oSongGenerator->strHighestNote  = $strHighestNote;
}
if(in_array($strHighestOctave, $arrOctaves))
{
    $oSongGenerator->iHighestOctave  = $strHighestOctave;
}

# Key
$oSongGenerator->strGamekey = $strKey;

echo $oSongGenerator->GenerateSong();

exit;
?>
