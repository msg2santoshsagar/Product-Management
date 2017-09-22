/*jshint esversion: 6 */

const dbHelper = require('./../node/database_helper');
const con 	   = dbHelper.connection;
const trCon    = dbHelper.trCon;


const SALE_INSERT_QUERY 			= 	"insert into sale ( total_amount, createdBy, createdDate, updatedBy, updatedDate ) values(?, ?, ?, ?, ?); ";
const SALE_PRODUCT_INSERT_QUERY 	= 	"insert into sale_product_list ( order_no, product_id , price , quantity , total ) values(?, ?, ?, ?, ?); ";

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

	var chain = trCon.chain();

	chain.
	on('commit', function(){
		console.log('Commit Successfull');
	}).
	on('rollback', function(err){
		console.log("Error occured while doing transaction");
		console.log(err);
	});

	chain.
	query(SALE_INSERT_QUERY, orderObject).
	on('result', function(result){
		var orderId = result.insertId;
		console.log("ORDER ID == > ",orderId);
	});


	callback(null,productList);

}


module.exports = {
		createOrder : createOrder
};