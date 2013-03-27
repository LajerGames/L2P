<?php
// Always have access to config file
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

exit;
$rNumbers = $oSql->Select('
	SELECT
		id,
		game,
		type,
		octave
	FROM
		games
	WHERE
		deleted = 0
');

while($oNumbers = mysqli_fetch_object($rNumbers))
{
	$iID = $oNumbers->id;
	$strGame = $oNumbers->game;

	// Manipulate game
	$arrGame = json_decode($strGame);

	// Now find the first octave we meet and make this our main octave
	$iOctave = 0;
	foreach($arrGame[1] as $iEntry => $arrTact)
	{
		foreach($arrTact as $iTactEntry => $arrNotes)
		{
			(array)$arrNotes;
			foreach($arrNotes as $iNoteEntry => $arrNoteSettings)
			{
				if($arrNoteSettings[2] > 0)
				{
					$iOctave = $arrNoteSettings[2];
					break;
				}
			}
			if($iOctave > 0)
			{
				break;
			}
		}
		if($iOctave > 0)
		{
			break;
		}
	} // And that's how we find an apropriate octave bitches!

	// Now run through all of the tacts and substract the octave we found from the actual octave of the particular note
	if($iOctave > 0)
	{
		foreach($arrGame[1] as $iEntry => $arrTact)
		{
			foreach($arrTact as $iTactEntry => $arrNotes)
			{
				if(count($arrNotes) > 0)
				{
					foreach($arrNotes as $iNoteEntry => $arrNoteSettings)
					{
						if($arrNoteSettings[2] != 0 && $arrNoteSettings[2] != 0)
						{
							$arrGame[1][$iEntry][$iTactEntry][$iNoteEntry][2] = ($arrGame[1][$iEntry][$iTactEntry][$iNoteEntry][2] - $iOctave);
						}
					}
				}
			}
		}
	}

	// Splice the octave into the game :)
	array_splice($arrGame, 1, 0, $iOctave);

 	$arrGame[1] = array(0 => $arrGame[1]);
	$strJsonGameString = $oSql->RealEscape(json_encode($arrGame));

	$oSql->Update('games', array('game' => $strJsonGameString), $iID);
}
?>
