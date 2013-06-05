<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: text/html; charset=utf-8");

$strPlaylists	= '
	<div data-playlist_id="new"><input type="text" placeholder="'.$oLang->Get('browse_playlist_add').'" /> <img src="/img/icons/save.svg" data-action="save" /></div>
';
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
		<div data-playlist_id="'.$oPlaylist->iPlaylistTimestamp.'">'.(empty($oPlaylist->strPlaylistName) ? $oPlaylist->iPlaylistTimestamp : $oPlaylist->strPlaylistName).' <img src="/img/icons/pen.svg" data-action="edit" /></div>
	';
}

echo $strPlaylists;
?>
