<?php
// Create a array containing CSS files
$arrCSS = array('frontpage.css', 'dialog.css', 'browse.css', 'statistics.css');
// Add to CSS array
switch(REQUEST_URI)
{
	case '/browse/songs/' :
	case '/browse/scales/' :
		//$arrCSS[] = 'browse.css';
		break;
}
#Hack 1
if(!isset($oLoginForm))
{
	$oLoginForm = new form('login');
	$oLoginForm->TextField('username', '', $oLang->Get('login_username'), new FormFieldValidation(true, PATTERN_USERNAME, $oLang->Get('validation_username')), null, false, array('autocomplete' => 'off'));
	$oLoginForm->TextField('password', '', $oLang->Get('login_password'), new FormFieldValidation(true, PATTERN_PASSWORD, $oLang->Get('validation_password')), 'password', true);
}
/*
$oGameData = new GameData($oSql);
$oGameData->GetEndgameAchievement(23, 4, 37, 18000);*/
$strDialog	= '';
// We may have a deep link
if(REQUEST_URI !== '/')
{
	// NOTICE! $oLoadInfo is already set in index.php

	if(!empty($oLoadInfo->strLoadfile))
	{
		// Set oPathUser if needed
		if(is_object($oLoadInfo->oPathUser))
		{
			// Hack #2
			$oPathUser = $oLoadInfo->oPathUser;
		}

		// Include
		include($oLoadInfo->strLoadfile);
	}
}

// Get the games
$rMusic = GetMusic($oSql, 'song', 7);

$rScale = GetMusic($oSql, 'scale', 7);

// Don't display loginfield if user is logged in

if(isset($_SESSION['UserObject']))
{
	// Create headline
	$strHeadline = str_replace('#username#', $_SESSION['UserObject']->username, $oLang->Get('userarea_headline'));
	$strPointBoxText	= $_SESSION['UserObject']->kiddie_mode ? '<span data-standard-text="'.$oLang->Get('user_settings_kiddie_mode').'">'.$oLang->Get('user_settings_kiddie_mode').' :)</span>' : '<span data-standard-text="'.$oLang->Get('global_points').'"><span id="pointContainer">0</span> '.$oLang->Get('global_points').'</span>';

	// Calculate subscription
	CalculateSubscriptionTimeleft($_SESSION['UserObject']->expire);
	$strUserarea = '
		<div class="ContentBoxBlue">
			<div class="ContentBoxHeadline">
				<div>
					<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/user.svg" alt="" /><span>'.$strHeadline.'</span>
					<a href="/user/handle/" title="'.$oLang->Get('frontpage_edit').'" data-internal-navigation><img id="EditUser" src="'.HTTP_PROJECT_ROOT_IMG.'icons/pen.svg" alt="" /></a>
				</div>
			</div>
			<div class="ContentBoxBodyContainer">
				<div class="ContentBoxBody">
					'.$oPageRenderer->RenderDialogLink('/user/'.$_SESSION['UserObject']->username.'/statistics/', PageRenderer::DialogType_Info, $oLang->Get('frontpage_user_statistics'), '/img/icons/statistics-white.svg').'
					<!--'.$oPageRenderer->RenderDialogLink('/user/subscription/', PageRenderer::DialogType_Action, $oLang->Get('frontpage_user_subscription'), '/img/icons/subscription.svg').'-->
                    '.$oPageRenderer->RenderDialogLink('/user/settings/', PageRenderer::DialogType_Info, $oLang->Get('frontpage_user_settings'), '/img/icons/settings.svg').'
					'.($_SESSION['UserObject']->is_god == 1 ? $oPageRenderer->RenderDialogLink('/game/create/edit/', PageRenderer::DialogType_Action, 'nub', '/img/icons/settings.svg') : '').'
					<a href="/?mode=logout" class="IconLink"><img src="/img/icons/logout.svg" alt="" /> '.$oLang->Get('frontpage_user_logout').'</a>
				</div>
			</div>
		</div>
		<div class="ContentBoxPoint">
			<div class="ContentBoxHeadline">
				<div>
					<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/user.svg" alt="" />
					'.$strPointBoxText.'
				</div>
			</div>
			<div class="ContentBoxBody">
				&nbsp;
			</div>
		</div>
		<div class="ContentBoxGameControl">
			<div>
				<table border="0" cellspacing="100" cellpadding="0">
					<tr>
						<td><input type="text" name="bpm" value="80" /><div class="ContentBoxGameControl-bpm">bpm</div></td>
						<td>&nbsp;</td>
						<td data-action="toggle-game">
							<div class="ContentBoxGameControl-playpause-play">
								<span class="ContentBoxGameControl-playpause">'.$oLang->Get('global_play').'</span><img src="/img/icons/play-white.svg" class="ContentBoxGameControl-icon" />
							</div>
							<div class="ContentBoxGameControl-playpause-pause">
								<span class="ContentBoxGameControl-playpause">'.$oLang->Get('global_pause').'</span><img src="/img/icons/pause-white.svg" class="ContentBoxGameControl-icon" />
							</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
	';
}
else
{
	$strUserarea = '
		<div class="ContentBoxBlue">
			<div class="ContentBoxHeadline">
				<div>
					<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/user.svg" alt="" /><span data-standard-text="'.$oLang->Get('frontpage_login').'">'.$oLang->Get('frontpage_login').'</span>
				</div>
			</div>
			<div class="ContentBoxBodyContainer">
				<div class="ContentBoxBody upper">
					'.$oLoginForm->RenderFields(false).'
					<button name="facebook_login"><img src="/img/icons/facebook.svg" /></button>
				</div>
				'.$oPageRenderer->RenderDialogLink('/user/create/', PageRenderer::DialogType_Action, '
					<span>'.$oLang->Get('frontpage_create_user').'</span>
				',null, array('class' => 'ContentBoxBody lower')).'
			</div>
		</div>
		<div class="ContentBoxPoint">
			<div class="ContentBoxHeadline">
				<div>
					<span data-standard-text="'.$oLang->Get('global_points').'"><span id="pointContainer">0</span> '.$oLang->Get('global_points').'</span>
				</div>
			</div>
			<div class="ContentBoxBody">
				Pointdims
			</div>
		</div>
	';
}

echo $oPageRenderer->Renderpage($oLang, '
<div id="ActiveDialog"></div>
<div id="frontpage_container" class="">
	<div class="ContentBox">
		<div class="ContentBoxGreen">
			<div class="CompassOuter"></div>
			<div class="ContentBoxHeadline">
				<div>
					<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/sixteenthnote.svg" alt="" /><span id="song_title" data-default-text="'.$oLang->Get('frontpage_choose_song').'">'.$oLang->Get('frontpage_choose_song').'</span>
				</div>
			</div>
			<div class="ContentBoxBodyContainer">
				<div class="ContentBoxBody">
					'.$oTemplate->RenderContentResource('
					<div>
						{{availability}}
						<a href="/game/{{permlink}}" data-dialog="game" title="{{info}}"  class="OpenGame">
							{{title}}
						</a>
						<div class="clear"></div>
					</div>
					', $rMusic, 7, false).'
					<div>
						<a href="/browse/songs/" data-dialog="info" title="'.$oLang->Get('frontpage_view_all_songs_title').'" class="ViewAllGames">
							-- '.$oLang->Get('frontpage_view_all').' --
						</a>
						<div class="clear"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="ContentBoxGameCompass">
			<div>
				<img src="/img/game/compas-left.svg" />
				<img src="/img/game/compas-left.svg" style="-webkit-transform: scaleX(-1);" />
				<div class="ContentBoxGameCompass-tone-before">&nbsp;</div>
				<div class="ContentBoxGameCompass-tone-current">&nbsp;</div>
				<div class="ContentBoxGameCompass-tone-after">&nbsp;</div>
				<div class="ContentBoxGameCompass-line">&nbsp;</div>
			</div>
		</div>
	</div>
	<div  class="ContentBox">
		<div class="ContentBoxOrange">
			<div class="ContentBoxHeadline">
				<div>
					<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/eighthnote.svg" alt="" /><span id="scale_title" data-default-text="'.$oLang->Get('frontpage_choose_scale').'">'.$oLang->Get('frontpage_choose_scale').'</span>
				</div>
			</div>
			<div class="ContentBoxBodyContainer">
				<div class="ContentBoxBody">
					'.$oTemplate->RenderContentResource('
					<div>
						{{availability}}
						<a href="/game/{{permlink}}" data-dialog="game" title="{{info}}" class="OpenGame">
							{{title}}
						</a>
						<div class="clear"></div>
					</div>
					', $rScale, 7, false).'
					<div>
						<a href="/browse/scales/" data-dialog="info" title="'.$oLang->Get('frontpage_view_all_scales_title').'" class="ViewAllGames">
						-- '.$oLang->Get('frontpage_view_all').' --
						</a>
						<div class="clear"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="ContentBox ContentBoxEnd">
		'.$strUserarea.'
	</div>
	<div style="clear: both; float: none;"></div>
</div>
',
$oLang->Get('system_title_welcome'),
$arrCSS
);
?>