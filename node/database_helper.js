var mysql 		= require('mysql');
var dbProperty 	= require('./../node/database_property');
var transaction = require('node-mysql-transaction');

var dbPropertyObject = {
		host		: dbProperty.DB_HOST,
		port		: dbProperty.DB_PORT,
		user		: dbProperty.DB_USER,
		password	: dbProperty.DB_PWD,
		database    : dbProperty.DB_SCHEMA,
		timezone	: 'UTC+05:30'
};


var connection = mysql.createConnection(dbPropertyObject);

var trCon = transaction({

	// mysql driver set 
	connection: [mysql.createConnection,dbPropertyObject],

	// create temporary connection for increased volume of async work.
	// if request queue became empty, 
	// start soft removing process of the connection.
	// recommended for normal usage.
	dynamicConnection: 32,

	// set dynamicConnection soft removing time.
	idleConnectionCutoffTime: 1000,

	// auto timeout rollback time in ms
	// turn off is 0
	timeout:600
});



connection.connect(function(err){
	if(err){
		console.error(err);
		console.error("ERROR OCCURED WHILE CONNECTING *********************");
		return;
	}
	console.log("Connected to database");

});


/*function executeQuery(query, param){
	con.connect(function(err) {
		if (err){
			throw err;
		}
		console.log("Connected");
		con.query(query, param,  function (err, result) {
			if (err){
				throw err;
			}
			console.log("RESULT FROM HELPER --- ");
			console.log(result);
			return result;
		});
	});
}
 */
module.exports = {
		connection	:	connection,
		trCon		:	trCon,
		data		: dbPropertyObject
};