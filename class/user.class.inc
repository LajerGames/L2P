<?php
class UserHandler
{
	private $oSql;

	public function __construct($oSql)
	{
		$this->oSql = $oSql;
	}

	public function SetUserSession($iUserID)
	{
		// Fetch data to put into userobject
		$rUserInfo = $this->oSql->Select('
			SELECT
				users.id,
				users.username,
				users.email,
				users.fb_id,
				users.first_name,
				users.last_name,
				users.points,
				users.games_started,
				users.games_finished,
                users.game_time,
				users.expire,
				users.is_god,
				users_settings.concert_pitch,
				users_settings.colored_notes,
                users_settings.kiddie_mode,
                users_settings.countdown_time,
				users_settings.metronome
			FROM
				users
			LEFT JOIN
				users_settings ON
					users_settings.user_id = users.id
			WHERE
				users.id = '.$iUserID.'
		');

		$_SESSION['UserObject'] = $rUserInfo->fetch_object();

		return;
	}
	public function SendConfirmationEmail($iUserID, $strMailHeadline = '', $strEmailContent = '')
	{
		$rUserdata = $this->oSql->Select('
			SELECT
				users.username,
				users.email
			FROM
				users
			WHERE
				users.id = '.$iUserID.'
		');

		$oUserdata = $rUserdata->fetch_object();

		if(empty($strEmailContent))
		{
			$strEmailContent = 'This is default e-mail content';
		}
		require_once(SERVER_PROJECT_ROOT_LIBS.'PHPMailer_5.2.2-beta2/class.phpmailer.php');
		$oMail	= new phpmailer();
		$oMail->IsSMTP();
		$oMail->IsHTML(true); // set email format to HTML

		$oMail->Host		= 'smtp.live.com';
		$oMail->SMTPDebug	= 1;
		$oMail->SMTPAuth	= true;
		$oMail->Port		= 25;
		$oMail->SMTPSecure	= 'tls';
		$oMail->Username	= 'noreply@magic-tune.com';
		$oMail->Password	= 'mt2013!!';

		$oMail->CharSet     = 'UTF-8';
		$oMail->SetFrom(SYSTEM_MAIL, SYSTEM_NAME);

		$oMail->AddAddress($oUserdata->email, $oUserdata->username);
		$oMail->Subject     = $strMailHeadline.' '.SYSTEM_NAME;
		$oMail->Body        = $strEmailContent;
		$oMail->Send();

		return;
	}
    /**
    * Gives your an available username
    *
    * @param string $strUsername
    * @param int $iAttemptNo - Should just be left blank
    */
    public function GiefUsername($strUsername, $iAttemptNo = 0)
    {
        global $oSql;
        // Make sure there are no spaces in the username
        $strUsername = str_replace(' ', '', $strUsername);

        // Append attempt no.
        $strUsernameBid = $iAttemptNo > 0 ? $strUsername.$iAttemptNo : $strUsername;

        // Check DB for this username
        $rExistingUsername = $oSql->Select('
            SELECT
                users.id
            FROM
                users
            WHERE
                users.deleted   = 0
             && users.username  = "'.$strUsernameBid.'"
        ');

        if($rExistingUsername->num_rows > 0)
        {
            $iAttemptNo++;
            $strUsernameBid = $this->GiefUsername($strUsername, $iAttemptNo);
        }

        return $strUsernameBid;
    }
}
?>