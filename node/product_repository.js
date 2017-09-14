/*jshint esversion: 6 */

const dbHelper = require('./../node/database_helper');
const con 	   = dbHelper.connection;

const FIND_ALL_QUERY 		= "select * from product";
const FIND_ONE_QUERY 		= "select * from product where id = ?";
const SAVE_ONE_QUERY 		= "insert into product (name , price , threshold_stock, createdBy, createdDate, updatedBy, updatedDate) values( ?, ?, ?, ?, ?, ?, ? ) ";
const DELETE_ONE_QUERY		= "delete from product where id = ? ";
const FIND_ID_BY_NAME_IC 	= "select id from product where UPPER(name) = UPPER(?) ";
const UPDATE_ONE_QUERY 		= "update product set name = ? , set price = ? , threshold_stock = ? , updatedBy = ? , updatedDate = ? where id = ? ";

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

function updateOne(productData,callback){

	con.query(UPDATE_ONE_QUERY, productData ,  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});

}

function findIdByProductName(name,callback){

	con.query(FIND_ID_BY_NAME_IC, [name] ,  function (err, result) {
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
		updateOne				: updateOne,
		deleteOne   			: deleteOne,
		findIdByProductName 	: findIdByProductName,
		findOne					: findOne
};