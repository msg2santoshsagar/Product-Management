/*jshint esversion: 6 */

const projectRepository = require('./../node/product_repository');
const webSocketService  = require('./../node/websocket_service');
const emitter 			= require('./../node/customEventEmitter');



function findAll(req,res){

	function responseHanler( errorData, successData ){
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

	projectRepository.findAll(responseHanler);
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

	var product = req.body;
	var loggedInUser = "1";
	var currentDate = new Date();

	product.createdBy   = loggedInUser;
	product.createdDate = currentDate;
	product.updatedBy   = loggedInUser;
	product.updatedDate = currentDate;

	function responseHanler( errorData,successData ){
		if(successData !== null){

			product.id =successData.insertId;

			emitter.emitEvent( 'UPDATE_DASHBOARD', 'PRODUCT_ADDED' ,product);

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

	console.log("Request to save product ",product);

	var productDataToSave =  [product.name.toUpperCase(), product.price , product.threshold_stock, product.createdBy, product.createdDate, product.updatedBy, product.updatedDate ];

	console.log("Sending product data to save ",productDataToSave);

	projectRepository.saveOne(productDataToSave, responseHanler);
}

function updateOne(req,res){

	var product = req.body;
	var loggedInUser = "1";
	var currentDate = new Date();

	product.updatedBy   = loggedInUser;
	product.updatedDate = currentDate;

	function responseHanler( errorData,successData ){
		if(successData !== null){

			emitter.emitEvent( 'UPDATE_DASHBOARD', 'PRODUCT_UPDATED' ,product);

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



	console.log("Request to update product ",product);

	var userDataToUpdate =  [product.name.toUpperCase(), product.price , product.threshold_stock, product.updatedBy, product.updatedDate, product.id];

	console.log("Product Data to update ",userDataToUpdate);

	projectRepository.updateOne(userDataToUpdate, responseHanler);
}

function deleteOne(req,res){

	var product = req.body;

	var idToDelete = product.id;

	function responseHanler( errorData,successData ){
		if(successData !== null){

			emitter.emitEvent( 'UPDATE_DASHBOARD', 'PRODUCT_DELETED' ,product);

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

	projectRepository.deleteOne(idToDelete, responseHanler);
}

//emitter.on( 'UPDATE_DASHBOARD', webSocketService.updateDashboardHandler);

module.exports = {
		findAll 	: findAll,
		findOne		: findOne,
		saveOne 	: saveOne,
		deleteOne 	: deleteOne,
		updateOne 	: updateOne
};