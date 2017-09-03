/*jshint esversion: 6 */

const dbHelper = require('./../node/database_helper');
const con 	   = dbHelper.connection;

const FIND_ALL_QUERY = "select * from user";

function findAll(callback){

	con.query(FIND_ALL_QUERY, [],  function (err, result) {
		if (err){
			callback(null,err);
		}
		callback(result,null);
	});
}

module.exports = {
		findAll : findAll	
};