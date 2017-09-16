/*jshint esversion: 6 */

//const ws				    = 	require("nodejs-websocket");

//Start the Websocket server
//const WSPORT = process.env.WSPORT || 8081;

/*var server = ws.createServer(function (conn) {
	console.log("New connection");
	conn.on("text", function (str) {
		console.log("Received "+str);
		conn.sendText(str.toUpperCase()+"!!!");
	});
	conn.on("close", function (code, reason) {
		console.log("Connection closed");
	});
}).listen(WSPORT);*/


const sockjs = require('sockjs');
const emitter 			= require('./../node/customEventEmitter');


//Clients list
var clients = {};

const wsOptions = {
		'sockjs_url'	: 	'http://cdn.jsdelivr.net/sockjs/1.1.4/sockjs.min.js',
		'prefix'		:	'/websocket'
} ;

var websocketServer = sockjs.createServer(wsOptions);

websocketServer.on('connection', function(conn) {

	console.log("New Connection Established");

	// add this client to clients object
	clients[conn.id] = conn;

	conn.on('data', function(message) {
		conn.write(message);
	});
	conn.on('close', function(code, reason) {
		delete clients[conn.id];
		console.log("Connection closed");
	});
});

function createBrodcastMessage(code,payload){
	var obj 		= 	{};
	obj.code 		= 	code;
	obj.data	 	= 	payload;
	return obj;
}

//Broadcast to all clients
function broadcast( code, payload ){
	var message = createBrodcastMessage(code , payload );
	// iterate through each client in clients object
	for (var client in clients){
		if (clients.hasOwnProperty(client)) {
			// send the message to that client
			clients[client].write(JSON.stringify(message));
		}
	}
}

function updateDashboardHandler(code, payload){
	console.log("Update Dashboard handler called");
	broadcast(code, payload);
}

emitter.registerEvent( 'UPDATE_DASHBOARD', updateDashboardHandler);


module.exports ={
		websocketServer : websocketServer,
		broadcast		: broadcast,
		updateDashboardHandler : updateDashboardHandler
};