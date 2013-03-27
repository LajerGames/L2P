<?php
class browse
{
	public $oSql;

	public function __construct($oSql)
	{
		$this->oSql	= $oSql;

		return;
	}

	public function RenderMusic($strType, $strSearch = '', $iAmt = 100)
	{
		global $oTemplate;

		$rMusic = GetMusic($this->oSql, $strType, $iAmt, $strSearch);

		return $oTemplate->RenderContentResource('
			<div class="clear--left"></div>
			{{availability}}
			<a href="/game/{{permlink}}" data-dialog="game" title="{{info}}"  class="OpenGame">
				{{title}}
			</a>
			', $rMusic, 100
		);
	}
}
?>
