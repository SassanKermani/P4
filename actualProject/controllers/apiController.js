/*===============================================================================
=            			bring suff in and seting them up            			=
===============================================================================*/

//mongo stuff
let MongoClient = require('mongodb').MongoClient;
let url = `mongodb://localhost:27017/`;

const nameOfDb = "P4";
const infoCollection = "wiki"
const aboutCollection = "about"

/*=================  End of bring suff in and seting them up  =================*/


/*===============================================================================
=            						controllors		            				=
===============================================================================*/

/*----------  index of all documents in collection  ----------*/
const index = (req, res) =>{
	//finding all
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  let dbo = db.db(nameOfDb);
	  dbo.collection(infoCollection).find({}).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    res.send(result)
	    db.close();
	  });
	});
}

/*----------  get the doc form the about collection  ----------*/
const about = (req, res) =>{
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  let dbo = db.db(nameOfDb);
	  dbo.collection(aboutCollection).findOne({}, function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    res.send(result)
	    db.close();
	  });
	});
}
/*----------  searching for a doc in the about collection  ----------*/
const search = (req, res) =>{
	//making sure i know what im doing
	let field = req.params.field;
	let value = req.params.value;
	console.log(field + " | " + value)
	console.log(typeof (field))
	//res.send(field + " | " + value);
	//the actula thing
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		let dbo = db.db(nameOfDb);
		let query = { [field] : value };
		dbo.collection(infoCollection).find(query).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			res.send(result);
			db.close();
		});
	});

}

/*----------  creating a new document in the about collection  ----------*/
const creatDoc = (req, res) =>{
	console.log('you hit the creatDoc route');
	// console.log(req.body);
	// res.send(req.body);
	// res.send("stuff");

	let myobj = req.body;

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		let dbo = db.db(nameOfDb);
		
		dbo.collection(infoCollection).insertOne(myobj, function(err, res) {
			if (err) throw err;
			console.log(req.body);
		db.close();
		});
	});
	res.send(myobj);
}

/************************************************************
*************************************************************
*	this update beat you up and it could agean watch it 	*
*************************************************************
************************************************************/
/*----------  Subsection comment block  ----------*/
const updateDoc = (req, res)=>{

	let myquery = { _id: req.body.id };
	let newvalues = { $set: req.body.data };

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		let dbo = db.db(nameOfDb);
		dbo.collection("chats").updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log("1 document updated");
			db.close();
		});
	});
}

/************************************************************
*************************************************************
*	this update beat you up and it could agean watch it 	*
*************************************************************
************************************************************/


/*==========================  End of controllors  ==========================*/


/*----------  exports  ----------*/
module.exports = {
	index,
	about,
	search,
	creatDoc,
	updateDoc,
}