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
$oSongGenerator = new SongGenerator($oSql);

$oSongGenerator->GenerateSong();

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
				<div class="ContentBoxBody upper" id="LoginContainer">
					<div class="login-container-box login-container-box-main">
						<button name="facebook_login"><img src="/img/icons/facebook.svg" /> Facebook</button>

						<button name="custom_login"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: 3vmin;max-width: 100%;vertical-align: middle;height: 3vmin;" x="0px" y="0px" viewBox="0 0 145 145" enable-background="new 0 0 162.058 162.058" xml:space="preserve">
						<g>
							<path fill="#71C211" d="M94.404,141.6c-7.867-17.328-7.938-38.852,1.684-54.75c10.923-18.047,26.561-28.658,46.117-32.729 c-3.263-12.452-9.752-23.598-18.52-32.492c-0.215,0.099-0.43,0.193-0.645,0.292c-19.941,9.265-38.215,21.103-51.938,38.736 c-15.911,20.449-23.955,43.287-17.583,69.204c1.22,4.961,2.806,9.604,4.719,13.956c4.459,0.857,9.061,1.313,13.77,1.313 C79.824,145.129,87.35,143.889,94.404,141.6z"/>
							<path fill="#71C211" d="M44.29,139.642c-3.076-8.517-5.209-17.741-6.396-27.646C32.592,67.788,48.221,31.288,83.196,3.356 c0.865-0.691,1.738-1.368,2.612-2.04C81.34,0.455,76.727,0,72.008,0C31.932,0-0.556,32.488-0.556,72.564 C-0.557,102.824,17.966,128.752,44.29,139.642z"/>
							<path fill="#71C211" d="M142.979,87.738c-10.028,0.532-21.638,5.623-29.525,13.187c-11.212,10.757-14.875,24.226-10.684,37.375 C123.045,128.795,138.202,110.189,142.979,87.738z"/>
						</g>
					</svg> Magic Tune</button>
					</div>
					<div class="login-container-box">
						'.$oLoginForm->RenderFields(false).'
						<a href="#" name="custom_login_back"><i class="icon-arrow-left icon-white"></i> Back</a>
					</div>
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