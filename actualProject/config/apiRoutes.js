/*==============================================================
=            bringing things in and setting them up            =
==============================================================*/

//express
const express = require('express');
const router = express.Router();


//controllors
const controllor = require('../controllers/apiController.js')

/*=====  End of bringing things in and setting them up  ======*/


/*====================================
=            routs for api           =
=====================================*/

/*----------  get all documnets in inof collection  ----------*/
router.get('/index', controllor.index);

/*----------  get doc from about collection  ----------*/
router.get('/about', controllor.about);

/*----------  query search for info  ----------*/
router.get('/search/:field/:value', controllor.search);

/*----------  adding a new document to the inof collection  ----------*/
router.post('/newDoc', controllor.creatDoc);

/*----------  update  ----------*/
router.post('/updateDoc', controllor.updateDoc);

/*=====  End of routs for api  ======*/


/*----------  exporting ----------*/
module.exports = router;