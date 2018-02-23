/*==============================================================
=            bringing things in and setting them up            =
==============================================================*/

//express
const express = require('express');
const router = express.Router();

//controllors
const controllor = require('../controllers/mainController.js')

/*=====  End of bringing things in and setting them up  ======*/

/*=============================
=            routs            =
=============================*/

/*----------  get all documnets in inof collection  ----------*/
router.get('/index', controllor.index);

/*----------  get doc from about collection  ----------*/
router.get('/about', controllor.about);

/*----------  query search for info  ----------*/
router.get('/search/:field/:value', controllor.search);

/*----------  defult  ----------*/
router.get('/*', controllor.defultPage);

/*=====  End of routs  ======*/


/*----------  exporting ----------*/
module.exports = router;