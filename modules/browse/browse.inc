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

$strLoops	= '';
for($iLoopNo = 1; $iLoopNo <= 10; $iLoopNo++)
{
	$strLoops	.= '<option value="'.$iLoopNo.'">'.$iLoopNo.'</option>';
}

// Create a new instance of the browse class
$oBrowse = new browse($oSql);

$strBody	= '
<table id="Browse">
	<tr>
		<td id="info">
			<h4>'.$oLang->Get('browse_start_position').'</h4>
			<div data-content="illustration"></div>
			<ul class="unstyled">
				<li data-content="title"></li>
				<li data-content="octave"></li>
				<li data-content="author"></li>
				<li data-content="year"></li>
				<li data-content="difficulty"></li>
			</ul>
			<a href="#" data-content="statistics" data-dialog="info"><img src="/img/icons/statistics.svg" id="StatsGraph" /> Statistics</a>
		</td>
		<td id="SongContainer">
			<input type="text" name="title" value="" placeholder="Title" data-value="Title" data-type="'.$strType.'" autocomplete="off" class="std" id="musicSearch">
			'.$strAdditionalSearch.'<br>
			<div id="list">
				'.$oBrowse->RenderMusic($strType).'
			</div>
		</td>
		<td id="PlaylistContainer">
			<h2>Playlist <img src="/img/icons/new.svg" class="listPlaylist" title="'.$oLang->Get('global_new').'" /><img src="/img/icons/play.svg" class="playPlaylist" title="'.$oLang->Get('global_play').'" /></h2>
			<div id="PlaylistInfoContainer">
				<div id="PlaylistInfoContainerInner">
					<div id="PlaylistList">&nbsp;</div>
					<div id="PlaylistItems"></div>
					<div class="clear"></div>
				</div>
			</div>
		</td>
	</tr>
</table>
';

$strDialog	= $oPageRenderer->RenderDialogInfo($oTemplate, $strHeadline, $strBody, $strTitleBarColor, null, 'browse');

if(IS_DIALOG)
{
	header('Content-type: application/json');
	echo $strDialog;
}
?>