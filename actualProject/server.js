/*==========================================================
=            bringing stuff up and seting it up            =
==========================================================*/

//express
const express = require('express');
const app = express();

//port
const port = process.env.PORT || 3000;

//router
const router = require('./config/routes.js')

/*=====  End of bringing stuff up and seting it up  ======*/


/*----------  seting the server to use the router  ----------*/
app.use(router);


/*----------  app listen  ----------*/
app.listen(port, function(){
	console.log(`server is up at ${port}`);
})