/*jshint esversion: 6 */

const dbHelper = require('./../node/database_helper');
const con 	   = dbHelper.connection;

const FIND_ALL_QUERY 		= "select * from product_order_history";
const FIND_ALL_QUERY_CUSTOM	= "select poh.id, poh.product_id , p.name product_name, poh.price, poh.quantity, poh.createdDate  from product_order_history poh, product p where p.id = poh.product_id";
const FIND_ONE_QUERY 		= "select * from product_order_history where id = ?";
const SAVE_ONE_QUERY 		= "insert into product_order_history (product_id , quantity, price , createdBy, createdDate, updatedBy, updatedDate) values( ?, ?, ?, ?, ?, ?, ? ) ";
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

module.exports = {
		findAll 				: findAll,
		findAllCustom			: findAllCustom,
		saveOne 				: saveOne,
		deleteOne   			: deleteOne,
		findOne					: findOne
};