var mysql 		= require('mysql');
var dbProperty 	= require('./../node/database_property');
var transaction = require('node-mysql-transaction');

var dbPropertyObject = {
		user		: dbProperty.DB_USER,
		password	: dbProperty.DB_PWD,
		database    : dbProperty.DB_SCHEMA,
		timezone	: 'UTC+05:30'
};


if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
	//For Production Environment
	dbPropertyObject.socketPath = "/cloudsql/"+process.env.INSTANCE_CONNECTION_NAME;
}else{
	//For Other Environment
	dbPropertyObject.host = dbProperty.DB_HOST;
	dbPropertyObject.port = dbProperty.DB_PORT;
}

var keySet = Object.keys(dbPropertyObject);

console.log ("********************DATA BASE PROPERTY********************");
for(var i=0; i<keySet.length; i++){
	console.log("DB-CONFIG :: ",keySet[i],"=",dbPropertyObject[keySet[i]]);
}

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