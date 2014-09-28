function showDialog(title, content, width, height) {
	$("#dialog-modal").html(content);
    $("#dialog-modal").dialog({
        height: height,
		width: width,
		"title" : title
    });
}

function reverseString(s){
	return s.split("").reverse().join("");
}

function validateEmail(str) { 
    var lastAtPos = str.lastIndexOf('@');
    var lastDotPos = str.lastIndexOf('.');
    return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
} 

function randomString(len, bits) {
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len) {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase(); //Math.random().toString(36).substr(2, 5).toUpperCase();
}

if ( !String.prototype.contains ) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

Object.create = function(parent) {
	function Temp() {}
	Temp.prototype = parent;
	return new Temp();
}

function decryptTripleDES(encrypted, key, iv){
	var decrypted = CryptoJS.TripleDES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(key),  { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });
	return decrypted.toString(CryptoJS.enc.Utf8);
}

function toJson(jsonStr){
	return JSON.parse(jsonStr);
}

function decryptTripleDEStoJSON(encrypted){
	return toJson(decryptTripleDES(reverseString(encrypted.trim()), CONFIG.key(), CONFIG.iv()));
}

function call(type, url, data, onSuccess, onError){
	$.ajax({
		type: type,
		//contentType	: "application/x-www-form-urlencoded",
		url: url,
		//dataType: xml, text
		data : data,
		success: onSuccess,
		error : onError
	});
}

function loadXML(file, onSuccess, onError) {
	call(
		"GET", 
		file+".xml", 
		"", 
		onSuccess,
		onError
	);
}

function loadTemplate(file, onSuccess, onError) {
	call(
		"GET", 
		file+".html", 
		"", 
		onSuccess,
		onError
	);
}

function loadCSS(href, id, callback) {
	if($("#template-container").size() > 0){
		if (document.createStyleSheet){
			document.createStyleSheet(href);
		} else {
			$("#"+id).remove();
			$("head").append("<link id='"+id+"' rel='stylesheet' type='text/css' href='"+href+"'>"); 
			if (callback) callback();
		}
	}
}

function loadJS(src, id, callback) {
	 $("#"+id).remove();
	 $("head").append("<script type='text/javascript' id='"+id+"' src='"+src+"'>"); 
	 if (callback) callback();
}

function sessionCheck() {
	call(
		"POST", 
		CONFIG.url(), 
		"master=mr&operation=sessionCheck", 
		function(req){
			$(document).trigger("onSessionCheck", decryptTripleDEStoJSON(req));
		}, 
		function(xhr, ajaxOptions, thrownErrow){
			console.log("common.sessionCheck : error");
            console.log(xhr.status);
            console.log(thrownErrow);
		}
	);
}