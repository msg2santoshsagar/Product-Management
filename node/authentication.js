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

		/*// init 
		var	session = new NodeSession( {secret: myFunction.generateRandomString(32) });

		session.startSession(req, res,function(){
			console.log("New Session created");
		});*/

		console.log("USERNAME AND PASSWORD MATCHED PUTTING DATA INTO SESSION -- ",req.session.all());

		req.session.put('userId', 1);
		req.session.put('userName', userName);
		req.session.put('role', "ADMIN");

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

function currentLoggedInUser(req,res){

	var userId 		= req.session.get('userId');
	var userName 	= req.session.get('userName');
	var role 		= req.session.get('role');
	var loggedIn 	= true;

	if(userId === undefined || userId === null){
		loggedIn	= false;
	}

	var userData = {
			'id'		: userId,
			'name'		: userName,
			'role' 		: role,
			'loggedIn' 	: loggedIn
	};

	console.log("USERDATA ==> ",userData);

	res.send({
		"code": 200,
		"user":userData
	});

}

function logout(req,res){

	req.session.flush();

	res.send({
		"code": 200,
		"status" : "loggedoff"
	});

}


module.exports = {
		login 				 : login,
		currentLoggedInUser  : currentLoggedInUser,
		logout				 : logout
};
