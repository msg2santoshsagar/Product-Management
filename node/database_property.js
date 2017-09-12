/*jshint esversion: 6 */

const DB_HOST 	= process.env.DBHOST 	|| 'localhost';
const DB_PORT 	= process.env.DBPORT 	|| '3306';
const DB_USER 	= process.env.DBUSER 	|| 'root';
const DB_PWD  	= process.env.DBPWD  	|| 'root';
const DB_SCHEMA = process.env.DBSCHEMA  || 'product_management_local';

console.log ("********************DATA BASE PROPERTY********************");
console.log("DB_HOST 	-> ",DB_HOST);
console.log("DB_PORT 	-> ",DB_PORT);
console.log("DB_USER 	-> ",DB_USER);
console.log("DB_PWD  	-> ",DB_PWD);
console.log("DB_SCHEMA 	->  ",DB_SCHEMA);

module.exports = {
		DB_HOST 	: DB_HOST,
		DB_PORT		: DB_PORT,
		DB_USER 	: DB_USER,
		DB_PWD  	: DB_PWD,
		DB_SCHEMA   : DB_SCHEMA
};