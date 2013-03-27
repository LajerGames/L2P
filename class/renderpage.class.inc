<?php
class PageRenderer
{
	const	DialogType_Action	= 'action',
			DialogType_Info		= 'info';

	/**
	* Renders the page with proper top and bottom
	*
	* @param Language $oLang
	* @param string $strHtmlContent
	* @param string $strTitle
	* @param array $arrCSSFiles
	*/
	function Renderpage(Language $oLang, $strHtmlContent, $strTitle = 'play.now', $arrCSSFiles = array())
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

		return '
		<!DOCTYPE html>
		<html>
			<head>
				<title>'.$strTitle.'</title>
				<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open Sans">
				<link rel="stylesheet" href="'.HTTP_PROJECT_ROOT.'bootstrap/css/bootstrap.min.css">
				<link rel="stylesheet" href="'.HTTP_PROJECT_ROOT_CSS.'default.css">
				'.$strCSSFiles.'

				<script data-main="'.HTTP_PROJECT_ROOT_JAVASCRIPT.'main" src="'.HTTP_PROJECT_ROOT_JAVASCRIPT.'require-jquery.js"></script>
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
			</head>
			<body>
				<div id="CenteringContainer" data-default-title="'.$oLang->Get('system_title_welcome').'">
					<div id="languages">
						<a href="'.HTTP_PROJECT_ROOT.'?mode=language&lang=da-DK"><img src="'.HTTP_PROJECT_ROOT_IMG.'icons/dk.svg" alt="Danmark" /></a>
						<a href="'.HTTP_PROJECT_ROOT.'?mode=language&lang=en-US"><img src="'.HTTP_PROJECT_ROOT_IMG.'icons/uk.svg" alt="United Kingdom" /></a>
					</div>
					<a href="'.HTTP_PROJECT_ROOT.'" id="logo" data-internal-navigation="home" data-title="'.$oLang->Get('system_title_welcome').'"><svg version="1.1" id="Lag_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="123.5px" height="63px" viewBox="0 0 123.5 63" enable-background="new 0 0 123.5 63" xml:space="preserve">
<text transform="matrix(1 0 0 1 63.5 43)"><tspan x="0" y="0" fill="#588A9D" font-family="\'ArialMT\'" font-size="13">learn</tspan><tspan x="0" y="15.6" fill="#588A9D" font-family="\'ArialMT\'" font-size="13">compete</tspan></text>
<text transform="matrix(1 0 0 1 0 24.5)" class="logo-text" font-family="\'ArialMT\'" font-size="31">play.now</text>
</svg></a>
					'.$strHtmlContent.'
				</div>
				<div id="game_container"></div>
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
	* @param array $arrProperties
	*/
	public function RenderDialogLink($strLink, $strDialogType, $strInnerHTML, $arrProperties = array())
	{
		$arrProperties['href']						= $strLink;
		$arrProperties['data-dialog']				= $strDialogType;

		return '<a '.RenderProperties($arrProperties).'>'.$strInnerHTML.'</a>';
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

	public function RenderDialogGame(Template $oTemplate, $strTitle, $strGameData, $strType)
	{
		$arrDialog	= array(
			'dialogType'	=> 'game',
			'title'			=> $strTitle,
			'data'			=> $strGameData,
			'type'			=> $strType
		);

		if(IS_DIALOG)
		{
			return json_encode($arrDialog);
		}
		else
		{
			return $oTemplate->RenderContent('
				<div id="DialogContainer" data-dialog="game" data-game-title="{{title}}" data-game-data="{{data}}" data-game-type="{{type}}"></div>
			', $arrDialog);
		}
	}
}
?>