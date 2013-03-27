<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/0/l2p/include/config.php');
switch($_POST['mode'])
{
    case 'login' :
        // Get userdata
        $strUsername = $_POST['username'];
        $strPassword = md5($_POST['password']);

        // Check if user exist
        $rUser = $oSql->Select('
            SELECT
                id,
                username
            FROM
                users
            WHERE
                deleted     = 0
             && username    = "'.$strUsername.'" 
             && password    = "'.$strPassword.'" 
        ');

        if($rUser->num_rows == 1)
        {
            $oUser->SetUs
        }
        else
        {
            echo "FEJL... FAT";
        }
        break;
}
?>