/*=============================================================
=            Bringing things in and seting them up            =
=============================================================*/
let port = 3000;

const express = require('express');
const app = express();

//mongo stuff
let MongoClient = require('mongodb').MongoClient;
let url = `mongodb://localhost:27017/`;

/*=====  End of Bringing things in and seting them up  ======*/

/*=====================================================
=            Testing some stuff with mongo            =
=====================================================*/

// //finds the first one
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P2");
//   dbo.collection("chats").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });


// //finding all
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P2");
//   dbo.collection("chats").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });


// //query
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P2");
//   let query = { name: "Dug" };
//   dbo.collection("chats").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// //also a query
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P2");
//   let query = { message: "bla bla bla" };
//   dbo.collection("chats").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// //also a query serchis by id
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P2");
//   let query = { _id: "5a71264d7929210ec4ca8569" };
//   dbo.collection("chats").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

// //insert
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P2");
//   let myobj = { test: "testy test test", alsoTest: "This is a thing" };
//   dbo.collection("chats").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

// //updating
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P2");
//   let myquery = { name: "bla bla bal " };
//   let newvalues = { $set: {name: "DaveFreeman@gmail.com", message: "la la la" } };
//   dbo.collection("chats").updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     console.log("1 document updated");
//     db.close();
//   });
// });

// //limiting the filds that you see
// MongoClient.connect(url, function(err, db) {
// 	if (err) throw err;
// 	let dbo = db.db("P2");
// 	dbo.collection("chats").find({}).project({ item: 1, name: 1, message: 1, _id: 0 }).toArray(function(err, result) {
// 		if (err) throw err;
// 		console.log(result);
// 		res.send(result);
// 		db.close();
// 	});
// });

/*=====  End of Testing some stuff with mongo  ======*/


/*============================================================================
=            Routs should probably me moved to its oun file later            =
============================================================================*/

//get everything in collecton 
app.get('/', function(req, res){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  let dbo = db.db("P2");
	  dbo.collection("chats").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    //console.log(result);
	    res.send(result);
	    db.close();
	  });
	});
	//res.send("test");
});



//catch all / sanity cheack 
app.get('/*', function(req, res){
	res.send("dose not look like this is a page");
})

/*=====  End of Routs should probably me moved to its oun file later  ======*/


/*----------  spining up the server  ----------*/
app.listen(port, function(){
	console.log(`up at ${port}`)
});