/*jshint esversion: 6 */

var NodeSession 	= 	require('node-session');
var myFunction    	= 	require('./../node/my_function');

function login(req,res){

	var userName   = null;
	var password = null;

	var reqBody = req.body;

	if( reqBody !== null){
		userName   = reqBody.username;
		password = reqBody.password;
	}


	if(userName === null ){
		res.send({
			"code": 200,
			"status" : "failed",
			"reason":"user name is missing"
		});
	}

	if(password === null ){
		res.send({
			"code": 200,
			"status" : "failed",
			"reason":"password is missing"
		});
	}


	if(userName === password){

		// init 
		var	session = new NodeSession( {secret: myFunction.generateRandomString(32) });

		session.startSession(req, res, function(session){
			console.log("Session created  ==> ",session);
		});

		req.session.put('userName', userName);

		res.send({
			"code": 200,
			"status" : "pass"
		});
	}else{
		res.send({
			"code": 200,
			"status" : "failed",
			"reason" :"Please check your credentials and try again."
		});
	}

}


module.exports = {
		login 	: login
};
