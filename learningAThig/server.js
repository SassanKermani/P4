
/*============================================================
=            Bringing in npm's and seting them up            =
============================================================*/

//express
let express = require('express');
let app = express();

//body-parser
let bodyParser = require('body-parser');
app.use(bodyParser());

//pg 
let pg = require('pg');
//const connectionString = 'postgres://localhost:5432/theinfo';		//conection string

//for testing with a db with mose data in it
const connectionString = 'postgres://localhost:5432/carmen';		//conection string

const client = new pg.Client(connectionString);						//seting up the connection
client.connect();													//conecting

/*=====  End of Bringing in npm's and seting them up  ======*/

/*----------  test to make sure it works  ----------/
client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
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

app.get('/seeAllTables', function(req, res){	
	//for testing
	// res.send(" you hit the seeAllTables rout ");
	// console.log("you hit the seeAllTables rout");

	client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
		.then(function(data){
			//console.log(data);
			//res.send(data);
			res.send(data.rows);
		})
		.catch(function(error){
			//console.log(error);
			res.send(error);
		});

});

//sending a sql and responding with responce form the db
app.post('/plainSql', function(req, res){
	//for testing purpeses
	// console.log("hit plainSql rout")
	// console.log(req.body.sql);
	// res.send(req.body.sql);
	client.query(req.body.sql)
	.then(function(data){
		//console.log(data);
		res.send(data);
	})
	.catch(function(error){
		//console.log(error);
		res.send(error);
	});
});

/*----------  this is gana be a thing buckle up buter cup time for a some looping bulshit  ----------*/

client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
	.then(function(data){
		//console.log(data);

		//bulshit start hear
		let i = 0;
		while(data.rows[i] != null){
			console.log( "i: " + i);
			console.log(data.rows[i].table_name);
			i = i + 1;

			//stay strong more bullshit ahead
			client.query(`select column_name from information_schema.columns where table_name='${data.rows[i].table_name}';`)
				.then(function(datanew){
					console.log(datanew.rows);
				})
				.catch(function(error){
					console.log(error);
				});
		}
	})
	.catch(function(error){
		//console.log(error);
	});

/*=====  End of routs  ======*/

app.listen(3000, function(){
	console.log("we are up at 3000");
});
