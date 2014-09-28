function onLogoutViewLoad(){
	
	$( "#username" ).html( CONFIG.currentUser().getUsername());
	
	$( "#logout" ).unbind( "click", function() {});
	$( "#logout" ).bind( "click", function() {
		CONFIG.currentUser().logout();	
		return false;
	});
	
	logoutView.show();
}