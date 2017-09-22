/*jshint esversion: 6 */

const saleRepository	= require('./../node/sale_repository');
const emitter 			= require('./../node/customEventEmitter');


function createOrder(req,res){

	var productList	 = req.body;
	var loggedInUser = "1";

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

	console.log("Product List to sale :: ",productList);

	saleRepository.createOrder( productList, loggedInUser, responseHanler);
}


function eventHandler(code, payload){
	emitter.emitEvent( 'UPDATE_DASHBOARD', code , payload);
}

emitter.registerEvent( 'ORDER_CREATED', eventHandler);


module.exports = {
		createOrder : createOrder
};