function CONFIG() {};

var _currentUser;

CONFIG.key = function() {
    return "xxxxxxxx";
}

CONFIG.iv = function() {
    return "741952hheeyy66#cs!9hjv887mxx7@8y";
}

CONFIG.url = function() {
    return "op.php";
}

CONFIG.currentUser = function(){
	return this._currentUser;
}

CONFIG.createUser = function(){
	this._currentUser = new Person();
	this._currentUser.setAccount(0, "visitor");
}

