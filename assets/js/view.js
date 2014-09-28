function View(template) {
	var _template, _css, _container, _param, _controls;
	this._controls = new Array(); 
	this._template = template;
}


View.prototype._container = "template-container";

View.prototype.load = function(callBack, param) {
	this._param = param;
	loadCSS("assets/css/"+this._template+".css", "view");
	loadTemplate("templates/"+this._template, function(content) {
		$('#template-container').hide();
		$('#template-container').html(content);
		callBack();
	});
}

View.prototype.getParam = function() {
	return this._param;
}

View.prototype.show = function() {
	$('#template-container').show();	
}

View.prototype.controlsEnable = function(bool) {
	jQuery.each( this._controls, function( i, val ) {
		$( "#" + val ).prop( "disabled", bool );
	})
}

View.prototype.clearControls = function(){
	this._controls = [];
}

View.prototype.addControl = function(control){
	this._controls.push(control);
}

var loginView = new View("login-view");
var logoutView = new View("logout-view");
var registerView = new View("registration-view");
