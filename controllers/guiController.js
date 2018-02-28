/*===============================================================================
=            			bring suff in and seting them up            			=
===============================================================================*/

//mongo stuff
let MongoClient = require('mongodb').MongoClient;
let objectid = require('mongodb').ObjectID;
let url = process.env.MONGODB_URI || `mongodb://localhost:27017/`;

const nameOfDb = "P4";
const infoCollection = "wiki"
const aboutCollection = "about"

/*=================  End of bring suff in and seting them up  =================*/

/*===============================================================================
=            						controllors		            				=
===============================================================================*/

const sendHomePage = (req, res)=>{

	let resultInfoBit;
	let resultAboutBit;
	let resultAll;

	let getInfo = ()=>{
		//finds the first one
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;

		  let dbo = db.db(nameOfDb);
		  let query = { title: req.params.documentTitle };

		  dbo.collection(infoCollection).find({}).project({ title: 1, _id: 0 }).toArray(function(err, result){
		    if (err) throw err;
		    console.log(result);
		    resultInfoBit = result;
		    db.close();
		  });
		});

		getAbout();
	}

	/*----------  getAbout  ----------*/
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

				res.render('home.ejs', {resultAll} );

			});
		});
	}

	getInfo();

};

/*----------  documnetPage  ----------*/
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

/*----------  search though info for tite  ----------*/				//this is real broken right now
const searchThoughInfoForTite = (req, res)=>{
	
	let title = req.params.titleValue;

	//finding all
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  let dbo = db.db(nameOfDb);
	  dbo.collection(infoCollection).find( { title : { $regex: title + '.*'} } ).toArray(function(err, result) {
	    if (err) throw err;
	    console.log(result);
	    //res.send(result);
	    res.render('home.ejs', {result} );
	    db.close();
	  });
	});
}

/*----------  searchThoughInfoForAnything  ----------*/
const searchThoughInfoForAnything = (req, res)=>{
	let field = req.params.field;
	let value = req.params.value;

	let query = { [field] : { $regex: [value] + '.*'} }


	let resultInfoBit;
	let resultAboutBit;
	let resultAll;

	let getInfo = ()=>{
		//finds the first one
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;

		  let dbo = db.db(nameOfDb);
		  //let query = { title: req.params.documentTitle };

		  dbo.collection(infoCollection).find(query).project({ title: 1, _id: 0 }).toArray(function(err, result){
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

				res.render('home.ejs', {resultAll} );

			});
		});
	}

	getInfo();

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

	let myquery = { _id: new objectid( req.body.id ) };
	// ObjectId("5a8f10fab31a3bcc5f606ab3")
	let newvalues = {$set: req.body.data};
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
		dbo.collection(infoCollection).updateOne(myquery, {$set: req.body.data}, function(err, res) {
			if (err) throw err;
			console.log("1 document updated");
			db.close();
		});
	});


	//res.redirect(req.originalUrl);		//figure out how to to relode page
}

/*----------  makeANewInfoDocument  ----------*/
const makeANewInfoDocument = (req, res)=>{

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		let dbo = db.db(nameOfDb);
		dbo.collection(aboutCollection).find({}).toArray(function(err, result) {
			if (err) throw err;
			
			console.log(result);
			res.render('makeANewInfoDocument.ejs', {result});

			db.close();
		});
	});

	//res.render('makeANewInfoDocument.ejs');
}

/*----------  makeANewInfoDocumentPartTwo  ----------*/
const makeANewInfoDocumentPartTwo = (req, res)=>{

	console.log("req.body");
	console.log(req.body);

	let myobj = req.body;

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  let dbo = db.db(nameOfDb);
	  dbo.collection(infoCollection).insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	});

	res.redirect('/homePage');

}

/*----------  makeANewAboutDocument  ----------*/
const makeANewAboutDocument = (req, res)=>{
	res.render('makeANewAboutDocument.ejs');
}

/*----------  makeANewAboutDocumentPartTwo  ----------*/
const makeANewAboutDocumentPartTwo = (req, res)=>{
	console.log("req.body");
	console.log(req.body);

	let myobj = req.body;

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  let dbo = db.db(nameOfDb);
	  dbo.collection(aboutCollection).insertOne(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("1 document inserted");
	    db.close();
	  });
	});

	res.redirect('/homePage');
}

/*==========================  End of controllors  ==========================*/

/*----------  exports  ----------*/
module.exports = {
	sendHomePage,
	documnetPage,
	searchThoughInfoForTite,
	sendAboutCollection,
	updateDocInfo,
	searchThoughInfoForAnything,
	makeANewInfoDocument,
	makeANewInfoDocumentPartTwo,
	makeANewAboutDocument,
	makeANewAboutDocumentPartTwo
}