var errors = new Array(); 
var err_msg_len = 0;
var err_msg 	= "";
	
function pushErroMsg(msg) {
	errors.push(msg);
	err_msg_len = (err_msg_len < msg.length) ? msg.length : err_msg_len;
}

function onRegisterViewLoad(){
	registerView.clearControls();
	registerView.addControl("login");
	registerView.addControl("register");
	registerView.controlsEnable(false);

	$("#register").unbind("click");
	$("#login").unbind( "click", function() {});
	$("#register").bind( "click", function() {
		
		var username 	= $("#username");
		var password 	= $("#password");
		var cpassword 	= $("#cpassword");
		var email	 	= $("#email");
		var cemail	 	= $("#cemail");
		
		errors		= [];
		err_msg_len = 0;
		err_msg 	= "";
	
		if (username.attr("data-required") == "true" && username.val() != ""){
			if (username.val().length < username.attr("data-min") || username.val().length > username.attr("data-max")) {
				pushErroMsg(username.attr( "data-error-len" ));
			} else {
				for (var i=0; i < registerView.getParam().length; ++i) {
					if (i in registerView.getParam()) {
						var s = registerView.getParam()[i];
						if (username.val().contains(s)){
							pushErroMsg(username.attr( "data-error-valid" ));
							break;
						}
					}
				} 
			}
		} else {
			pushErroMsg(username.attr( "data-error-required" ));
		} 
		
		if (password.attr("data-required") == "true" && password.val() != ""){
			if (password.val().length < password.attr("data-min") || password.val().length > password.attr("data-max")) {
				pushErroMsg(password.attr( "data-error-len" ));
			} else if(password.val() != cpassword.val()) {
				pushErroMsg(cpassword.attr( "data-error-message" ));
			}
		} else {
			pushErroMsg(password.attr( "data-error-required" ));
		} 
		
		if (email.attr("data-required") == "true" && email.val() != ""){
			var email_address = email.val();
			if (validateEmail(email_address)){
				if(email.val() != cemail.val()) {
					pushErroMsg(cemail.attr( "data-error-message" ));
				}
			} else {
				pushErroMsg(email.attr( "data-error-valid" ));
			}
		} else {
			pushErroMsg(email.attr( "data-error-required" ));
		} 
		
		if (errors.length == 0) {
			registerView.controlsEnable(true);
			CONFIG.currentUser().register(username.val(), password.val(), email.val(), randomString(5));
		} else {
			showDialog("Warning!", errors.join('</br></br>'), (err_msg_len * 11) + 5, ((errors.length+1) * 40) + 15);
		}
		return false;
	});

	$("#login").bind( "click", function() {
		$(document).trigger("onStateChange", 1);
		return false;
	});
	
	registerView.show();
}