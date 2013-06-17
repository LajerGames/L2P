<?php
// Validate
if($oUserSettingsForm->Validate($_POST))
{
    // Initialize userdata
    $iConcertPitch  = intval($_POST['concert_pitch']);
    $iColoredNoted  = intval($_POST['color_nodes']);
    $iColoredNoted  = $iColoredNoted === 1 ? 1 : 0;
    $strLanguage    = $_POST['language'] == 'da-DK' ? 'da-DK' : 'en-US';
    $iKiddieMode    = intval($_POST['kiddie_mode']);
    $iKiddieMode    = $iKiddieMode === 1 ? 1 : 0;
    $iCountDown     = intval($_POST['countdown_time']);
    $iCountDown     = ($iCountDown < 1 || $iCountDown > 10) ? 3 : $iCountDown;
    $iMetronome     = intval($_POST['metronome']);
    $iMetronome     = $iMetronome === 1 ? 1 : 0;
    $iUserID        = intval($_SESSION['UserObject']->id);

    // Create update array
    $arrSettings = array(
        'concert_pitch'     => $iConcertPitch,
        'colored_notes'     => $iColoredNoted,
        'kiddie_mode'       => $iKiddieMode,
        'countdown_time'    => $iCountDown,
        'metronome'         => $iMetronome
    );

    $oSql->Update('users_settings', $arrSettings, 'user_id = '.$iUserID, 'Bruger ('.$iUserID.') opdaterede sine settings');

    SetLanguageCookie($strLanguage);

    $oUserHandler->SetUserSession($iUserID);

    Redirect(HTTP_PROJECT_ROOT);
}
?>