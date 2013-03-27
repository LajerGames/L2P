<?php
class Game
{
	private $oSql;

	public function __construct($oSql)
	{
		$this->oSql = $oSql;
	}
}
?>