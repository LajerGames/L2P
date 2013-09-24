<?php
// Validate
if($oGameCreateForm->Validate($_POST))
{
	$strGameData	= $_POST['data'];
	$strTitleDK		= $_POST['dk_title'];
	$strTitleEN		= $_POST['en_title'];
	$strPermlink	= $_POST['permlink'];
	$strStatus		= $_POST['status'];
	$iGenreID		= intval($_POST['genre']);

	$arrGameData	= json_decode($strGameData, true);
	$iDefaultOctave	= $arrGameData[1][0];

	// Find the first octave
	$iFirstOctave	= -1;
	foreach($arrGameData[2] as $arrTactInfo)
	{
		if($iFirstOctave !== -1)
		{
			break;
		}
		foreach($arrTactInfo[1] as $arrNoteInfo)
		{
			if(!is_null($arrNoteInfo[1]))
			{
				$iFirstOctave	= $iDefaultOctave + $arrNoteInfo[2];
				break;
			}
		}
	}

	$strStartingNote	= '';
	foreach($arrGameData[2] as $arrTacts)
	{
	    foreach($arrTacts[1] as $arrNote)
	    {
	        if($arrNote[1] !== null)
	        {
	            $strStartingNote = $arrNote[1];
	            break;
	        }
	    }
	    break;
	}

	// If the default Octave isn't the first octave, we need to recalc the relative octaves
	if($iDefaultOctave !== $iFirstOctave)
	{
		$arrGameData[1][0]	= $iFirstOctave;
		$iOctaveDiff		= $iDefaultOctave - $iFirstOctave;

		foreach($arrGameData[2] as $iTactNo => $arrTactInfo)
		{
			foreach($arrTactInfo[1] as $iNoteNo => $arrNoteInfo)
			{
				if(!is_null($arrNoteInfo[1]))
				{
					$arrGameData[2][$iTactNo][1][$iNoteNo][2]	+= $iOctaveDiff;
				}
			}
		}

		$strGameData	= json_encode($arrGameData);
	}

	if($oPathGame->iGameID === 0)
	{
		$iGameID		= $oSql->Insert('games', array(
			'title'			=> $strTitleEN,
			'permlink'		=> $strPermlink,
			'game'			=> $strGameData,
			'type'			=> 'song',
			'octave'		=> $iFirstOctave,
			'start_tone'	=> $strStartingNote,
			'status'		=> $strStatus,
			'availability'	=> 'users'
		));
		$oSql->Insert('languages', array(
			'type'		=> 'game_title',
			'lang'		=> 'da-DK',
			'parent_id'	=> $iGameID,
			'name'		=> $strTitleDK
		));
		$oSql->Insert('languages', array(
			'type'		=> 'game_title',
			'lang'		=> 'en-US',
			'parent_id'	=> $iGameID,
			'name'		=> $strTitleEN
		));
		$oSql->Insert('games_titles', array(
			'lang'		=> 'da-DK',
			'game_id'	=> $iGameID,
			'title'		=> $strTitleDK
		));
		$oSql->Insert('games_titles', array(
			'lang'		=> 'en-US',
			'game_id'	=> $iGameID,
			'title'		=> $strTitleEN
		));
		$oSql->Insert('games_genres', array(
			'game_id'	=> $iGameID,
			'genre_id'	=> $iGenreID
		));
	}
	else
	{
		$oSql->Update('games', array(
			'title'			=> $strTitleEN,
			'permlink'		=> $strPermlink,
			'game'			=> $strGameData,
			'octave'		=> $iFirstOctave,
			'start_tone'	=> $strStartingNote,
			'status'		=> $strStatus
		), $oPathGame->iGameID);

		$oSql->Insert('languages', array(
			'name'		=> $strTitleDK
		), 'type = "game_title" && lang = "da-DK" && parent_id = '.$iGameID);
		$oSql->Insert('languages', array(
			'name'		=> $strTitleEN
		), 'type = "game_title" && lang = "en-US" && parent_id = '.$iGameID);
		$oSql->Delete('games_genres', 'game_id = '.$iGameID);
		$oSql->Insert('games_genres', array(
			'game_id'	=> $iGameID,
			'genre_id'	=> $iGenreID
		));
	}

	Redirect('/game/'.$strPermlink.'/');
}
?>
