//express
const express = require('express');
const app = express();

// //body parser
const bodyParser = require('body-parser');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const port = 5000

const path = require('path');

app.get('/', function(req, res){
	console.log("stuff")
	res.sendFile(path.join(__dirname + '/formThing.html'));
})

app.post('/thing', function(req, res){
	console.log("also stuff");
	console.log(req.body);
	res.send(req.body);
})

app.listen(port, function(){
	console.log(`server is up at ${port}`);
})