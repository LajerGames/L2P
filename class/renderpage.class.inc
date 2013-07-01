<?php
class PageRenderer
{
	const	DialogType_Action	= 'action',
			DialogType_Info		= 'info';

	private function getLang(Language $oLang, $arrKeys)
	{
		$arrPreloadLang	= array();

		foreach($arrKeys as $strLangKey)
		{
			$arrPreloadLang[$strLangKey]	= $oLang->Get($strLangKey);
		}

		return $arrPreloadLang;
	}

	/**
	* Renders the page with proper top and bottom
	*
	* @param Language $oLang
	* @param string $strHtmlContent
	* @param string $strTitle
	* @param array $arrCSSFiles
	*/
	function Renderpage(Language $oLang, $strHtmlContent, $strTitle = 'Magic Tune', $arrCSSFiles = array())
	{
		$strCSSFiles = '';
		if(is_array($arrCSSFiles) && count($arrCSSFiles) > 0)
		{
			foreach($arrCSSFiles as $strCSSFile)
			{
				$strCSSFiles .= '<link rel="stylesheet" href="'.HTTP_PROJECT_ROOT_CSS.$strCSSFile.'">
				';
			}
		}
		$arrPreloadLang	= $this->getLang($oLang, array(
			'global_play',
			'global_play_again',
            'global_pause',
			'global_octave',
			'global_points',
            'game_permission_ask',
            'game_permission_ask_initial',
            'game_permission_ask_helpful',
            'game_permission_ask_helpful_2',
            'game_permission_ask_helpful_3',
            'game_permission_ask_impatient',
            'game_permission_ask_impatient_sigh',
            'game_permission_denied',
            'game_measuring',
            'game_measuring_quiet',
            'game_measuring_shh',
            'game_measuring_done',
            'game_grade_perfect',
            'game_grade_good',
            'game_grade_fair',
            'game_grade_average',
            'game_grade_poor',
            'game_grade_rubbish',
            'game_grade_miserable'
		));

        // Check if we're comming from inside this page :)
        $strIntro = '';
        if(preg_match('/^http(?:s|):\/\/(?:www.|)magic-tune.(?:dk|com)(?:\/|$)/', $_SERVER['HTTP_REFERER']) == 0 && preg_match('/^http(?:s|):\/\/(?:www.|)l2p.fmads.(?:dk|com)(?:\/|$)/', $_SERVER['HTTP_REFERER']) == 0)
        {
            $strIntro = '
                <div id="intro">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="480px" height="81px" viewBox="0 0 960 162.058" enable-background="new 0 0 960 162.058" xml:space="preserve">
                        <g>
                            <path fill="#FFF" d="M213.521,38.61v10.726c8.362-8.363,16.181-12.362,23.816-12.362c10.363,0,18.908,5.091,24.363,14.727 c7.09-7.999,15.635-14.727,27.271-14.727c16.545,0,27.09,12.726,27.09,31.997v51.271h-16.181V69.698 c0-12.362-7.637-19.089-16.909-19.089c-5.271-0.182-12.362,4.363-18.181,10.362v59.271H248.61V69.515 c0-13.272-6.728-18.907-14.727-18.907c-8.182,0-13.636,2.545-20.363,10.362v59.271H197.34V38.608h16.182V38.61z"/>
                            <path fill="#FFF" d="M399.87,115.515c-7.454,4.907-10.545,6.362-15.636,6.362c-7.092,0-10.909-2.545-12.363-8.362 c-7.091,5.636-14.545,8.362-21.999,8.362c-12,0-20-9.455-20-19.998c0-16.183,14.727-21.092,27.817-25.818l14.362-5.09v-4.363 c0-10.183-4.909-14.362-14.727-14.362c-8.908,0-17.999,4.18-25.817,13.453V48.062c6.364-7.452,15.272-11.089,27.09-11.089 c16.544,0,29.636,8.363,29.636,26.908v41.997c0,3.092,1.09,4.184,3.09,4.184c1.636,0,4.909-1.637,8.545-4.364v9.818H399.87z M372.053,79.879c-13.816,4.727-25.816,9.453-25.816,19.09c0,6.728,4.908,11.455,11.636,11.455c5.09,0,9.817-2.547,14.181-6.728 V79.879z"/>
                            <path fill="#FFF" d="M505.096,51.154h-44.145c6.363,6.363,8.545,10.909,8.545,17.817c0,6.728-3.818,14.546-7.636,18.363 c-10.909,11.635-33.089,5.816-33.089,15.453c0,4.545,8.545,7.272,24.907,10.545c17.454,3.455,23.635,12.362,23.635,22.726 c0,16.182-14.363,26-38.542,26c-22,0-37.636-10.362-37.636-24.728c0-11.998,6.363-19.09,20.544-22.543 c-5.636-3.455-8.181-6.728-8.181-10.365c0-5.271,5.09-9.816,12.909-11.635v-0.363c-6-2.545-10.545-6-13.636-10.362 c-2.909-4.183-4.364-9.272-4.364-15.272c0-17.454,13.636-28.18,35.635-28.18h61.053V51.154z M434.953,124.241 c-10.908,0-18.544,5.092-18.544,12.363c0,8.182,8,12.545,22.726,12.545c14.183,0,22.545-4.363,22.545-11.816 C461.679,126.969,444.952,124.241,434.953,124.241z M439.134,52.608c-8.908,0-16.181,6.728-16.181,14.729 c0,8.906,6.545,14.907,16.363,14.907c9.091,0,15.635-6.362,15.635-15.271C454.952,59.154,447.68,52.608,439.134,52.608z"/>
                            <path fill="#FFF" d="M505.125,120.243h-16.18V64.685h16.18V120.243z"/>
                            <path fill="#FFF" d="M586.756,59.881c-9.271-6.182-15.453-7.999-22.543-7.999c-14.727,0-24.908,11.089-24.908,27.634 c0,16.908,10.908,27.09,27.635,27.09c6.908,0,13.453-1.818,21.635-5.455v16c-5.453,2.546-15.816,4.729-24.361,4.729 c-24.363,0-41.453-16.91-41.453-40.908c0-26.907,15.635-43.997,40.361-43.997c9.455,0,15.816,2.182,23.635,5.636V59.881z"/>
                            <path fill="#FFF" d="M672.563,38.61h56.408v14.544h-56.408v41.815c0,9.636,6.908,12.363,11.637,12.363 c5.816,0,11.816-2,18.361-6v15.09c-5.637,3.092-14.363,5.455-19.635,5.455c-17.637,0-26.545-10.908-26.545-25.637V53.153h-14.18 v-1.818L672.563,21.7V38.61z"/>
                            <path fill="#FFF" d="M764.373,120.243v-10.363c-6.729,7.271-16.18,12-24.18,12c-16.545,0-28.182-11.817-28.182-32.545V64.686 h16.182v25.74c0,11.453,5.635,18,16.727,18c7.271,0,14.182-4.002,19.453-11.455v-58.36h16.182v81.634h-16.182V120.243z"/>
                            <path fill="#FFF" d="M817.641,49.336h0.361c6.184-7.817,15.273-12.362,24.363-12.362c15.453,0,27.816,10.545,27.816,32.907 v50.361H854V69.698c0-11.999-6.182-19.816-16-19.816c-7.09,0-12.725,3.272-20.361,11.817v58.544h-16.182V38.61h16.182v10.726 H817.641z"/>
                            <path fill="#FFF" d="M959.266,112.242c-9.816,6.546-18.727,9.638-32.543,9.638c-25.455,0-39.637-20.91-39.637-43.453 c0-24.727,15.637-41.452,38.182-41.452c21.635,0,35.453,14.727,35.453,44.907h-57.453c2.547,16.181,11.818,24.543,27.453,24.543 c9.818,0,19.09-3.637,28.545-9.817V112.242L959.266,112.242z M944.721,71.153c-0.545-12.362-7.637-20.181-19.09-20.181 c-12.363,0-19.818,7.271-22,20.181H944.721z"/>
                        </g>
                        <g>
                            <path fill="#FFF" d="M94.404,141.6c-7.867-17.328-7.938-38.852,1.684-54.75c10.923-18.047,26.561-28.658,46.117-32.729 c-3.263-12.452-9.752-23.598-18.52-32.492c-0.215,0.099-0.43,0.193-0.645,0.292c-19.941,9.265-38.215,21.103-51.938,38.736 c-15.911,20.449-23.955,43.287-17.583,69.204c1.22,4.961,2.806,9.604,4.719,13.956c4.459,0.857,9.061,1.313,13.77,1.313 C79.824,145.129,87.35,143.889,94.404,141.6z"/>
                            <path fill="#FFF" d="M44.29,139.642c-3.076-8.517-5.209-17.741-6.396-27.646C32.592,67.788,48.221,31.288,83.196,3.356 c0.865-0.691,1.738-1.368,2.612-2.04C81.34,0.455,76.727,0,72.008,0C31.932,0-0.556,32.488-0.556,72.564 C-0.557,102.824,17.966,128.752,44.29,139.642z"/>
                            <path fill="#FFF" d="M142.979,87.738c-10.028,0.532-21.638,5.623-29.525,13.187c-11.212,10.757-14.875,24.226-10.684,37.375 C123.045,128.795,138.202,110.189,142.979,87.738z"/>
                        </g>
                    </svg>
                </div>
            ';
        }

        $strTrackingSubID	= SYSTEM_DEV ? '2' : '1';
        $strTrackingDomain	= SYSTEM_DEV ? 'fmads.dk' : $_SERVER['SERVER_NAME'];

		$arrL2PGlobals	= array(
			'username'		    => $_SESSION['UserObject']->username,
			'kiddie_mode'	    => intval($_SESSION['UserObject']->kiddie_mode),
			'colored_notes'	    => intval($_SESSION['UserObject']->colored_notes) === 1,
			'concert_pitch'	    => empty($_SESSION['UserObject']->concert_pitch) ? 442 : $_SESSION['UserObject']->concert_pitch,
			'lang'			    => $arrPreloadLang,
            'internal_load'     => $bInternalPageLoad,
            'countdown_time'    => intval($_SESSION['UserObject']->countdown_time),
            'metronome'         => intval($_SESSION['UserObject']->metronome) === 1
		);

		return '
		<!DOCTYPE html>
		<html>
			<head>
				<title>'.$strTitle.'</title>

				<link rel="icon" href="'.HTTP_PROJECT_ROOT_IMG.'favicon16.png" sizes="16x16">
				<link rel="icon" href="'.HTTP_PROJECT_ROOT_IMG.'favicon32.png" sizes="32x32">
				<link rel="icon" href="'.HTTP_PROJECT_ROOT_IMG.'favicon48.png" sizes="48x48">
				<link rel="icon" href="'.HTTP_PROJECT_ROOT_IMG.'favicon64.png" sizes="64x64">
				<link rel="icon" href="'.HTTP_PROJECT_ROOT_IMG.'favicon128.png" sizes="128x128">

				<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open Sans">
				<link rel="stylesheet" href="'.HTTP_PROJECT_ROOT.'bootstrap/css/bootstrap.min.css">
				<link rel="stylesheet" href="'.HTTP_PROJECT_ROOT_CSS.'bootstrap-tour.min.css">
				<link rel="stylesheet" href="'.HTTP_PROJECT_ROOT_CSS.'default.css">
				'.$strCSSFiles.'

                <script data-main="'.HTTP_PROJECT_ROOT_JAVASCRIPT.(SYSTEM_DEV ? 'main' : 'magic-tune').'" src="'.HTTP_PROJECT_ROOT_JAVASCRIPT.'require.js"></script>
				<script>
					var	L2P_global	= '.json_encode($arrL2PGlobals, JSON_FORCE_OBJECT).';
				</script>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			</head>
			<body>
                '.$strIntro.'
                <div id="overlay" class="show hide"></div>
				<div id="CenteringContainer" data-default-title="'.$oLang->Get('system_title_welcome').'">
                    <!--<a href="javascript:void(0);" id="guide"><img src="/img/icons/vidcam.svg" alt="guided tour"/>Guided tour</a>-->
					<a href="'.HTTP_PROJECT_ROOT.'" id="logo" data-internal-navigation="home" data-title="'.$oLang->Get('system_title_welcome').'"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="480px" height="81px" viewBox="0 0 960 162.058" enable-background="new 0 0 960 162.058" xml:space="preserve">
						<g>
							<path fill="#FFF" d="M213.521,38.61v10.726c8.362-8.363,16.181-12.362,23.816-12.362c10.363,0,18.908,5.091,24.363,14.727 c7.09-7.999,15.635-14.727,27.271-14.727c16.545,0,27.09,12.726,27.09,31.997v51.271h-16.181V69.698 c0-12.362-7.637-19.089-16.909-19.089c-5.271-0.182-12.362,4.363-18.181,10.362v59.271H248.61V69.515 c0-13.272-6.728-18.907-14.727-18.907c-8.182,0-13.636,2.545-20.363,10.362v59.271H197.34V38.608h16.182V38.61z"/>
							<path fill="#FFF" d="M399.87,115.515c-7.454,4.907-10.545,6.362-15.636,6.362c-7.092,0-10.909-2.545-12.363-8.362 c-7.091,5.636-14.545,8.362-21.999,8.362c-12,0-20-9.455-20-19.998c0-16.183,14.727-21.092,27.817-25.818l14.362-5.09v-4.363 c0-10.183-4.909-14.362-14.727-14.362c-8.908,0-17.999,4.18-25.817,13.453V48.062c6.364-7.452,15.272-11.089,27.09-11.089 c16.544,0,29.636,8.363,29.636,26.908v41.997c0,3.092,1.09,4.184,3.09,4.184c1.636,0,4.909-1.637,8.545-4.364v9.818H399.87z M372.053,79.879c-13.816,4.727-25.816,9.453-25.816,19.09c0,6.728,4.908,11.455,11.636,11.455c5.09,0,9.817-2.547,14.181-6.728 V79.879z"/>
							<path fill="#FFF" d="M505.096,51.154h-44.145c6.363,6.363,8.545,10.909,8.545,17.817c0,6.728-3.818,14.546-7.636,18.363 c-10.909,11.635-33.089,5.816-33.089,15.453c0,4.545,8.545,7.272,24.907,10.545c17.454,3.455,23.635,12.362,23.635,22.726 c0,16.182-14.363,26-38.542,26c-22,0-37.636-10.362-37.636-24.728c0-11.998,6.363-19.09,20.544-22.543 c-5.636-3.455-8.181-6.728-8.181-10.365c0-5.271,5.09-9.816,12.909-11.635v-0.363c-6-2.545-10.545-6-13.636-10.362 c-2.909-4.183-4.364-9.272-4.364-15.272c0-17.454,13.636-28.18,35.635-28.18h61.053V51.154z M434.953,124.241 c-10.908,0-18.544,5.092-18.544,12.363c0,8.182,8,12.545,22.726,12.545c14.183,0,22.545-4.363,22.545-11.816 C461.679,126.969,444.952,124.241,434.953,124.241z M439.134,52.608c-8.908,0-16.181,6.728-16.181,14.729 c0,8.906,6.545,14.907,16.363,14.907c9.091,0,15.635-6.362,15.635-15.271C454.952,59.154,447.68,52.608,439.134,52.608z"/>
							<path fill="#FFF" d="M505.125,120.243h-16.18V64.685h16.18V120.243z"/>
							<path fill="#FFF" d="M586.756,59.881c-9.271-6.182-15.453-7.999-22.543-7.999c-14.727,0-24.908,11.089-24.908,27.634 c0,16.908,10.908,27.09,27.635,27.09c6.908,0,13.453-1.818,21.635-5.455v16c-5.453,2.546-15.816,4.729-24.361,4.729 c-24.363,0-41.453-16.91-41.453-40.908c0-26.907,15.635-43.997,40.361-43.997c9.455,0,15.816,2.182,23.635,5.636V59.881z"/>
							<path fill="#FFF" d="M672.563,38.61h56.408v14.544h-56.408v41.815c0,9.636,6.908,12.363,11.637,12.363 c5.816,0,11.816-2,18.361-6v15.09c-5.637,3.092-14.363,5.455-19.635,5.455c-17.637,0-26.545-10.908-26.545-25.637V53.153h-14.18 v-1.818L672.563,21.7V38.61z"/>
							<path fill="#FFF" d="M764.373,120.243v-10.363c-6.729,7.271-16.18,12-24.18,12c-16.545,0-28.182-11.817-28.182-32.545V64.686 h16.182v25.74c0,11.453,5.635,18,16.727,18c7.271,0,14.182-4.002,19.453-11.455v-58.36h16.182v81.634h-16.182V120.243z"/>
							<path fill="#FFF" d="M817.641,49.336h0.361c6.184-7.817,15.273-12.362,24.363-12.362c15.453,0,27.816,10.545,27.816,32.907 v50.361H854V69.698c0-11.999-6.182-19.816-16-19.816c-7.09,0-12.725,3.272-20.361,11.817v58.544h-16.182V38.61h16.182v10.726 H817.641z"/>
							<path fill="#FFF" d="M959.266,112.242c-9.816,6.546-18.727,9.638-32.543,9.638c-25.455,0-39.637-20.91-39.637-43.453 c0-24.727,15.637-41.452,38.182-41.452c21.635,0,35.453,14.727,35.453,44.907h-57.453c2.547,16.181,11.818,24.543,27.453,24.543 c9.818,0,19.09-3.637,28.545-9.817V112.242L959.266,112.242z M944.721,71.153c-0.545-12.362-7.637-20.181-19.09-20.181 c-12.363,0-19.818,7.271-22,20.181H944.721z"/>
						</g>
						<g>
							<path fill="#FFF" d="M94.404,141.6c-7.867-17.328-7.938-38.852,1.684-54.75c10.923-18.047,26.561-28.658,46.117-32.729 c-3.263-12.452-9.752-23.598-18.52-32.492c-0.215,0.099-0.43,0.193-0.645,0.292c-19.941,9.265-38.215,21.103-51.938,38.736 c-15.911,20.449-23.955,43.287-17.583,69.204c1.22,4.961,2.806,9.604,4.719,13.956c4.459,0.857,9.061,1.313,13.77,1.313 C79.824,145.129,87.35,143.889,94.404,141.6z"/>
							<path fill="#FFF" d="M44.29,139.642c-3.076-8.517-5.209-17.741-6.396-27.646C32.592,67.788,48.221,31.288,83.196,3.356 c0.865-0.691,1.738-1.368,2.612-2.04C81.34,0.455,76.727,0,72.008,0C31.932,0-0.556,32.488-0.556,72.564 C-0.557,102.824,17.966,128.752,44.29,139.642z"/>
							<path fill="#FFF" d="M142.979,87.738c-10.028,0.532-21.638,5.623-29.525,13.187c-11.212,10.757-14.875,24.226-10.684,37.375 C123.045,128.795,138.202,110.189,142.979,87.738z"/>
						</g>
					</svg></a>
					<div id="content">
						'.$strHtmlContent.'
					</div>
				</div>
				<div id="game_container"></div>

				<script type="text/javascript">
					var _gaq = _gaq || [];
					_gaq.push(["_setAccount", "UA-42155613-'.$strTrackingSubID.'"]);
					_gaq.push(["_setDomainName", "'.$strTrackingDomain.'"]);
					_gaq.push(["_setAllowLinker", true]);
					_gaq.push(["_trackPageview"]);

					(function() {
						var ga = document.createElement("script"); ga.type = "text/javascript";
				  		ga.async = true;
						ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
						var s = document.getElementsByTagName("script")[0];
				  		s.parentNode.insertBefore(ga, s);
					})();
				</script>
				'.$strTackingCode.'
			</body>
		</html>
		';
	}

	/**
	* Creates a link for a dialogBox
	*
	* @param string $strLink
	* @param PageRenderer::DialogType $strDialogType
    * @param string $strInnerHTML
	* @param string $strIconPath
	* @param array $arrProperties
	*/
	public function RenderDialogLink($strLink, $strDialogType, $strInnerHTML, $strIconPath, $arrProperties = array())
	{
		$arrProperties['href']						= $strLink;
		$arrProperties['data-dialog']				= $strDialogType;

        $strIcon = !empty($strIconPath) ? '<img src="'.$strIconPath.'" alt="" />' : '';

		return '<a '.RenderProperties($arrProperties).' class="IconLink">'.$strIcon.' '.$strInnerHTML.'</a>';
	}

	public function RenderDialogAction(Template $oTemplate, $strTitle, $strBody, $strColor, $strSubmitText)
	{
		$arrDialog	= array(
			'dialogType'	=> 'action',
			'title'			=> $strTitle,
			'body'			=> $strBody,
			'color'			=> $strColor,
			'submitText'	=> $strSubmitText
		);

		if(IS_DIALOG)
		{
			return json_encode($arrDialog);
		}
		else
		{
			return $oTemplate->RenderContent('
				<div id="DialogContainer" data-dialog="action" data-dialog-title="{{title}}" data-dialog-color="{{color}}" data-dialog-submit-text="{{submitText}}">{{body}}</div>
			', $arrDialog);
		}
	}

	public function RenderDialogInfo(Template $oTemplate, $strTitle, $strBody, $strColor, $arrButtons = array(), $strScript = '')
	{
		$arrDialog	= array(
			'dialogType'	=> 'info',
			'title'			=> $strTitle,
			'body'			=> $strBody,
			'color'			=> $strColor,
			'buttons'		=> $arrButtons,
			'script'		=> $strScript
		);

		if(IS_DIALOG)
		{
			return json_encode($arrDialog);
		}
		else
		{
			$arrDialog['buttons']	= json_encode($arrDialog['buttons']);
			return $oTemplate->RenderContent('
				<div id="DialogContainer" data-dialog="info" data-dialog-title="{{title}}" data-dialog-color="{{color}}" data-dialog-buttons="{{buttons}}" data-dialog-script="{{script}}">{{body}}</div>
			', $arrDialog);
		}
	}

	public function RenderDialogGame(Template $oTemplate, $strTitle, $strGameData, $strType, $iOctave = null)
	{
		$arrDialog	= array(
			'dialogType'	=> 'game',
			'title'			=> $strTitle,
			'data'			=> $strGameData,
			'type'			=> $strType,
			'octave'		=> $iOctave
		);

		if(IS_DIALOG)
		{
			return json_encode($arrDialog);
		}
		else
		{
			return $oTemplate->RenderContent('
				<div id="DialogContainer" data-dialog="game" data-game-title="{{title}}" data-game-data="{{data}}" data-game-type="{{type}}" data-game-octave="{{octave}}"></div>
			', $arrDialog);
		}
	}
}
?>