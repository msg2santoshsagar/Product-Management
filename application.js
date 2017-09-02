
/*var http = require('http');
var serveStatic = require('serve-static');

 https://github.com/expressjs/serve-static#serve-files-with-vanilla-nodejs-http-server
 * Serve up public/ folder 
var servePublic = serveStatic('public', {'index': ['index.html', 'index.htm']});


//Start the server
const PORT = process.env.PORT || 8080;

http.createServer(function handler(req, res) {
	console.log(req.method, req.url, 'HTTPS'+req.httpVersion, req.headers); // , req is too long

	//res.setHeader('Access-Control-Allow-Origin', '127.0.0.1');

	servePublic(req, res, function nextHandler(req, res){
	});    
}).listen(PORT,() => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});*/

'use strict';

//[START app]
const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.status(200).send('Product Management Application').end();
});

//Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});