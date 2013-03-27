<?php
// How many attemps does the user have at this?
$iEmailConfirmationAttempts = 5;

// Get userdata
$iUserID            = intval($_GET['uid']);
$strConfirmationPwd = $_REQUEST['confirmation'];

// Check if user wrote a confirmation password which matches the one connected to this user
$rCheckConfirmationPassword = $oSql->Select('
    SELECT
        id,
        username,
        email,
        email_confirmation_password,
        email_confirmation_attempts
    FROM
        users
    WHERE
        deleted                     = 0
     && id                          = '.$iUserID.'
     && email_confirmed             = 0
');

if($rCheckConfirmationPassword->num_rows > 0)
{
    $oCheckConfirmationPassword = $rCheckConfirmationPassword->fetch_object();

    // Check if user is allowed to login
    if($oCheckConfirmationPassword->email_confirmation_attempts < $iEmailConfirmationAttempts)
    {
        // Check if the user wrote the right confirmation password
        if(md5($strConfirmationPwd) == $oCheckConfirmationPassword->email_confirmation_password)
        {
            // Activate the user and log hin/her in
            $oSql->Update('users', array('email_confirmed' => 1), $oLogin->id, 'Email activated for user '.$oLogin->id);

            // Set user session
            $oUserHandler->SetUserSession($oCheckConfirmationPassword->id);

            Redirect(HTTP_PROJECT_ROOT);
        }
        else
        {
            // The user didn't write the right confirmation password

            // Add a counter to the bad email_confirmation_attempts and tell the user how many attempts he/she has got left
            $iEmailConfirmationAttemptsUsed = ++$oCheckConfirmationPassword->email_confirmation_attempts;

            $oSql->Update('users', array('email_confirmation_attempts' => $iEmailConfirmationAttemptsUsed), $iUserID, 'Email confirmation attempts counter added to userid '.$iUserID);

            $oConfirmEmail->ReturnField('confirmation_password')->SetValidationError($oLang->Get('activate_validation_activationkey'), true);
        }
    }
    else
    {
        // Generate activationkey
        $strActivationKey = substr(UUID(), 0, 6);

        // Update the activation key and reset the attempts used
        $arrConfirmation = array(
            'email_confirmation_password'   => md5($strActivationKey),
            'email_confirmation_attempts'   => 0
        );

        // Insert the user
        $oSql->Update('users', $arrConfirmation, $oCheckConfirmationPassword->id, 'User '.$oCheckConfirmationPassword->username.' recieved a new e-mail confirmation key due to too many wrong attempts');

        $arrConfirmationMailValues = array(
	        '#username#'                => $oCheckConfirmationPassword->username,
	        '#system#'                  => SYSTEM_NAME,
	        '#confirmation_anchortag#'  => '<a href="'.SYSETM_DOMANE.'user/confirm-email/?mode=activate&uid='.$iUserID.'&confirmation='.$strActivationKey.'">'.SYSETM_DOMANE.'user/confirm-email/?mode=activate&uid='.$iUserID.'&confirmation='.$strActivationKey.'</a>',
	        '#activationkey#'           => $strActivationKey
	    );

	    // Create variable for mailbody
        $strMailBody = $oLang->Get('activate_reconfirmation_mail');

        // Insert the values into the mail
        foreach($arrConfirmationMailValues as $strKey => $strValue)
        {
            $strMailBody = str_replace($strKey, $strValue, $strMailBody);
        }

        // Write a mail to the user
        $oUserHandler->SendConfirmationEmail($iUserID, $oLang->Get('activate_reconfirmation_mail_headline'), $strMailBody);
    }
}
else
{
	$oConfirmEmail->ReturnField('confirmation_password')->SetValidationError($oLang->Get('activate_validation_activationerror'), true);
}
?>
