var mysql 		= require('mysql');
var dbProperty 	= require('./../node/database_property');


var connection = mysql.createConnection({
	host		: dbProperty.DB_HOST,
	port		: dbProperty.DB_PORT,
	user		: dbProperty.DB_USER,
	password	: dbProperty.DB_PWD,
	database    : dbProperty.DB_SCHEMA,
	timezone	: 'UTC+05:30'
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
		connection	:	connection
};