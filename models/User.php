<?php
require_once('ModelBase.php');

function set_password($plaintext) {
	return encryptRJ256('lkirwf897+22#bbtrm8814z5qq=498j5', '741952hheeyy66#cs!9hjv887mxx7@8y', $plaintext);
}

function validate_password($password, $hashed_password) {
	return $password == decryptRJ256('lkirwf897+22#bbtrm8814z5qq=498j5', '741952hheeyy66#cs!9hjv887mxx7@8y', $hashed_password);
}

function validate_user($username, $email) {
	$return = array();
	if (validate_username($username)) {
		array_push($return, 'username');
	}
	if (validate_email($email)) {
		array_push($return, 'email');
	}
	return $return;
} 

function validate_email($email) {
	$user = R::findOne('users', 'email = ?', array($email));
	if (!isset($user)) {
	  return FALSE;
	} else {
		return TRUE;
	}
}

function validate_username($username) {
	$user = R::findOne('users', 'username = ?', array($username));
	if (!isset($user)) {
		return FALSE;
	} else {
		return TRUE;
	}
}

function validate_login($username, $password) {
	$user = R::findOne('users', 'username = ?', array($username));
	if (!isset($user)) {
		return 0;
	} else {
		if (validate_password($password, $user->hashed_password)){
				return $user->id;
		}else{
				return 0;
		}
	}
}
?>












