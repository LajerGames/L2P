<?php
header("Content-Type: application/json; charset=utf-8");
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

$iPlaylistID	    = intval($_POST['playlist_id']);
$strPlaylistName    = $_POST['playlist_name'];
$arrGames		    = $_POST['games'];

// Is the user logged in?
if($_SESSION['UserObject']->id > 0)
{
    // Delete the playlist in order to create new one... Both Mads and I (John) agreed on the 22th of march 2013, that this was the best way of updating the playlists... I cannot be blamed alone!
    $oSql->Kill('users_playlists',      'timestamp = '.$iPlaylistID);
    $oSql->Kill('users_playlist_songs', 'timestamp = '.$iPlaylistID);

    // Save the playlist
    $arrPlaylist = array(
        'timestamp' => $iPlaylistID,
        'user_id'   => $_SESSION['UserObject']->id,
        'name'      => $oSql->RealEscape($strPlaylistName)
    );

    $iPlaylistRecordID = $oSql->Insert('users_playlists', $arrPlaylist, 'Playlist saved');

    foreach($arrGames as $strPermlink)
    {
        $arrPermlink = explode('/', $strPermlink);

        // Get SongID from the songs in the playlist
        $oGetSong = $oSql->SelectSingleObject('
            SELECT
                games.id AS iGameID
            FROM
                games
            WHERE
                games.deleted   = 0
             && games.permlink  = "'.$oSql->RealEscape($arrPermlink[2]).'"
        ');

        // Insert songs into the playlist
        $arrPlaylistSong = array(
            'timestamp'     => $iPlaylistID,
            'playlist_id'   => $iPlaylistRecordID,
            'song_id'       => $oGetSong->iGameID
        );

        $oSql->Insert('users_playlist_songs', $arrPlaylistSong);
    }
}

?>
