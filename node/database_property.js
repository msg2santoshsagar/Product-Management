/*jshint esversion: 6 */

const DB_HOST 	= process.env.DBHOST 	|| 'localhost';
const DB_USER 	= process.env.DBUSER 	|| 'root';
const DB_PWD  	= process.env.DBPWD  	|| 'root';
const DB_SCHEMA = process.env.DBSCHEMA  || 'product_management_local';

console.log ("DATA BASE PROPERTY");
console.info("DB_HOST 	-> ",DB_HOST);
console.info("DB_USER 	-> ",DB_USER);
console.info("DB_PWD  	-> ",DB_PWD);
console.info("DB_SCHEMA ->  ",DB_SCHEMA);

module.exports = {
		DB_HOST 	: DB_HOST,
		DB_USER 	: DB_USER,
		DB_PWD  	: DB_PWD,
		DB_SCHEMA   : DB_SCHEMA
};


