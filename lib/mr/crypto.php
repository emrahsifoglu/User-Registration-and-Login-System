<?php 
// PHP and C# common encryption and decryption functions
// use of J256
ini_set('display_errors', 1);
error_reporting(E_ALL);

$key = 'lkirwf897+22#bbtrm8814z5qq=498j5'; // 32 * 8 = 256 bit key
$iv = '741952hheeyy66#cs!9hjv887mxx7@8y'; // 32 * 8 = 256 bit iv

function decryptRJ256($key,$iv,$string_to_decrypt) {
    $string_to_decrypt = base64_decode($string_to_decrypt);
    $rtn = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $string_to_decrypt, MCRYPT_MODE_CBC, $iv);
    $rtn = rtrim($rtn, "\0\4");
    return($rtn);
}

function encryptRJ256($key,$iv,$string_to_encrypt) {
    $rtn = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $string_to_encrypt, MCRYPT_MODE_CBC, $iv);
    $rtn = base64_encode($rtn);
    return($rtn);
} 

//AES
$AES_Key = 'jZjneNba78tqCuB8l8eQrXoAigmbjIwwngYfjEdnnLg=';
$AES_IV = 'Uty9weAigmbjIwwng3532JFbeRxGJzhl4Ymw9ry6Slc=';
$keyfile = array();
$keyfile[0] = $AES_Key;
$keyfile[1] = $AES_IV;

function addpadding($string, $blocksize = 32) {
    $len = strlen($string);
    $pad = $blocksize - ($len % $blocksize);
    $string .= str_repeat(chr($pad), $pad);
    return $string;
}

function strippadding($string) {
    $slast = ord(substr($string, -1));
    $slastc = chr($slast);
    $pcheck = substr($string, -$slast);
    if(preg_match("/$slastc{".$slast."}/", $string)){
        $string = substr($string, 0, strlen($string)-$slast);
        return $string;
    } else {
        return false;
    }
}

function encryptAES($string = "", $keyfile) {
    $key = base64_decode($keyfile[0]);
    $iv = base64_decode($keyfile[1]);
	return base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, addpadding($string), MCRYPT_MODE_CBC, $iv));
}

function decryptAES($string = "", $keyfile) {
    $key = base64_decode($keyfile[0]);
    $iv = base64_decode($keyfile[1]);
	$string = base64_decode($string);
	return strippadding(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $string, MCRYPT_MODE_CBC, $iv));
}

// use of 3DES
function encrypt3DES($string) {
	$key = "xxxxxxxx";
	$cipher_alg = MCRYPT_TRIPLEDES;
	$iv = mcrypt_create_iv(mcrypt_get_iv_size($cipher_alg,MCRYPT_MODE_ECB), MCRYPT_RAND); 
	$encrypted_string = mcrypt_encrypt($cipher_alg, $key, $string, MCRYPT_MODE_ECB, $iv); 
	return base64_encode($encrypted_string);
}
    
function decrypt3DES($string) {
	$string = base64_decode($string);
	$key = "xxxxxxxx";
	$cipher_alg = MCRYPT_TRIPLEDES;
	$iv = mcrypt_create_iv(mcrypt_get_iv_size($cipher_alg,MCRYPT_MODE_ECB), MCRYPT_RAND); 
	$decrypted_string = mcrypt_decrypt($cipher_alg, $key, $string, MCRYPT_MODE_ECB, $iv); 
	return trim($decrypted_string);
}

function generate_salt(){
	$rndstring = "";
	$length = 64;
	$a = "";
	$b = "";
	$template = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	settype($length, "integer");
	settype($rndstring, "string");
	settype($a, "integer");
	settype($b, "integer");

	for ($a = 0; $a <= $length; $a++) {
		$b = rand(0, strlen($template) - 1);
		$rndstring .= $template[$b];
	}

	return $rndstring;
}

function generate_password($salt, $pass){
	$password_hash = '';
	$mysalt = $salt;
	$password_hash = hash('SHA256', "-".$mysalt."-".$pass."-");
	return $password_hash;
}

//$salt = $this->generate_salt();
//$generate_password = generate_password($salt, $password);
?>