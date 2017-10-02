/*jshint esversion: 6 */

const sockjs 			= require('sockjs');
const emitter 			= require('./../node/customEventEmitter');


//Clients list
var clients = {};

const wsOptions = {
		"sockjs_url"	: 	"https://cdn.jsdelivr.net/sockjs/1.1.4/sockjs.min.js",
		"prefix"		:	"/websocket"
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