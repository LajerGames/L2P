<?php
function ResetBadLoginCounters($iUserID, $oSql)
{
	$arrCounterReset = array(
		'bad_login_counter' => 0
	);
	$oSql->Update('users', $arrCounterReset, $iUserID, 'Bad login counter resat for user '.$iUserID);

	return;
}
function ReplaceValues($iLoginAttempts, $strTimeToLogin, $oLang)
{
    // Create a array of keys and values to insert into the confirmationmail
    $arrValidationErrorValues = array(
        '#login_attempts#'  => $iLoginAttempts,
        '#block_time#'      => $strTimeToLogin
    );

    // Create variable for validation error
    $strValidationError = $oLang->Get('login_validation_attempts_exceeded');

    // Insert the values into the mail
    foreach($arrValidationErrorValues as $strKey => $strValue)
    {
        $strValidationError = str_replace($strKey, $strValue, $strValidationError);
    }

    return $strValidationError;
}

if($_POST['type'] === 'fb')
{
	$iFBID	= intval($_POST['user']['id']);

	$rCheck	= $oSql->Select('
		SELECT
			users.id
		FROM
			users
		WHERE
			users.fb_id	= '.$iFBID.'
	');
	if($rCheck->num_rows > 0)
	{
		$oLogin	= $rCheck->fetch_object();
		$oUserHandler->SetUserSession($oLogin->id);

		Redirect('/', true);
	}
	else
	{
		if(!empty($_SESSION['UserObject']))
		{
			unset($_SESSION['UserObject']);
			Redirect('/', true);
		}
		// Create the User
		else
		{
			$strFirstName	= $_POST['user']['first_name'];
			$strLastName	= $_POST['user']['last_name'];
			$strEmail		= $_POST['user']['email'];
			$strUsername	= $oUserHandler->GiefUsername($strFirstName.$strLastName);

        	// Create the user-array
			$arrUser	= array(
				'username'			=> $strUsername,
				'fb_id'				=> $iFBID,
				'email'				=> $strEmail,
				'email_confirmed'	=> 1,
				'first_name'		=> $strFirstName,
				'last_name'			=> $strLastName
			);

		    // Insert the user
			$iUserID = $oSql->Insert('users', $arrUser, 'User '.$oSql->RealEscape($strUsername).' created via FB');

	        // We need to insert a record for defauls user settings
	        $arrUserSettings = array(
	            'user_id'   => $iUserID
	        );

	        $oSql->Insert('users_settings', $arrUserSettings);

	        // Log the user in
			$oUserHandler->SetUserSession($iUserID);

			// Redirect to main page
			Redirect('/', true);
		}
	}
}
else
{
	// Vi tjekker om formen består automatisk validering
	if($oLoginForm->Validate($_POST))
	{
		// Get userdata
		$strUsername        = $_POST['username'];
		$strPassword        = md5($_POST['password']);

		// How long time do we delay a login if user has been bruteforced
		$iLoginDelayMinutes         = 2;

		// How many login attempts does a user have?
		$iLoginAttempts             = 10;

		// Lifetime of a counter in minutes
		$iCounterLifetimeMinutes    = 10;

		// First of all we need to check if the username exists - if it does we'll get the password hash out for checking later
		$rLogin = $oSql->Select('
			SELECT
				users.id,
				users.username,
				users.email,
				users.email_confirmed,
				users.password,
				users.bad_login_counter,
				users.login_counter_expire,
				users.login_delay
			FROM
				users
			WHERE
				users.deleted     = 0
			 && users.username    = "'.$strUsername.'"
		');

		if($rLogin->num_rows == 1)
		{
			$oLogin = $rLogin->fetch_object();

			// Okay, now we know that the username is real - check if user has a logindelay
			// Make variable for the clock 2 minutes ago
			$strTwoMinutesAgo = date('Y-m-d H:i:s', strtotime('-'.$iLoginDelayMinutes.' MINUTES'));
			if($oLogin->login_delay > $strTwoMinutesAgo)
			{
				// Okay, this user has a login delay throw him the error

				// First let's count how many minutes and seconds until this user is able to login again
				$iUNIXTimeTwoMinutesAgo = strtotime($strTwoMinutesAgo);
				$iUNIXTimeLoginDelay = strtotime($oLogin->login_delay);

				$iSecondsTillLogin = $iUNIXTimeLoginDelay-$iUNIXTimeTwoMinutesAgo;

				// Create the final data
				$iMinutesTillLogin = floor($iSecondsTillLogin/60);
				$iSecondsTillLogin = $iSecondsTillLogin % 60;

				// Because I'm such a perfectionist I want the true nickname after each timetype, so if it's 1 minute it's not called 1 minutes
				$strMinutesNickName = $iMinutesTillLogin == 1 ? $oLang->Get('time_minute') : $oLang->Get('time_minutes');
				$strSecondsNickName = $iSecondsTillLogin == 1 ? $oLang->Get('time_second') : $oLang->Get('time_seconds');

				$strTimeToLogin = '';
				if($iSecondsTillLogin == 0)
				{
					$strTimeToLogin = $iMinutesTillLogin . ' ' . $strMinutesNickName;
				}
				elseif($iMinutesTillLogin == 0)
				{
					$strTimeToLogin = $iSecondsTillLogin . ' ' . $strSecondsNickName;
				}
				else
				{
					$strTimeToLogin = $iMinutesTillLogin . ' ' . $strMinutesNickName . ', ' . $iSecondsTillLogin . ' ' . $strSecondsNickName;
				}

				// put a record into this users usercomments
				$arrUserComment = array(
					'user_id'       => $oLogin->id,
					'headline'      => 'Login after block',
					'comment'       => 'This user tried to login despite the '.$iLoginDelay.' minutes logindelay',
					'comment_type'  => 'note'
				);

				$oSql->Insert('users_comments', $arrUserComment, 'Note inserted at user '.$oUserName->id);

				// Throw the error
				$oLoginForm->ReturnField('username')->SetValidationError(ReplaceValues($iLoginAttempts, $strTimeToLogin, $oLang), false);
			}
			else
			{
				// Now check if the password is correct, if it's not then we'll add a bad login counter
				if($oLogin->password != $strPassword)
				{
					// So, we know that the user exists but he/she wrote the wrong password!
					// Let's check if this is the $iLoginAttempts'th time user has written his/her password wrong
					if($oLogin->bad_login_counter == $iLoginAttempts)
					{
						// Okay - user will now be delayed for $iLoginDelayMinutes minutes
						$arrSetLoginDelay = array(
							'bad_login_counter' => 0,
							'login_delay' => date('Y-m-d H:i:s')
						);

						$oSql->Update('users', $arrSetLoginDelay, $oLogin->id, 'User has been given logindelay');

	                    // Throw the error
	                    $oLoginForm->ReturnField('username')->SetValidationError(ReplaceValues($iLoginAttempts, '2 '.$oLang->Get('time_minutes'), $oLang), false);
					}
					else
					{
						// Okay, it seems that user does exist, he/she wrote the wrong password but has not enough counters to accuire a logindelay
						// Check if the counters on the user has expired
						$strDatetimeCounterLifetimeAgo = date('Y-m-d H:i:s', strtotime('-'.$iCounterLifetimeMinutes.' MINUTES'));
						if($oLogin->login_counter_expire > $strDatetimeCounterLifetimeAgo)
						{
							// Counters has not yet expired, add one to the bunch and renew the expire time
							$arrAddCounter = array(
								'bad_login_counter'     => ++$oLogin->bad_login_counter,
								'login_counter_expire'  => date('Y-m-d H:i:s', strtotime('+'.$iCounterLifetimeMinutes.' MINUTES'))
							);
						}
						else
						{
							// Counters has expires - just save one counter
							$arrAddCounter = array(
								'bad_login_counter'     => 1,
								'login_counter_expire'  => date('Y-m-d H:i:s', strtotime('+'.$iCounterLifetimeMinutes.' MINUTES'))
							);
						}

						$oSql->Update('users', $arrAddCounter, $oLogin->id, 'One more logincounter has been added to');

						// Tell the user that a loginerror occured
						$oLoginForm->ReturnField('username')->SetValidationError($oLang->Get('login_validation_incorrect_login'), false);
					}
				}
				else
				{
					// We found a user the bad_login_counter
					ResetBadLoginCounters($oLogin->id, $oSql);

					// Check if user email is confirmed
					if($oLogin->email_confirmed == 1)
					{
						$oUserHandler->SetUserSession($oLogin->id);

						Redirect('/');
					}
					else
					{
						Redirect(HTTP_PROJECT_ROOT.'user/confirm-email/?uid='.$oLogin->id);
					}
				}
			}
		}
		else
		{
			// The username didn't even exist in the database
			$oLoginForm->ReturnField('username')->SetValidationError($oLang->Get('login_validation_incorrect_login'), false);
		}
	}
}
?>