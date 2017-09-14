/*jshint esversion: 6 */

const projectRepository = require('./../node/product_order_history_repository');

function findAll(req,res){

	function responseHanler( errorData, successData ){
		if(successData !== null){
			console.log("****Product Order History ::  FINDALL :: ");
			console.log(successData);
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

	projectRepository.findAll(responseHanler);
}

function findAllCustom(req,res){

	function responseHanler( errorData, successData ){
		if(successData !== null){
			console.log("****Product Order History ::  FINDALL CUSTOM:: ");
			console.log(successData);
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

	projectRepository.findAllCustom(responseHanler);
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

	projectRepository.findOne(id, responseHanler);
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

	var product = req.body;
	var loggedInUser = "ADMIN";
	var currentDate = new Date();

	product.createdBy   = loggedInUser;
	product.createdDate = currentDate;
	product.updatedBy   = loggedInUser;
	product.updatedDate = currentDate;

	console.log("Request to save product order ",product);

	var productDataToSave =  [product.product_id , product.quantity, product.price, product.createdBy, product.createdDate, product.updatedBy, product.updatedDate ];
	
	console.log("Sending product data to save order",productDataToSave);
	
	projectRepository.saveOne(productDataToSave, responseHanler);
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

	projectRepository.deleteOne(idToDelete, responseHanler);
}

module.exports = {
		findAll 		: findAll,
		findAllCustom 	: findAllCustom,
		findOne			: findOne,
		saveOne 		: saveOne,
		deleteOne 		: deleteOne
};