/*jshint esversion: 6 */
'use strict';

const express			 	= 	require('express');
const app 				 	= 	express();
const auth       		 	= require('./node/authentication');
const user     			 	= require('./node/user_controller');
const product  	  		  	= require('./node/product_controller');
const productOrderHistory   = require('./node/product_order_history_controller');
const bodyParser 			= require('body-parser');

var router = express.Router();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post('/login',auth.login);

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
router.post('/productOrderHistory/findOne',productOrderHistory.findOne);
router.post('/productOrderHistory/saveOne',productOrderHistory.saveOne);
router.post('/productOrderHistory/deleteOne',productOrderHistory.deleteOne);

app.use('/api', router);


app.get('*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

//Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});