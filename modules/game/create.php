<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

#Hack 1
if(!isset($oGameCreateForm))
{
    $arrOctaves = array(
        1 => 1,
        2 => 2,
        3 => 3,
        4 => 4,
        5 => 5,
        6 => 6,
        7 => 7
    );

    $arrStatus = array(
        'buggy'         => 'buggy',
        'pending'       => 'pending',
        'developer-fun' => 'developer-fun'
    );

    $strLang = $_COOKIE['country_code'] == 'da-DK'? 'da-DK' : 'en-US';

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

    $oGameCreateForm = new Form('game_create');
    $oGameCreateForm->TextField('dk_title', '', $oLang->Get('game_create_dktitle'), new FormFieldValidation(true, 'PATTERN_TITLE', $oLang->Get('game_create_validation_title'), false), null, false, array('maxlength' => 30));
    $oGameCreateForm->TextField('en_title', '', $oLang->Get('game_create_entitle'), new FormFieldValidation(true, 'PATTERN_TITLE', $oLang->Get('game_create_validation_title'), false), null, false, array('maxlength' => 30));
    $oGameCreateForm->TextField('permlink', '', $oLang->Get('game_create_permlink'), new FormFieldValidation(true, 'PATTERN_TITLE', $oLang->Get('game_create_validation_title'), false), null, false, array('maxlength' => 30));
    $oGameCreateForm->SelectBox('octave', '', $arrOctaves, $oLang->Get('game_create_octave'));
    $oGameCreateForm->SelectBox('status', 'pending', $arrStatus, $oLang->Get('game_create_status'));
    $oGameCreateForm->SelectBox('genre', '', $arrGenres, $oLang->Get('game_create_genre'));
}

$strBody    = $oGameCreateForm->RenderFields(false, null, null, true);

$strDialog  = $oPageRenderer->RenderDialogAction($oTemplate, $oLang->Get('game_create_window_title'), $strBody, '#999', $oLang->Get('global_button_save'));

if(IS_DIALOG)
{
    header('Content-type: application/json; charset=utf-8');
    echo $strDialog;
}
?>