<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

#Hack 1
if(!isset($oGameCreateForm))
{
	$strLang = $_COOKIE['country_code'] == 'da-DK'? 'da-DK' : 'en-US';

	$strGameData	= $_POST['data'];

	$arrStatus = array(
	    'buggy'         => 'buggy',
	    'pending'       => 'pending',
	    'developer-fun' => 'developer-fun'
	);

	$rGenres = $oSql->Select('
	    SELECT
	        games_genres.id     AS iGenreID,
	        languages.name      AS strGenreName
	    FROM
	        games_genres
	    RIGHT JOIN
	        languages ON
	            languages.deleted   = 0
	         && languages.type      = "genre_name"
	         && languages.lang      = "'.$strLang.'"
	         && languages.parent_id = games_genres.id
	    WHERE
	        games_genres.deleted    = 0
	');

	$arrGenres = array();
	while($oGenres = $oSql->FetchObject($rGenres))
	{
	    $arrGenres[$oGenres->iGenreID] = $oGenres->strGenreName;
	}

    $oGameInfo	= $oSql->SelectSingleObject('
		SELECT
			games.permlink			AS strPermlink,
			games.status			AS strStatus,
			games_genres.genre_id	AS iGenreID,
			(
				SELECT
					languages.name
				FROM
					languages
				WHERE
					languages.deleted	= 0
				 &&	languages.type		= "game_title"
				 &&	languages.parent_id	= games.id
				 &&	languages.lang		= "da-DK"
			)	 					AS strTitleDK,
			(
				SELECT
					languages.name
				FROM
					languages
				WHERE
					languages.deleted	= 0
				 &&	languages.type		= "game_title"
				 &&	languages.parent_id	= games.id
				 &&	languages.lang		= "en-US"
			)	 					AS strTitleEN
		FROM
			games
		LEFT JOIN
			games_genres ON
				games_genres.deleted	= 0
			 &&	games_genres.game_id	= games.id
		WHERE
			games.deleted				= 0
		 &&	games.id					= '.$oPathGame->iGameID.'
    ');

    $oGameCreateForm = new Form('game_create');
    $oGameCreateForm->TextField('data', $strGameData, '', null, 'hidden');
    $oGameCreateForm->TextField('dk_title', $oGameInfo->strTitleDK, $oLang->Get('game_create_dktitle'), new FormFieldValidation(true, PATTERN_TITLE_SPACE, $oLang->Get('game_create_validation_title'), false), null, false, array('maxlength' => 30));
    $oGameCreateForm->TextField('en_title', $oGameInfo->strTitleEN, $oLang->Get('game_create_entitle'), new FormFieldValidation(true, PATTERN_TITLE_SPACE, $oLang->Get('game_create_validation_title'), false), null, false, array('maxlength' => 30));
    $oGameCreateForm->TextField('permlink', $oGameInfo->strPermlink, $oLang->Get('game_create_permlink'), new FormFieldValidation(true, PATTERN_TITLE, $oLang->Get('game_create_validation_title'), false), null, false, array('maxlength' => 30));
    $oGameCreateForm->SelectBox('status', empty($oGameInfo->strStatus) ? 'pending' : $oGameInfo->strStatus, $arrStatus, $oLang->Get('game_create_status'));
    $oGameCreateForm->SelectBox('genre', $oGameInfo->iGenreID, $arrGenres, $oLang->Get('game_create_genre'));
}

$strBody    = $oGameCreateForm->RenderFields(false, null, null, true);

$strDialog  = $oPageRenderer->RenderDialogAction($oTemplate, $oLang->Get('game_create_window_title'), $strBody, '#B73535', $oLang->Get('global_button_save'));

if(IS_DIALOG)
{
    header('Content-type: application/json; charset=utf-8');
    echo $strDialog;
}
?>