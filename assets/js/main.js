$(document).ready(function() {
	
	var badWords = new Array();
	var curentStatus = 0;
	var userId = 0;
	var userName = "";
	
	$(document).bind("onSessionCheck", function(event, json) {
		if (json["succeed"] == true && json["error"] == false){
			userId = json["result"].id;
			userName = json["result"].username; 
			init();
		}
	});
	
	$(document).bind("onRegister", function(event, json) {
		if (json["error"] == false) {
			if (json["succeed"] == true) {
				$(document).trigger("onStateChange", 1);
			} else if (json["succeed"] == false){
				alert(json["result"] + " might be taken. Please change and try again.");
				registerView.controlsEnable(false);
			}
		}
	});
	
	$(document).bind("onLogin", function(event, json) {
		if (json["error"] == false) {
			if (json["succeed"] == true){
				userId = json["result"].id;
				CONFIG.currentUser().setId(userId);
				$(document).trigger("onStateChange", 3);
			} else if (json["succeed"] == false) {
				alert("Please check your username and password.");
				loginView.controlsEnable(false);
			}
		}
	});
	
	$(document).bind("onLogout", function(event, json) {
		if (json["succeed"] == true && json["error"] == false){
			userId = json["result"];
			$(document).trigger("onStateChange", 1);
		}
	});
	
	
	$(document).bind("onStateChange", function(event, param) {
		curentStatus = param; // This is real status 
		switch(param) {
			case 1	: loginView.load(onLoginViewLoad); break;
			case 2	: registerView.load(onRegisterViewLoad, badWords); break;
			case 3  : logoutView.load(onLogoutViewLoad); break;
		}
	});
	
	function init(){
		curentStatus++; // This is not real status 
		if (curentStatus == 3){
			CONFIG.createUser();
			if (userId == 0) {
				$(document).trigger("onStateChange", 1);
			} else {
				CONFIG.currentUser().setAccount(userId, userName);
				$(document).trigger("onStateChange", 3);
			}
		}
	}

    function onXMLLoaded(xml){
        $(xml).find('word').each(function(){
            badWords.push($(this).text());
        });
        init();
    }

    function onCSSLoaded(){
        init();
    }

	sessionCheck();
	loadCSS("assets/css/main.css", "main", onCSSLoaded);
	loadXML("listofwords", onXMLLoaded);
});