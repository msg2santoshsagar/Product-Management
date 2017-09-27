/*jshint esversion: 6 */
'use strict';

const express			 	= 	require('express');
const app 				 	= 	express();
const auth       		 	= 	require('./node/authentication');
const user     			 	= 	require('./node/user_controller');
const product  	  		  	= 	require('./node/product_controller');
const productOrderHistory   = 	require('./node/product_order_history_controller');
const sale				    = 	require('./node/sale_controller');
const wsservice			    = 	require('./node/websocket_service');
const bodyParser 			= 	require('body-parser');

const NodeSession 			= 	require('node-session');
//const dbProperty 			= 	require('./node/database_property');

var http = require('http');

var router = express.Router();

var nodeSession = new NodeSession({
	'secret' 	: 'Q3UBzdH0GDBCiRCTKbi5MTPyChpzXLsTA'/*,
	'driver' 	: 'database',
	'lifetime'	:  30 * 60 * 1000,
	'connection': {
		'host': dbProperty.DB_HOST,
		'port': dbProperty.DB_PORT,
		'user': dbProperty.DB_USER,
		'password': dbProperty.DB_PWD,
		'database': dbProperty.DB_SCHEMA
	},
	'table': 'sessions',*/
});

function session(req, res, next){
	nodeSession.startSession(req, res, next);
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session);

router.post('/login',auth.login);
router.post('/currentUser',auth.currentLoggedInUser);
router.post('/logout',auth.logout);

router.post('/user/findAll',user.findAll);
router.post('/user/findOne',user.findOne);
router.post('/user/saveOne',user.saveOne);
router.post('/user/deleteOne',user.deleteOne);
router.post('/user/updateOne',user.updateOne);

router.post('/product/findAll',product.findAll);
router.post('/product/findOne',product.findOne);
router.post('/product/saveOne',product.saveOne);
router.post('/product/deleteOne',product.deleteOne);
router.post('/product/updateOne',product.updateOne);

router.post('/productOrderHistory/findAll',productOrderHistory.findAll);
router.post('/productOrderHistory/findAllCustom',productOrderHistory.findAllCustom);
router.post('/productOrderHistory/findOne',productOrderHistory.findOne);
router.post('/productOrderHistory/saveOne',productOrderHistory.saveOne);
router.post('/productOrderHistory/deleteOne',productOrderHistory.deleteOne);

router.post('/sale/createOrder',sale.createOrder);

app.use('/api', router);


app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//Start the server
const PORT = process.env.PORT || 8080;


app.server = http.createServer(app);

wsservice.websocketServer.installHandlers(app.server);


app.server.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});



/*var appServer = app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});*/