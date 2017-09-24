/*jshint esversion: 6 */

function generateRandomString(len) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < len ; i++){
		text = text + possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}



module.exports = {
		generateRandomString 	: generateRandomString
};