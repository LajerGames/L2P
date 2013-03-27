<?php

// Validate
if($oHandleUserForm->Validate($_POST))
{
	// Get userdata
	$strFirstName 	= $oSql->RealEscape($_POST['first_name']);
	$strLastName 	= $oSql->RealEscape($_POST['last_name']);

	// Update usertable
	$oSql->Update('users', array('first_name' => $strFirstName, 'last_name' => $strLastName), $_SESSION['UserObject']->id, 'User (id: '.$_SESSION['UserObject']->id.') updated userdata');

	$oUserHandler->SetUserSession($_SESSION['UserObject']->id);

	Redirect(HTTP_PROJECT_ROOT);
}
?>