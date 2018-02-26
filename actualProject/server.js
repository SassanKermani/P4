/*==========================================================
=            bringing stuff up and seting it up            =
==========================================================*/

//express
const express = require('express');
const app = express();

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json())

//morgan
const morgan = require('morgan');
app.use(morgan('dev'));

//ejs
const ejs = require('ejs');
app.set('views', './views');
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//port
const port = process.env.PORT || 3000;

//routers
const apiRouter = require('./config/apiRoutes.js');
const guiRouter = require('./config/guiRoutes.js');

/*=====  End of bringing stuff up and seting it up  ======*/


/*----------  seting the server to use the router  ----------*/
app.use(apiRouter);
app.use(guiRouter);

app.get('/*', /*controllor.defultPage*/ function(req, res){
	res.send('not a valid page');
});

/*----------  app listen  ----------*/
app.listen(port, function(){
	console.log(`server is up at ${port}`);
})