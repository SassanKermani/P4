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

router.get('/thisIsAnArbatrayThingForTeesting', function(req, res){
	res.send("stuff");
})

router.get('/homePage', controllor.sendHomePage);

/*=====  End of routs for gui  ======*/


/*----------  exporting ----------*/
module.exports = router;