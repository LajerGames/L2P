<?php
include($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header('Content-Type: application/json; charset=utf-8');


// Make sure user is logged in
if($_SESSION['UserObject']->id == 0)
{
    exit; // Don't proceed due to error
}

// JSON-encode the search
$strSearch	= json_encode($_GET['search']);
$strUUID	= '';

// We need to make sure, that we only use the generated UUID once pr user - therefore we make a check here and loop untill we have found a uniqe UUID
while(empty($strUUID))
{
	$strUUID	= substr(UUID(true), 0, 6);

	$rCheck		= $oSql->Select('
		SELECT
			users_statistics_search.id
		FROM
			users_statistics_search
		WHERE
			users_statistics_search.user_id	= '.$_SESSION['UserObject']->id.'
		 &&	users_statistics_search.uuid	= "'.$strUUID.'"
	');

	// If we found any rows with this UUID for this user, we empty the UUID and try again
	if($rCheck->num_rows > 0)
	{
		$strUUID	= '';
	}
}

// Insert the UUID
$oSql->Insert('users_statistics_search', array(
	'user_id'	=> $_SESSION['UserObject']->id,
	'uuid'		=> $strUUID,
	'search'	=> $strSearch
));

// Send back the UUID
echo json_encode(array(
	'uuid'	=> $strUUID
));
?>
