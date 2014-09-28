<?php

class Session{
	
	private static $isSessionStart = false;
	
	public static function Start(){
		 if(self::$isSessionStart) return;
		 if(session_id() == '') {
		 	//ob_start();  
     		session_start();
     		self::$isSessionStart = true;
     		//ob_end_flush(); 
		}	 
	}
	
	public static function Set($key, $value){
		 $_SESSION[$key] = $value;
	}
	
	public static function Get($key){
		if (!empty($_SESSION[$key])){
			return $_SESSION[$key];	
		}else{
			return 0;
		}
	}
	
	public static function Stop(){
		session_unset();
		session_destroy();
		self::$isSessionStart = false;
	}
}

?>