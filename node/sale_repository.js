/*jshint esversion: 6 */

const dbHelper 	= require('./../node/database_helper');
const emitter 	= require('./../node/customEventEmitter');
const con 	   	= dbHelper.connection;
const trCon    	= dbHelper.trCon;


const SALE_INSERT_QUERY 			= 	"insert into sale ( total_amount, createdBy, createdDate, updatedBy, updatedDate ) values(?, ?, ?, ?, ?); ";
const SALE_PRODUCT_INSERT_QUERY 	= 	"insert into sale_product_list ( order_no, product_id , price , quantity , total ) values(?, ?, ?, ?, ?); ";
const UPDATE_PROJECT_CURRENT_STOCK	=	"update product set current_stock = current_stock - ? where id = ? ; ";
const FIND_PRODUCT_QTY				= 	"select id, current_stock from product where id = ?";

function insertQueryBuilder (query , param){

}


function createOrder( productList , user , callback ){

	var totalAmount = 0;
	var currentDate = new Date();


	for( var i =0; i< productList.length; i++){
		totalAmount  =  totalAmount + ( productList[i].price * productList[i].quantity );
	}

	console.log("Total Amount to create order - ",totalAmount);

	var orderObject = [ totalAmount, user, currentDate, user, currentDate];

	var currentStockObj = [];

	var chain = trCon.chain();

	chain.
	on('commit', function(){
		console.log('Commit Successfull');
		emitter.emitEvent( 'ORDER_CREATED', 'NEW_ORDER' ,currentStockObj );
	}).
	on('rollback', function(err){
		console.log("Error occured while doing transaction");
		console.log(err);
	});

	function resultHandler(result){
		console.log("RESYKT --- ",result);
		currentStockObj.push({
			'id' 		: result.id,
			'quantity' 	: result.current_stock	 
		});
	}

	chain.
	query(SALE_INSERT_QUERY, orderObject).
	on('result', function(result){
		var orderId = result.insertId;
		console.log("ORDER ID == > ",orderId);

		for(var i = 0; i < productList.length ; i += 1 ) {
			// loop in transaction

			var product    = productList[i];
			var productObj = [ orderId, product.id, product.price, product.quantity, product.price * product.quantity ];
			var updateProductObj = [product.quantity , product.id ];
			
			chain.
			query(SALE_PRODUCT_INSERT_QUERY , productObj ).
			query(UPDATE_PROJECT_CURRENT_STOCK , updateProductObj ).
			query(FIND_PRODUCT_QTY , product.id ).
			on('result',resultHandler);
		}

	});


	callback(null,productList);

}


module.exports = {
		createOrder : createOrder
};