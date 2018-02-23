/*===============================================================================
=            		bring suff in and seting them up            				=
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
	let a = req.params.field;
	let b = req.params.value;
	console.log(a + " | " + b)
	res.send(a + " | " + b);
	//the actula thing
	
}

/*----------  sending defult page  ----------*/
const defultPage = (req, res) =>{
	console.log('hit the defultPage route')
	res.send('not a valid page');
}

/*==========================  End of controllors  ==========================*/


/*----------  exports  ----------*/
module.exports = {
	index,
	about,
	search,
	defultPage
}