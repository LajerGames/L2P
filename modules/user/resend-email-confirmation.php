<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

switch($_GET['mode'])
{
	case 'send' :

		break;
}
// Get userid
$iUserID = intval($_GET['user_id']);

echo $oPageRenderer->Renderpage($oLang, '
'.$oFormRenderer->FormStart('send', null, false).'
'.$oFormRenderer->TextField('user_id', $iUserID, null, 'hidden').'
'.$oFormRenderer->TextField('confirmation_password', '', 'Aktiveringsnøgle').'
'.$oFormRenderer->FormEnd(true, 'Aktiver').'
');
?>