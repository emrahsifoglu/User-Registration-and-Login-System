function Person() {
	var _id, _username, _password, _email, _captcha;
}

Person.prototype.setId = function(id){
	this._id = id;
}

Person.prototype.setUsername = function(username){
	this._username = username;
}

Person.prototype.getUsername = function(){
	return this._username;
}

Person.prototype.setAccount = function(id, username){
	this._id = id;	
	this._username = username;	
}

Person.prototype.getAccount = function(){
	return {
        "id": this._id,
		"username": this._username
    };
}

Person.prototype.onRegister = function(req) {
	$(document).trigger("onRegister", decryptTripleDEStoJSON(req));
}	 

Person.prototype.onLogout = function(req) {
	$(document).trigger("onLogout", decryptTripleDEStoJSON(req));
}


Person.prototype.onLogin = function(req) {
	$(document).trigger("onLogin", decryptTripleDEStoJSON(req));
}

Person.prototype.onError = function(req, status, err ) {
	alert("Person.onError");
}

Person.prototype.register = function(username, password, email, captcha) {
	this._email = email;	
	this._captcha = captcha;	
	call(
		"POST", 
		CONFIG.url(), 
		"master=mr&operation=register&username="+username+"&password="+password+"&email="+email+"&captcha="+captcha, 
		this.onRegister, 
		this.onError
	);
}

Person.prototype.login = function(username, password) {
	this._username = username;	
	call(
		"POST", 
		CONFIG.url(), 
		"master=mr&operation=login&username="+username+"&password="+password, 
		this.onLogin, 
		this.onError
	);
}

Person.prototype.logout = function(username) {
	call(
		"POST", 
		CONFIG.url(), 
		"master=mr&operation=logout&username="+username, 
		this.onLogout, 
		this.onError
	);
}






