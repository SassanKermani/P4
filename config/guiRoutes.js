/*==============================================================
=            bringing things in and setting them up            =
==============================================================*/

//express
const express = require('express');
const router = express.Router();


//controllors
const controllor = require('../controllers/guiController.js')

/*=====  End of bringing things in and setting them up  ======*/

/*=====================================
=            routs for gui            =
=====================================*/

/*----------  test  ----------*/
router.get('/thisIsAnArbatrayThingForTeesting', function(req, res){
	res.send("stuff");
})

/*----------  sending home page with all documents in info collection  ----------*/
router.get('/homePage', controllor.sendHomePage);

/*----------  sending all documents in about collection  ----------*/
router.get('/sendAboutCollection', controllor.sendAboutCollection);

/*----------  search though info collection by title  ----------*/
router.get('/searchThoughInfoForTite/:titleValue', controllor.searchThoughInfoForTite);

/*----------  search though info collection by any  ----------*/							//working on it
router.get('/searchThoughInfoForAnything/:field/:value', controllor.searchThoughInfoForAnything);

/*----------  loop for all inof collections dcoument endpoints  ----------*/
router.get('/infoCollection/:documentTitle', controllor.documnetPage);

/*----------  update a document  ----------*/
router.post('/updateDocInfo', controllor.updateDocInfo);

/*----------  make A New Info Document  ----------*/
router.get('/makeANewInfoDocument', controllor.makeANewInfoDocument);

/*----------  make A New Info Document  ----------*/
router.post('/makeANewInfoDocument', controllor.makeANewInfoDocumentPartTwo);

//stuff im working on 

/*----------  make A New Info Document  ----------*/
router.get('/makeANewAboutDocument', controllor.makeANewAboutDocument);

/*----------  make A New About Document  ----------*/
router.post('/makeANewAboutDocument', controllor.makeANewAboutDocumentPartTwo);

//stuff im working on 

/*=====  End of routs for gui  ======*/


/*----------  exporting ----------*/
module.exports = router;