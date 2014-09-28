<?php
require_once('db.php');
require_once('lib/mr/common.php');
require_once('lib/mr/crypto.php');
require_once('lib/mr/Session.php');
require_once('models/User.php');

$return = array();

if (isset($_POST['master']) && isset($_POST['operation'])) {
	$master = $_POST['master'];
	$operation = $_POST['operation'];
	if ($master == 'mr') {
		switch ($operation) {
			case 'register'			: 
				if (isset($_POST['username']) && isset($_POST['password'])) {
					$username 			= $_POST['username'];
					$password 			= $_POST['password'];
					$email 				= $_POST['email'];
					$captcha 			= $_POST['captcha'];
					register($username, $password, $email, $captcha);
				}
			break;
			case 'login' 			: 
				if (isset($_POST['username']) && isset($_POST['password'])) {
					$username 			= $_POST['username'];
					$password 			= $_POST['password'];
					login($username, $password);
				}
			break;
				case 'logout' 			: 
				if (isset($_POST['username'])) {
					$username 			= $_POST['username'];
					logout($username);
				}
			break;
			case 'sessionCheck' 	: sessionCheck();
			break;
		}
	} else {
		$return['error'] = TRUE;
		$return['result'] = 'access denied 2';
		echo toJSONEncoded($return);
	}
} else {
	$return['error'] = TRUE;
	$return['result'] = 'access denied 1';
	echo toJSONEncoded($return);
}

function sessionCheck(){
	Session::Start();
	$return = array();
	$return['error'] = FALSE;
	$return['succeed'] = TRUE; 
	$return['result'] = array("id" => Session::Get("id"), "username" => Session::Get("username"));
	echo toJSONEncoded($return);
}

function register($username, $password, $email, $captcha) {	
	$return = array();
	$return['error'] = FALSE;
	$validate_user = validate_user($username, $email);
	
	if (sizeof($validate_user)){
		$return['succeed'] = FALSE;	
		$return['result'] = $validate_user;
	} else {
	    global $redbean;
		$redbean->freeze(1);
		$user = $redbean->dispense('users');
		$user->username = $username;
		$user->hashed_password = set_password($password);
		$user->email = $email;
		$user->captcha =  $captcha;
		$user->unique_code = createUniqueCode();
		$id = $redbean->store($user);
		$return['succeed'] = TRUE; 
		$return['result'] = $id;	
	}
	
	echo toJSONEncoded($return);	
}

function login($username, $password) {
	$return = array();
	$return['error'] = FALSE;
	
	$id = validate_login($username, $password);
	
	if($id == 0){
		$return['succeed'] = FALSE; 
		$return['result'] = 0;
	}else{
		$return['succeed'] = TRUE;
		$return['result'] = $id;
		Session::Start();
		Session::Set("id", $id);
		Session::Set("username", $username);
	}
	
	echo toJSONEncoded($return);
}

function logout($userId) {
	Session::Start();
	Session::Set("id", 0);
	Session::Set("username", 0);
	Session::Stop();
	
	$return = array();
	$return['error'] = FALSE;
	$return['succeed'] = TRUE; 
	$return['result'] = 0;
	
	echo toJSONEncoded($return);
}
?>