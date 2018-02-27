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

const sendHomePage = (req, res)=>{
	//limiting the filds that you see
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		let dbo = db.db(nameOfDb);
		dbo.collection(infoCollection).find({}).project({ title: 1, _id: 0 }).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			res.render('home.ejs', {result} );
			//res.send(result);
			db.close();
		});
	});
};

const documnetPage = (req, res)=>{

	////////////////////////////////////////////////////////////////////////////////

	let resultInfoBit;
	let resultAboutBit;
	let resultAll;

	////////////////////////////////////////////////////////////////////////////////

	let getInfo = ()=>{
		//finds the first one
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;

		  let dbo = db.db(nameOfDb);
		  let query = { title: req.params.documentTitle };

		  dbo.collection(infoCollection).findOne(query, function(err, result) {
		    if (err) throw err;
		    console.log(result);
		    resultInfoBit = result;
		    db.close();
		  });
		});

		getAbout();
	}

	let getAbout = ()=>{
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;
			let dbo = db.db(nameOfDb);
			dbo.collection(aboutCollection).find({}).toArray(function(err, result) {
				if (err) throw err;
				console.log(result);
				resultAboutBit = result;
				db.close();

				resultAll = {
					"resultInfo" : resultInfoBit, 
					"resultAbout" : resultAboutBit
				};

				console.log( "resultAll" );
				console.log(resultAll);

				res.render('infoDocument.ejs', {resultAll} );

			});
		});
	}

	getInfo();

}

/*----------  search though info for tite  ----------*/				//this should prablay go in the api spot too
const searchThoughInfoForTite = (req, res)=>{
	
	let title = req.params.titleValue;

	//res.send(title);

	//finding all
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  let dbo = db.db(nameOfDb);
	  dbo.collection(infoCollection).find( { title : { $regex: title + '.*'} } ).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    res.send(result);
	    db.close();
	  });
	});

}

/*----------  send about collection  ----------*/
const sendAboutCollection = (req, res)=>{
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		let dbo = db.db(nameOfDb);
		dbo.collection(aboutCollection).find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);
			res.send(result);
			db.close();
		});
	});
}

/*----------  update Doc in Info collection  ----------*/
const updateDocInfo = (req, res) =>{

	// console.log(req.body);

	// console.log("---");
	// console.log("---");
	// console.log("---");

	let myquery = { _id: req.body.id };
	let newvalues = { $set: req.body.data };
	// let newvalues = req.body.data;
	// var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
	// var newvalues = { '$set': { title: ' hello ', body: ' there can be a some text here ' } }

	console.log("myquery");
	console.log(myquery);

	console.log("newvalues");
	console.log( newvalues );
	//var newvalues = { $set: { name: "Michael", address: "Canyon 123" } };

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		let dbo = db.db(nameOfDb);
		dbo.collection(infoCollection).updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log("1 document updated");
			db.close();
		});
	});

	//res.redirect(req.originalUrl);		//figure out how to to relode page
}

/*==========================  End of controllors  ==========================*/

/*----------  exports  ----------*/
module.exports = {
	sendHomePage,
	documnetPage,
	searchThoughInfoForTite,
	sendAboutCollection,
	updateDocInfo
}