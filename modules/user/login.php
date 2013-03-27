<?php
function ResetBadLoginCounters($iUserID, $oSql)
{
    $arrCounterReset = array(
        'bad_login_counter' => 0
    );
    $oSql->Update('users', $arrCounterReset, $iUserID, 'Bad login counter resat for user '.$iUserID);

    return;
}
?>