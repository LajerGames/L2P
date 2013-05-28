<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: text/html; charset=utf-8");

$strPlaylists	= '';
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
	$strPlaylists	.= '
		<div data-playlist_id="'.$oPlaylist->iPlaylistID.'">'.(empty($oPlaylist->strPlaylistName) ? $oPlaylist->iPlaylistTimestamp : $oPlaylist->strPlaylistName).'</div>';
}

echo $strPlaylists;
?>
