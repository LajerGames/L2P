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
					<div class="clear--left"></div>
					{{availability}}
					<a href="/game/{{permlink}}/{{octave}}" data-dialog="game" title="{{info}}"  class="OpenGame" data-title="{{title}}">
						<span class="octave">('.$oLang->Get('global_octave').' {{octave}})</span> {{title}}
					</a>
				', $oMusicOctave);
			}
		}

		return $strMusic;
	}
}
?>
