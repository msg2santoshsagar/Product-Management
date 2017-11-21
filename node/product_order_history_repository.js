/*jshint esversion: 6 */

const dbHelper = require('./../node/database_helper');
const con 	   = dbHelper.connection;

const FIND_ALL_QUERY 		= "select * from product_order_history";
const FIND_ALL_QUERY_CUSTOM	= "select poh.id, poh.product_id , p.name product_name, poh.price, poh.quantity, poh.createdDate  from product_order_history poh, product p where p.id = poh.product_id";
const FIND_ONE_QUERY 		= "select * from product_order_history where id = ?";
const SAVE_ONE_QUERY 		= "insert into product_order_history (product_id , quantity, price , createdBy, createdDate, updatedBy, updatedDate) values( ?, ?, ?, ?, ?, ?, ? ) ";
const DELETE_ONE_QUERY		= "delete from product_order_history where id = ? ";
const UPDATE_PRODUCT_QTY    = "update product set current_stock = current_stock + ? , price = ?  , updatedBy = ? , updatedDate = ? where id = ? ";
const FIND_PRODUCT_QTY		= "select current_stock from product where id = ?";

function findAll(callback){

	con.query(FIND_ALL_QUERY, [],  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});
}

function findAllCustom(callback){

	con.query(FIND_ALL_QUERY_CUSTOM, [],  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});
}

function findOne(id ,callback){

	con.query(FIND_ONE_QUERY, [id],  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});
}

function saveOne(productData,callback){

	con.query(SAVE_ONE_QUERY, productData ,  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});

}

function deleteOne(id ,callback){

	con.query(DELETE_ONE_QUERY, [id] ,  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});
}


function saveAndUpdateProduct(productData , callback){
	con.beginTransaction(function(err) {

		if (err) { 
			callback(err,null);
			return;
		}

		con.query(SAVE_ONE_QUERY, productData, function(err, result) {
			if (err) { 
				con.rollback(function() {
					callback(err,null);
					return;
				});
			}

			var ProductTableData = [productData[1], productData[2], productData[5], productData[6], productData[0]];

			console.log("**Product Table Data **** ",ProductTableData);

			con.query(UPDATE_PRODUCT_QTY, ProductTableData , function(err, result) {
				if (err) { 
					con.rollback(function() {
						callback(err,null);
						return;
					});
				}  
				con.query(FIND_PRODUCT_QTY , productData[0] , function(err, result){
					if (err) { 
						con.rollback(function() {
							callback(err,null);
							return;
						});
					} 
					con.commit(function(err) {
						if (err) { 
							con.rollback(function() {
								callback(err,null);
								return;
							});
						}
						console.log('Transaction Complete.');
						//con.end();
						callback(null,result);
					});
				});
			});
		});
	});

}


module.exports = {
		findAll 				: findAll,
		findAllCustom			: findAllCustom,
		saveOne 				: saveOne,
		saveAndUpdateProduct	: saveAndUpdateProduct,
		deleteOne   			: deleteOne,
		findOne					: findOne
};