/**
 * Web Socket Service
 * 
 * Change the module name according to the required application.
 * Stomp.js and sock.js is required to run this service.
 * 
 */
angular
.module('productManagement')
.factory('WebSocketService',['$q', '$timeout',function WebSocketService($q,$timeout){
	var service = {}, listener = $q.defer(), socket = {
		client: null,
		stomp: null
	};

	service.RECONNECT_TIMEOUT = 10000;
	service.SOCKET_URL = "/app-end-point";
	service.CHAT_TOPIC = "/user/queue/message";
	service.CHAT_BROKER = "/app/message-receiver";


	service.send = function(message) {
		//Service to send message
		socket.stomp.send(service.CHAT_BROKER, {
			priority: 9
		}, JSON.stringify(message));
	};

	service.receive = function() {
		//Service to receive message
		return listener.promise;
	};

	function initialize() {
		//Service to initialize
		var defer = $q.defer();

		socket.client = new SockJS(service.SOCKET_URL);
		socket.stomp = Stomp.over(socket.client);

		socket.stomp.connect('', '', function(frame) {
			defer.resolve(true);
			var whoami = frame.headers['user-name'];
			console.info('Connected: ',whoami);
			socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
				listener.notify(data.body);
			});
		},function(err){
			console.error("Not Able to connect web socket ",err);
			defer.reject(false);
		});
		socket.stomp.onclose = reconnect;
		return defer.promise;
	}

	var reconnect = function() {
		$timeout(function() {
			initialize();
		}, this.RECONNECT_TIMEOUT);
	};

	service.initConnection  = initialize;

	service.disconnect = function(){
		//Service to disconnect
		if(socket.stomp === null){
			return;
		}
		socket.stomp.disconnect(function(){
			console.log("disconnected");
		});
	};

	return service;
}]);