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

/*==========================  End of controllors  ==========================*/

/*----------  exports  ----------*/
module.exports = {
	sendHomePage,
}