/*jshint esversion: 6 */
'use strict';

const express	 = 	require('express');
const app 		 = 	express();
const dbHelper 	 = 	require('./node/database_helper');



app.use(express.static('public'));

//Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});