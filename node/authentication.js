/*jshint esversion: 6 */

const userRepository = require('./../node/user_repository');

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

	function loginResponseHandler(err,successData){

		console.log("ERROR 		::: ", err);
		console.log("SUCCESS 	::: ", successData);

		if(successData !== null){

			if( successData.length > 0 &&  password === successData[0].password ){

				var  userData = successData[0];

				if(userData.active === "YES"){
					req.session.put('id', userData.id);
					req.session.put('userId', userData.userid);
					req.session.put('userName', userData.name);
					req.session.put('role', userData.role);

					res.send({
						code 	 : 200,
						"status" : "pass"
					});
				}else{
					res.send({
						"code": 200,
						"status" : "failed",
						"reason" :"You are not active user, contact admin."
					});
				}

			}else{
				res.send({
					"code": 200,
					"status" : "failed",
					"reason" :"Please check your credentials and try again."
				});
			}

		}else{
			res.status(500).send({
				code         : 500,
				status		 : "failed",
				"reason" 	 : "System is facing some issue, please try later",
				MessageCode  : err.code,
				Message      : err.sqlMessage
			});
		}
	}


	userRepository.findOneByUserId(userName,loginResponseHandler);

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
