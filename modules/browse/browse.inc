<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.php');

// Require the browse class
require_once(SERVER_PROJECT_ROOT_CLASS_MODULE.'browse.class.inc');

// Distinguise between songs and scales
if($strType == 'music')
{
	$rGenres = $oSql->Select('
		SELECT
			genres.id,
			genres.genre_name
		FROM
			genres
		RIGHT JOIN
			games_genres ON
				games_genres.deleted    = 0
			 && games_genres.genre_id   = genres.id
		WHERE
			genres.deleted              = 0
		 && genres.genre_name           != ""
		GROUP BY
			genres.id
		ORDER BY
			genres.genre_name ASC
	');

	$strAdditionalSearch = '
	<select name="genre" class="std">
		<option value="0">'.$oLang->Get('global_select').'</option>
	';
	while($oGenres = $rGenres->fetch_object())
	{
		$strAdditionalSearch .= '<option value="'.$oGenres->id.'">'.$oLang->Get('genre_'.$oGenres->genre_name).'</option>';
	}
	$strAdditionalSearch .= '</select>';
}
elseif($strType == 'scales')
{
	echo "YAY";
}

// Create a new instance of the browse class
$oBrowse = new browse($oSql);

$strBody	= '
<div id="Browse">
	<div id="PlaylistContainer">
		<h2>Playlist <img src="/img/icons/new.svg" class="newPlaylist" title="'.$oLang->Get('global_new').'" /><img src="/img/icons/play.svg" class="playPlaylist" title="'.$oLang->Get('global_play').'" /></h2>
		<div id="PlaylistItems"></div>
	</div>
	<div id="SongContainer">
		<input type="text" name="title" value="" placeholder="Title" data-value="Title" data-type="'.$strType.'" autocomplete="off" class="std" id="musicSearch">
		'.$strAdditionalSearch.'
		<div id="list">
			'.$oBrowse->RenderMusic($strType).'
		</div>
	</div>
</div>
';

$strDialog	= $oPageRenderer->RenderDialogInfo($oTemplate, $strHeadline, $strBody, $strTitleBarColor, null, 'browse');

if(IS_DIALOG)
{
	header('Content-type: application/json');
	echo $strDialog;
}
?>