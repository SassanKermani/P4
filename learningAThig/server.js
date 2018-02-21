
/*============================================================
=            Bringing in npm's and seting them up            =
============================================================*/

//express
let express = require('express');
let app = express();

//pg 
let pg = require('pg');
const connectionString = 'postgres://localhost:5432/theinfo';		//conection string
const client = new pg.Client(connectionString);						//seting up the connection
client.connect();													//conecting

/*=====  End of Bringing in npm's and seting them up  ======*/

/*----------  test to make sure it works  ----------/
client.query("SELECT * FROM pg_catalog.pg_tables;")
	.then(function(data){
		console.log(data);
	})
	.catch(function(error){
		console.log(error);
	});
// */

/*=============================
=            routs            =
=============================*/

//base rout
app.get('/', function(req, res){	
	res.send(" hey welcom to my api it's going to do some stuff at some point");
});

/*=====  End of routs  ======*/

app.listen(3000, function(){
	console.log("we are up at 3000");
});
