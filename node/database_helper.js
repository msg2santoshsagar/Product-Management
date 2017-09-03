var mysql 		= require('mysql');
var dbProperty 	= require('./../node/database_property');


var con = mysql.createConnection({
	host		: dbProperty.DB_HOST,
	user		: dbProperty.DB_USER,
	password	: dbProperty.DB_PWD
});

con.connect(function(err) {
	if (err){
		throw err;
	}
	console.log("Connected!");
	con.query("select * from "+dbProperty.DB_SCHEMA+".user;", function (err, result) {
		if (err){
			throw err;
		}
		console.log("Result: ", result);
	});
});