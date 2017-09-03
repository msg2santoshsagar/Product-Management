/*jshint esversion: 6 */

const dbHelper 	 = 	require('./../node/database_helper');

module.exports.login = function(req,res){

	var userId   = null;
	var password = null;

	var reqBody = req.body;
	if( reqBody !== null){
		userId   = reqBody.userId;
		password = reqBody.password;
	}


	if(userId === null ){
		res.send({
			"code": 200,
			"failed":"userId is missing"
		});
	}

	if(password === null ){
		res.send({
			"code": 200,
			"failed":"password is missing"
		});
	}

	var result = dbHelper.executeQuery('select * from user where userid = ?',[userId]);
	res.send({
		"code": 200,
		"data": result
	});

	/*var email= req.body.email;
	var password = req.body.password;
	connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
		if (error) {
			// console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		}else{
			// console.log('The solution is: ', results);
			if(results.length >0){
				if([0].password == password){
					res.send({
						"code":200,
						"success":"login sucessfull"
					});
				}
				else{
					res.send({
						"code":204,
						"success":"Email and password does not match"
					});
				}
			}
			else{
				res.send({
					"code":204,
					"success":"Email does not exits"
				});
			}
		}
	});*/
};
