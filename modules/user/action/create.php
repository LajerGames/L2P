<?php
// Initialize userinputs
$strUsername        = $_POST['username'];
$strEmail           = $_POST['email'];
$strEmailRepeat     = $_POST['email_repeat'];
$strPassword        = $_POST['password'];
$strPasswordRepeat  = $_POST['password_repeat'];

// VALIDATE USERDATA:
if($oCreateUserForm->Validate($_POST))
{
    # Username
    // Does the username already exist?
    $rUsername = $oSql->Select('
        SELECT
            users.id
        FROM
            users
        WHERE
            users.deleted    = 0
         && users.username    LIKE "'.$oSql->RealEscape($strUsername).'"
    ');

    if($rUsername->num_rows > 0)
    {
        $oCreateUserForm->ReturnField('username')->SetValidationError($oLang->Get('create_user_validation_username_unavailable'), false);
    }

    # E-mail
    // Check if e-mail fields have the same data in them
    if($strEmail !== $strEmailRepeat)
    {
        $oCreateUserForm->ReturnField('email')->SetValidationError('', false);
    }
    // Check if this e-mail address is already used by another user
    else
    {
        $rEmail = $oSql->Select('
            SELECT
                users.id
            FROM
                users
            WHERE
                users.deleted    = 0
             && users.email      = "'.$oSql->RealEscape($strEmail).'"
        ');

        if($rEmail->num_rows > 0)
        {
            $oCreateUserForm->ReturnField('email')->SetValidationError('', false);
        }
    }

    # Password
    // Check if typed passwords match eachother
    if($strPassword !== $strPasswordRepeat)
    {
        $oCreateUserForm->ReturnField('password')->SetValidationError('');
    }

    if($oCreateUserForm->bIsValid)
    {
        // Generate activationkey
        $strActivationKey = substr(UUID(), 0, 6);

        // Create the user-array
        $arrUser = array(
            'username'                      => $oSql->RealEscape($strUsername),
            'email'                         => $oSql->RealEscape($strEmail),
            'password'                      => md5($strPassword),
            'email_confirmation_password'   => md5($strActivationKey),
            'last_login_ip'                 => $_SERVER['REMOTE_ADDR']
        );

        // Insert the user
        $iUserID = $oSql->Insert('users', $arrUser, 'User '.$oSql->RealEscape($strUsername).' created');

        // We need to insert a record for defauls user settings
        $arrUserSettings = array(
            'user_id'   => $iUserID
        );

        $oSql->Insert('users_settings', $arrUserSettings);

        // Create a array of keys and values to insert into the confirmationmail
        $arrConfirmationMailValues = array(
            '#username#'                => $strUsername,
            '#system#'                  => SYSTEM_NAME,
            '#confirmation_anchortag#'  => '<a href="'.SYSETM_DOMANE.'user/confirm-email/?mode=activate&uid='.$iUserID.'&confirmation='.$strActivationKey.'">'.SYSETM_DOMANE.'user/confirm-email/?mode=activate&uid='.$iUserID.'&confirmation='.$strActivationKey.'</a>',
            '#activationkey#'           => $strActivationKey,
            '#password#'                => $strPassword
        );

        // Create variable for mailbody
        $strMailBody = $oLang->Get('create_user_confirmation_mail');

        // Insert the values into the mail
        foreach($arrConfirmationMailValues as $strKey => $strValue)
        {
            $strMailBody = str_replace($strKey, $strValue, $strMailBody);
        }
        $oUserHandler->SendConfirmationEmail($iUserID, $oLang->Get('create_user_confirmation_mail_headline'), $strMailBody);

        Redirect(HTTP_PROJECT_ROOT.'user/confirm-email/?uid='.$iUserID);
    }
}
?>
