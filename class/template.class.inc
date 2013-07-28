<?php
class Template
{
	private	$oSql;

	/**
	* Creates the Template handler
	*
	* @param MySQLWrapper $oSql
	* @return Template
	*/
	public function __construct(MySQLWrapper $oSql)
	{
		$this->oSql	= $oSql;

		return $this;
	}

	/**
	* Replace the content with the item
	*
	* @param string $strContent
	* @param object,array $oItem
	* @return string
	*/
	public function RenderContent($strContent, $mItem, $bShowAddToPlaylist = true)
	{
        //printr($mItem);
		global $oLang;
		foreach($mItem as $strName => $strValue)
		{
			if(is_array($strValue) || is_object($strValue))
			{
				$strValue	= htmlentities(json_encode($strValue));
			}

			// Hack: Sorry for this miserable hack, but this is not very flexible without rewriting, we have to exchange availability with an icon
			if($strName == 'availability')
			{
				// Create a title for the a tag, to let people know why this song is locked
				$strAnchortagTitle = '';
				switch($strValue)
				{
					case 'users' :
						// If the user is logged in, don't display the lock
						if($_SESSION['UserObject']->id == 0)
						{
							$strAnchortagTitle = $oLang->Get('frontpage_locked_song_login');

							$strValue = '<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/lock.svg" alt="'.$strAltTag.'" title="'.$strAnchortagTitle.'" />';
						}
						else
						{
							$strValue = '<span>&nbsp;</span>';
						}
						break;
					case 'paid' :
						if($_SESSION['UserObject']->id == 0)
						{
							$strAnchortagTitle = $oLang->Get('frontpage_locked_song_login');
						}
						else
						{
							$strAnchortagTitle = $oLang->Get('frontpage_locked_song_purchase');
						}

						$strValue = '<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/lock.svg" alt="'.$strAltTag.'"  title="'.$strAnchortagTitle.'" />';
						break;
					default :
                        if($bShowAddToPlaylist)
                        {
                            $strPlusIcon = substr($_SERVER['REQUEST_URI'], 0, 8) == '/browse/' || true ? 'plus_black' : 'plus_white';
                            $strValue = '<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/'.$strPlusIcon.'.svg" class="addToPlaylist" alt="'.$oLang->Get('frontpage_add_to_playlist').'" title="'.$oLang->Get('frontpage_add_to_playlist').'" />';
                        }
                        else
                        {
                            $strValue = '<span>&nbsp;</span>';
                        }
						break;
				}

				// Now let's switch out the title of the anchortag
				// I'm still very sorry about this messy code...
				$strContent = str_replace('{{info}}', $strAnchortagTitle, $strContent);
			}
			$strContent	= str_replace('{{'.$strName.'}}', $strValue, $strContent);
		}
		return $strContent;
	}

	/**
	* Will render the content based on an Array
	*
	* @param string $strContent
	* @param array $arrItems
	* @param int $iLimit
	* @return string
	*/
	public function RenderContentArray($strContent, $arrItems, $iLimit = -1)
	{
		$iNumber		= 0;
		$strReturnText	= '';

		foreach($arrItems as $oItem)
		{
			if($iNumber >= $iLimit)
			{
				break;
			}
			$strReturnText	.= $this->RenderContent($strContent, $oItem);

			$iNumber++;
		}

		return $strReturnText;
	}

	/**
	* Will render the content based on a SQL Resource
	*
	* @param string $strContent
	* @param resource $rSql
	* @param int $iLimit
	* @return string
	*/
	public function RenderContentResource($strContent, $rSql, $iLimit = -1, $bShowAddToPlaylist = true)
	{
		$iNumber		= 0;
		$strReturnText	= '';

		while($oItem = $rSql->fetch_object())
		{
			if($iNumber >= $iLimit)
			{
				break;
			}
			$strReturnText	.= $this->RenderContent($strContent, $oItem, $bShowAddToPlaylist);

			$iNumber++;
		}

		return $strReturnText;
	}
}
?>