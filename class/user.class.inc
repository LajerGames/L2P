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
                users.first_name,
                users.last_name,
                users.points,
                users.games_started,
                users.games_finished,
                users.game_time,
                users_settings.concert_pitch,
                users_settings.colored_notes
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
        $oMail = new phpmailer();

        $oMail->From        = SYSTEM_MAIL;
        $oMail->FromName    = SYSTEM_NAME;
        $oMail->AddAddress($oUserdata->email, $oUserdata->username);
        $oMail->IsHTML(true); // set email format to HTML
        $oMail->CharSet     = 'UTF-8';

        $oMail->Subject     = $strMailHeadline.' '.SYSTEM_NAME;
        $oMail->Body        = $strEmailContent;
        $oMail->Send();

        return;
    }
}
?>