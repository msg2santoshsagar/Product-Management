/*jshint esversion: 6 */

const dbHelper = require('./../node/database_helper');
const con 	   = dbHelper.connection;

const FIND_ALL_QUERY 		= "select * from user";
const SAVE_ONE_QUERY 		= "insert into user (name , role, userid, password, active, createdBy, createdDate, updatedBy, updatedDate) values( ?, ?, ?, ?, ?, ?, ?, ?, ? ) ";
const DELETE_ONE_QUERY		= "delete from user where id = ? ";
const FIND_ID_BY_USERID_IC 	= "select id from user where UPPER(userid) = UPPER(?) ";
const UPDATE_ONE_QUERY 		= "update user set name = ? , role = ? , userid = ? , active = ? , updatedBy = ? , updatedDate = ? where id = ? ";

function findAll(callback){

	con.query(FIND_ALL_QUERY, [],  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});
}

function saveOne(userData,callback){

	con.query(SAVE_ONE_QUERY, userData ,  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});

}

function updateOne(userData,callback){

	con.query(UPDATE_ONE_QUERY, userData ,  function (err, result) {
		if (err){
			callback(err,null);
			return;
		}
		callback(null,result);
	});

}

function finIdByUserId(userId,callback){

	con.query(FIND_ID_BY_USERID_IC, [userId] ,  function (err, result) {
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
		findAll 		: findAll,
		saveOne 		: saveOne,
		updateOne		: updateOne,
		deleteOne   	: deleteOne,
		finIdByUserId 	: finIdByUserId
};