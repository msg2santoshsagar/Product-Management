/*jshint esversion: 6 */

const userRepository = require('./../node/user_repository');

function findAll(req,res){

	function responseHanler( errorData, successData ){
		if(successData !== null){

			for(var i =0; i<successData.length; i++){
				delete successData[i].password;
			}

			res.send({
				code : 200,
				data : successData
			});
		}else{
			res.send({
				code 		 : 500,
				MessageCode  : errorData.code,
				Message      : errorData.sqlMessage
			});
		}
	}

	userRepository.findAll(responseHanler);
}

function findOne(req,res){

	function responseHanler( errorData, successData ){
		if(successData !== null){

			for(var i =0; i<successData.length; i++){
				delete successData[i].password;
			}

			res.send({
				code : 200,
				data : successData[0] || null
			});
		}else{
			res.send({
				code 		 : 500,
				MessageCode  : errorData.code,
				Message      : errorData.sqlMessage
			});
		}
	}

	var id = req.body.id;

	userRepository.findOne(id, responseHanler);
}

function saveOne(req,res){

	function responseHanler( errorData,successData ){
		if(successData !== null){
			res.send({
				code : 200,
				data : successData
			});
		}else{
			res.send({
				code         : 500,
				MessageCode  : errorData.code,
				Message      : errorData.sqlMessage
			});
		}
	}

	var user = req.body;
	var loggedInUser = "1";
	var currentDate = new Date();

	user.createdBy   = loggedInUser;
	user.createdDate = currentDate;
	user.updatedBy   = loggedInUser;
	user.updatedDate = currentDate;

	console.log("Request to save user ",user);

	var userDataToSave =  [user.name , user.role, user.userid.toUpperCase(), user.password, user.active, user.createdBy, user.createdDate, user.updatedBy, user.updatedDate];
	userRepository.saveOne(userDataToSave, responseHanler);
}

function updateOne(req,res){

	function responseHanler( errorData,successData ){
		if(successData !== null){
			res.send({
				code : 200,
				data : successData
			});
		}else{
			res.send({
				code         : 500,
				MessageCode  : errorData.code,
				Message      : errorData.sqlMessage
			});
		}
	}

	var user = req.body;
	var loggedInUser = "1";
	var currentDate = new Date();

	user.updatedBy   = loggedInUser;
	user.updatedDate = currentDate;

	console.log("Request to update user ",user);

	var userDataToUpdate =  [user.name , user.role, user.userid.toUpperCase() , user.active,  user.updatedBy, user.updatedDate, user.id];

	console.log("User Data to update ",userDataToUpdate);

	userRepository.updateOne(userDataToUpdate, responseHanler);
}

function deleteOne(req,res){

	function responseHanler( errorData,successData ){
		if(successData !== null){
			res.send({
				code : 200,
				data : successData
			});
		}else{
			res.send({
				code 		 : 500,
				MessageCode  : errorData.code,
				Message      : errorData.sqlMessage
			});
		}
	}

	var user = req.body;

	var idToDelete = user.id;

	userRepository.deleteOne(idToDelete, responseHanler);
}

module.exports = {
		findAll 	: findAll,
		findOne		: findOne,
		saveOne 	: saveOne,
		deleteOne 	: deleteOne,
		updateOne 	: updateOne
};