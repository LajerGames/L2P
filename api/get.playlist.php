<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

$arrPlaylists	= array();
$rPlaylists		= $oSql->Select('
	SELECT
		users_playlists.id			AS iPlaylistID,
		users_playlists.name		AS strPlaylistName,
		users_playlists.timestamp	AS iPlaylistTimestamp
	FROM
		users_playlists
	WHERE
		users_playlists.deleted	= 0
	 &&	users_playlists.user_id	= '.$_SESSION['UserObject']->id.'
');
while($oPlaylist = $oSql->FetchObject($rPlaylists))
{
	$arrPlaylists[$oPlaylist->iPlaylistID]	= empty($oPlaylist->strPlaylistName) ? $oPlaylist->iPlaylistTimestamp : $oPlaylist->strPlaylistName;
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode($arrPlaylists);
?>
