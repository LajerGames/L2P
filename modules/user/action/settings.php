<?php
// Validate
if($oUserSettingsForm->Validate($_POST))
{
    // Initialize userdata
    $iConcertPitch  = intval($_POST['concert_pitch']);
    $iColoredNoted  = intval($_POST['color_nodes']);
    $strLanguage    = $_POST['language'] == 'da-DK' ? 'da-DK' : 'en-US';
    $iUserID        = intval($_SESSION['UserObject']->id);

    // Create update array
    $arrSettings = array(
        'concert_pitch' => $iConcertPitch,
        'colored_notes' => $iColoredNoted
    );

    $oSql->Update('users_settings', $arrSettings, 'user_id = '.$iUserID, 'Bruger ('.$iUserID.') opdaterede sine settings');

    SetLanguageCookie($strLanguage);

    $oUserHandler->SetUserSession($iUserID);

    Redirect(HTTP_PROJECT_ROOT);
}
?>