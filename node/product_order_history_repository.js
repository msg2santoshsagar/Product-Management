/*jshint esversion: 6 */

const dbHelper = require('./../node/database_helper');
const con 	   = dbHelper.connection;

const FIND_ALL_QUERY 		= "select * from product_order_history";
const FIND_ONE_QUERY 		= "select * from product_order_history where id = ?";
const SAVE_ONE_QUERY 		= "insert into product_order_history (product_id , quantity, createdBy, createdDate, updatedBy, updatedDate) values( ?, ?, ?, ?, ?, ? ) ";
const DELETE_ONE_QUERY		= "delete from product_order_history where id = ? ";

function findAll(callback){

	con.query(FIND_ALL_QUERY, [],  function (err, result) {
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

module.exports = {
		findAll 				: findAll,
		saveOne 				: saveOne,
		deleteOne   			: deleteOne,
		findOne					: findOne
};