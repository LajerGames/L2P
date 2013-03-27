<?php
class Language
{
	private	$strMenu			= '',
			$strLanguageCode	= '',
			$arrTexts			= array();

	/**
	* Will create the Language object. It will load the provided language. It will also load the defaultLanguage and fill in any missing textCodes
	*
	* @param string $strLanguageCode
	* @return Language
	*/
	public function __construct($strLanguageCode = DEFAULT_LANGUAGE)
	{
		$this->strLanguageCode	= $strLanguageCode;

		if(!is_file(SERVER_PROJECT_ROOT_LANG.'/'.$this->strLanguageCode.'.php'))
		{
			$this->strLanguageCode	= DEFAULT_LANGUAGE;
		}

		include(SERVER_PROJECT_ROOT_LANG.'/'.$this->strLanguageCode.'.php');

		if($this->strLanguageCode !== DEFAULT_LANGUAGE)
		{
			include(SERVER_PROJECT_ROOT_LANG.'/'.DEFAULT_LANGUAGE.'.php');
		}

		return $this;
	}

	private function SetMenu($strMenu)
	{
		$this->strMenu	= $strMenu;

		return $this;
	}

	/**
	* Will set a text to a specific textCode
	*
	* @param string $strName
	* @param string $strText
	* @return Language
	*/
	private function Set($strName, $strText)
	{
		$strName	= $this->strMenu.$strName;

		if(!isset($this->arrTexts[$strName]))
		{
			$this->arrTexts[$strName]	= $strText;
		}

		return $this;
	}

	/**
	* Returns the text for the textCode
	*
	* @param string $strName
	* @param string
	*/
	public function Get($strName)
	{
		$strText	= 'Error';

		if(isset($this->arrTexts[$strName]))
		{
			$strText	= $this->arrTexts[$strName];
		}
		return $strText;
	}
}
?>