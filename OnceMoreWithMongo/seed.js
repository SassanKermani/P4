//set up 
let MongoClient = require('mongodb').MongoClient;
let url = `mongodb://localhost:27017/`;

// //clearing the collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("P4");
//   dbo.collection("wiki").drop(function(err, delOK) {
//     if (err) throw err;
//     if (delOK) console.log("all clear");
//     db.close();
//   });
// });

//data that im seeding 
let myobj = { test: "testy test test", alsoTest: "This is a thing" };

let infoData =[
	{
		title : "welcome",
		body : "there can be a lot of text here"
	},
	{
		title : "hello",
		body : "there can be a some text here"
	},
	{
		title : "this is an entry",
		body : "bla bla bla bal bla bla bla bla "
	}
];

let aboutData = [
	{
		feald : "title",
		value : "string"
	},
	{
		feald : "body",
		value : "string"
	}
]

// //insert example
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P4");
//   dbo.collection("wiki").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

// //insert many example
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = [
//     { name: 'John', address: 'Highway 71'},
//     { name: 'Peter', address: 'Lowstreet 4'},
//     { name: 'Amy', address: 'Apple st 652'},
//     { name: 'Hannah', address: 'Mountain 21'},
//     { name: 'Michael', address: 'Valley 345'},
//     { name: 'Sandy', address: 'Ocean blvd 2'},
//     { name: 'Betty', address: 'Green Grass 1'},
//     { name: 'Richard', address: 'Sky st 331'},
//     { name: 'Susan', address: 'One way 98'},
//     { name: 'Vicky', address: 'Yellow Garden 2'},
//     { name: 'Ben', address: 'Park Lane 38'},
//     { name: 'William', address: 'Central st 954'},
//     { name: 'Chuck', address: 'Main Road 989'},
//     { name: 'Viola', address: 'Sideway 1633'}
//   ];
//   dbo.collection("customers").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("Number of documents inserted: " + res.insertedCount);
//     db.close();
//   });
// });

//////////////////////////////////////////////////////////////////////////////////////////

//the actual insert INFO

MongoClient.connect(url, function(err, db){
	if (err) throw err;
	let dbo = db.db("P4");
	dbo.collection("wiki").insertMany(infoData, function(err, res){
    	if (err) throw err;
    	console.log("data seeded " + res.insertedCount);
    	db.close();
  	});
});

// MongoClient.connect(url, function(err, db){
// 	if (err) throw err;
// 	let dbo = db.db("P4");
// 	dbo.collection("wiki").drop();
// });

//////////////////////////////////////////////////////////////////////////////////////////

// //the actual insert ABOUT
// MongoClient.connect(url, function(err, db){
// 	if (err) throw err;
// 	let dbo = db.db("P4");
// 	dbo.collection("about").insertMany(aboutData, function(err, res){
//     	if (err) throw err;
//     	console.log("data seeded " + res.insertedCount);
//     	db.close();
//   	});
// });

// //seeing whats in my db
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   let dbo = db.db("P4");
//   dbo.collection("wiki").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });