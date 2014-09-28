function onLoginViewLoad(){
	loginView.clearControls();
	loginView.addControl("login");
	loginView.addControl("register");
	loginView.controlsEnable(false);

	$( "#login" ).unbind( "click", function() {});
	$( "#register" ).unbind("click", function() {});

	$("#login").bind( "click", function() {
		var username = $( "#username" ).val();
		var password = $( "#password" ).val();
		
		if (username != "" && password != "") {
			loginView.controlsEnable(true);
			CONFIG.currentUser().login(username, password);	
		}
		
		return false;
	});

	$("#register").bind( "click", function() {
		$(document).trigger("onStateChange", 2);
		return false;
	});
	
	loginView.show();
}