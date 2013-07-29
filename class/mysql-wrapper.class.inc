<?php
class MySQLWrapper
{
	private $oSql;

	public function __construct(mysqli $oMysqli)
	{
		$this->oSql = $oMysqli;
		if($this->oSql->connect_errno)
		{
			echo 'MySQLi connection error: '.$this->oSql->connect_error;
		}
	}

	/**
	* A Select query is a normal T-Sql syntax
	*
	* @param string $strQuery
	* @return resource $rResource
	*/
	public function Select($strQuery)
	{
		return $this->oSql->query($strQuery);
	}

	/**
	* Returns the first result in the query as a PrefixedObject
	*
	* @param string $strQuery
	* @param string $strClassName
	* @return object $oObject
	*/
	public function SelectSingleObject($strQuery)
	{
		$rResource	= $this->Select($strQuery);
		if($rResource->num_rows === 0 || !$rResource)
		{
			return null;
		}

		return $this->FetchObject($rResource);
	}

	public function SelectSingleValue($strQuery)
	{
		$rResource	= $this->Select($strQuery);

		if($rResource->num_rows === 0)
		{
			preg_match('/[ \t]AS[ \t]([a-zA-Z]+)/', $strQuery, $arrMatches);

			$mValue	= $this->PrefixKeyValue($arrMatches[1], '');
		}
		else
		{
			$oObject	= $this->FetchObject($rResource);
			$arrSql		= (array)$oObject;
			$mValue		= current($arrSql);
		}

		return $mValue;
	}

	/**
	* Fetches the next row as a PrefixedObject
	*
	* @param resource $rResource
	* @param mixed $strClassName
	*/
	public function FetchObject($rResource, $bPrefix = true)
	{
		$oObject	= $rResource->fetch_object();
		if($bPrefix)
		{
			$oObject	= $this->PrefixObject($oObject);
		}

		return $oObject;
	}

	/**
	* Inserts data into a table
	*
	* @param string $strTable
	* @param array $arrData
	* @param string $strComment
	* @return int
	*/
	public function Insert($strTable, $arrData, $strDescription = '')
	{
		// Add "the se7en" to the array
		$arrData    = $this->AddTheSeven($arrData, 'INSERT');

		$arrCells   = array();
		$arrValues  = array();
		foreach($arrData as $strCell => $mValue)
		{
			$arrCells[]     = $this->oSql->real_escape_string($strCell);
			$arrValues[]    = '"'.$this->oSql->real_escape_string($mValue).'"';
		}

		$strQuery = '
			INSERT INTO
				'.$strTable.'
				('.implode(',', $arrCells).')
			VALUES
			('.implode(',', $arrValues).')
		';

		$this->oSql->query($strQuery);

		// Get insert id
		$iInsertID = $this->oSql->insert_id;

		// Save systemlog
		$this->SaveLog($strTable, $iInsertID, $strQuery, 'INSERT', $strDescription);

		return $iInsertID;
	}

	/**
	* Updates one or more records in the database, provide either an ID or a string containing a whereclause
	*
	* @param string $strTable
	* @param array $arrData
	* @param mixed $mWhereClause
	* @param string $strDescription
	*/
	public function Update($strTable, $arrData, $mWhereClause, $strDescription = '')
	{
		// The whereclause may be an integer, which means, that is the ID we'll update, or it may be a string containing an actual whereclause
		if(is_int($mWhereClause))
		{
			$strWhereClause = 'id = '.$mWhereClause;
		}
		elseif(is_string($mWhereClause))
		{
			if(is_numeric($mWhereClause))
			{
				$strWhereClause = 'id = '.$mWhereClause;
			}
			else
			{
				$strWhereClause = $mWhereClause;
			}
		}

		// Add "the se7en" to the array
		$arrData    = $this->AddTheSeven($arrData, 'UPDATE');

		$strData = '';
		foreach($arrData as $strCell => $mValue)
		{
			$strData .= '
			'.$this->oSql->real_escape_string($strCell).' = "'.$this->oSql->real_escape_string($mValue).'",';
		}
		$strData = rtrim($strData, ',');

		$strQuery = '
			UPDATE
				'.$strTable.'
			SET
				'.$strData.'
			WHERE
				'.$strWhereClause.'
		';

		$this->oSql->query($strQuery);

		// Save systemlog
		$this->SaveLog($strTable, $iUpdatedID, $strQuery, 'UPDATE', $strDescription);

		return;
	}

	/**
	* Set the rows as updated
	*
	* @param string $strTable
	* @param string $mWhereClause
	*/
	public function Touch($strTable, $mWhereClause)
	{
		$this->Update($strTable, array(), $mWhereClause);

		return;
	}

	/**
	* Flags one or more records as deleted
	*
	* @param string $strTable
	* @param mixed $mWhereClause
	* @param string $strDescription
	*/
	public function Delete($strTable, $mWhereClause, $strDescription = '')
	{
		// The whereclause may be an integer, which means, that is the ID flag as deleted, or it may be a string containing an actual whereclause
		if(is_int($mWhereClause))
		{
			$mWhereClause = 'id = '.$mWhereClause;
			$iDeletedID   = $mWhereClause;
		}
		elseif(is_string($mWhereClause))
		{
			if(is_numeric($mWhereClause))
			{
				$mWhereClause = 'id = '.$mWhereClause;
				$iDeletedID   = $mWhereClause;
			}
			else
			{
				$mWhereClause = $mWhereClause;
				$iDeletedID   = 0;
			}
		}

		$arrData = array();
		$arrData = $this->AddTheSeven($arrData, 'DELETE');

		$strData = '';
		foreach($arrData as $strCell => $mValue)
		{
			$strData .= '
			'.$strCell.' = "'.$mValue.'",';
		}
		$strData = rtrim($strData, ',');

		$strQuery = '
			UPDATE
				'.$strTable.'
			SET
				'.$strData.'
			WHERE
				'.$strWhereClause.'
		';

		$this->oSql->query($strQuery);

		// Save systemlog
		$this->SaveLog($strTable, $iDeletedID, $strQuery, 'DELETE', $strDescription);

		return;
	}

	public function Kill($strTable, $mWhereClause, $strDescription = '')
	{
		// The whereclause may be an integer, which means, that is the ID we will delete for real!, or it may be a string containing an actual whereclause
		if(is_int($mWhereClause))
		{
			$strWhereClause = 'id = '.$mWhereClause;
			$iDeletedID   = $mWhereClause;
		}
		elseif(is_string($mWhereClause))
		{
			if(is_numeric($mWhereClause))
			{
				$strWhereClause = 'id = '.$mWhereClause;
				$iDeletedID   = $mWhereClause;
			}
			else
			{
				$strWhereClause = $mWhereClause;
				$iDeletedID   = 0;
			}
		}

		$strQuery = '
			DELETE FROM
				'.$strTable.'
			WHERE
				'.$strWhereClause.'
		';

		$this->oSql->query($strQuery);

		// Save systemlog
		$this->SaveLog($strTable, $iDeletedID, $strQuery, 'KILL', $strDescription);

		return;
	}

	/**
	* Keeps track on what was done where, when by whom :)
	*
	* @param array $arrData
	* @param string $strType
	* @return array
	*/
	private function AddTheSeven($arrData, $strType)
	{
		$iUserID = intval($_SESSION['UserObject']->id);
		switch($strType)
		{
			case 'INSERT' :
				$arrData['created_on'] = date('Y-m-d H:i:s');
				$arrData['created_by'] = $iUserID;
				break;
			case 'UPDATE' :
				$arrData['updated_on'] = date('Y-m-d H:i:s');
				$arrData['updated_by'] = $iUserID;
				break;
			case 'DELETE' :
				$arrData['deleted'] = 1;
				$arrData['deleted_on'] = date('Y-m-d H:i:s');
				$arrData['deleted_by'] = $iUserID;
				break;
		}

		return $arrData;
	}

	/**
	* Saves a record in the systemlog folder for future debugging purpose
	*
	* @param string $strTable
	* @param integer $iRowID
	* @param string $strQuery
	* @param string $strActionType
	* @param string $strDescription
	*/
	private function SaveLog($strTable, $iRowID, $strQuery, $strActionType, $strDescription)
	{
		if(!empty($strDescription))
		{
			$arrSystemLogDB = array(
				'table_name'    => $strTable,
				'row_id'        => $iRowID,
				'query'         => $strQuery,
				'action_type'   => $strActionType,
				'description'   => $strDescription
			);

			$this->Insert('_systemlog', $arrSystemLogDB);
		}

		return;
	}

	private function PrefixObject($oObject)
	{
		if(is_object($oObject))
		{
			foreach($oObject as $strName => $strValue)
			{
				$strKey	= $strName;
				if(substr($strName, -8) === 'FromJSON')
				{
					$strKey	= substr($strName, 0, -8);
				}
				$oObject->$strKey	= $this->PrefixKeyValue($strName, $strValue);
			}
		}

		return $oObject;
	}

	private function PrefixKeyValue($strKey, $mValue)
	{
		if(substr($strKey, 0, 1) === 'i')
		{
			$mValue	= intval($mValue);
		}
		elseif(substr($strKey, 0, 1) === 'f')
		{
			$mValue	= floatval($mValue);
		}
		elseif(substr($strKey, 0, 1) === 'b')
		{
			$mValue	= $mValue == 1;
		}
		elseif(substr($strKey, 0, 1) === 't')
		{
			$mValue    = date('Y-m-d H:i:s', strtotime($mValue));
			if($mValue === '1970-01-01 00:00:00')
			{
			   $mValue = null;
			}
		}
		elseif(substr($strKey, 0, 1) === 'd')
		{
			$mValue    = date('Y-m-d', strtotime($mValue));
			if($mValue === '1970-01-01' || $mValue === '-0001-11-30')
			{
				$mValue = null;
			}
		}
		elseif(substr($strKey, 0, 3) === 'arr')
		{
			if(substr($strKey, -8) === 'FromJSON')
			{
				$mValue	= json_decode($mValue, true);
			}
			else
			{
				$mValue	= empty($mValue) ? array () : explode(',', $mValue);
			}
		}

		return $mValue;
	}

	/**
	* Real escaping string
	*
	* @param string $str
	*/
	public function RealEscape($str)
	{
		return $this->oSql->real_escape_string($str);
	}
}
?>