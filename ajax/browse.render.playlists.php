<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');
header("Content-Type: text/html; charset=utf-8");

$strPlaylists	= '
	<div data-playlist_id="new"><input type="text" placeholder="'.$oLang->Get('browse_playlist_add').'" /> <img src="/img/icons/save.svg" data-action="save" /></div>
';

$strStorageData	= $oSql->SelectSingleValue('
	SELECT
		storage.data		AS strStorageData
	FROM
		storage
	WHERE
		storage.deleted		= 0
	 &&	storage.user_id		= '.$_SESSION['UserObject']->id.'
	 &&	storage.namespace	= "PlayList"
');
if(!empty($strStorageData))
{
	$arrStorageData	= json_decode($strStorageData, true);
	if(sizeof($arrStorageData) > 0)
	{
		foreach($arrStorageData as $iPlaylistID => $arrPlaylist)
		{
			$strPlaylists	.= '
				<div data-playlist_id="'.$iPlaylistID.'">'.(empty($arrPlaylist['name']) ? $iPlaylistID : $arrPlaylist['name']).' <img src="/img/icons/pen-black.svg" data-action="edit" /></div>
			';
		}
	}
}
/*
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
	ORDER BY
		users_playlists.timestamp DESC
');
while($oPlaylist = $oSql->FetchObject($rPlaylists))
{
	$strPlaylists	.= '
		<div data-playlist_id="'.$oPlaylist->iPlaylistTimestamp.'">'.(empty($oPlaylist->strPlaylistName) ? $oPlaylist->iPlaylistTimestamp : $oPlaylist->strPlaylistName).' <img src="/img/icons/pen-black.svg" data-action="edit" /></div>
	';
}*/

echo $strPlaylists;
?>
