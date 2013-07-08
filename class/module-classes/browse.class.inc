<?php
class browse
{
	public $oSql;

	public function __construct(MySQLWrapper $oSql)
	{
		$this->oSql	= $oSql;

		return;
	}

	public function RenderMusic($strType, $strSearch = '', $iAmt = 100)
	{
		global	$oTemplate,
				$oLang;

		$rMusic = GetMusic($this->oSql, $strType, $iAmt, $strSearch);
		$strMusic	= '';

		while($oMusic = $this->oSql->FetchObject($rMusic, false))
		{
			$arrOctave	= explode(',', $oMusic->octave);

			foreach($arrOctave as $iOctave)
			{
				$oMusicOctave			= clone $oMusic;
				$oMusicOctave->octave	= $iOctave;

				$strMusic	.= $oTemplate->RenderContent('
					<a class="browse-item" href="/game/{{permlink}}/{{octave}}" data-dialog="game" title="{{info}}" data-title="{{title}}">
						<span class="browse-item-octave">('.$oLang->Get('global_octave').' {{octave}})</span> <span class="browse-item-title">{{title}}</span>
						<img src="'.HTTP_PROJECT_ROOT_IMG.'icons/plus_black.svg" class="browse-item-add" data-action="add-to-playlist" alt="'.$oLang->Get('frontpage_add_to_playlist').'" title="'.$oLang->Get('frontpage_add_to_playlist').'" />
					</a>
				', $oMusicOctave);
			}
		}

		return $strMusic;
	}
}
?>
