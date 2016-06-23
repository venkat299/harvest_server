// =======================
// public lib
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var mustache = require('mustache-express');
var forceSSL = require('express-force-ssl');
var fs = require('fs');
var http = require('http');
var https = require('https');
// =======================
// private lib
// =======================
var routes = require('./server/router');
var config = require('./config.json');
//var logger = require('./app_logger').logger;
// var ssl_config     = {
//     key: fs.readFileSync('file.pem'),
//     cert: fs.readFileSync('file.crt')
// };
// =======================
// application logic
// =======================
var app = express();
var server = http.createServer(app);
//var secureServer = https.createServer(ssl_config, app);
// ### log module
//app.use(logger);


// ### parsing request
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json()); // to support JSON-encoded bodies

// ### setting view engine
app.engine('html', mustache());
app.set('view engine', 'html'); // set up ejs for templating
app.set('views', __dirname + '/frontend/html');


// ### compress all requests
app.use(compression());

// ### serving static files
app.use('/client_lib', express.static(__dirname + '/frontend/client_module')); // all js files
app.use('/client_style', express.static(__dirname + '/frontend/css')); // all css files
app.use('/client_img', express.static(__dirname + '/frontend/custom_img'));
app.use('/semantic', express.static(__dirname + '/semantic'));

// respond with "hello world" when a GET request is made to the homepage
//app.get('/', function(req, res) {
//res.send('hello world');
//	res.render('index')
//});




//######### seneca api integration ##########

var harvest_strategy = require('harvest_strategy');
var seneca = require('seneca')()
	.use('entity')
	.use(harvest_strategy)
	.client({port:'8000'})


	// ======= change db here =========
var test_db = config.test.current_db
	// ================================
var test_db_name = config.test[test_db].db_type
var test_db_config = config.test[test_db].db_config

// ###### adding test db  ########
	try {
		seneca.use(test_db_name, test_db_config)
	} catch (err) {
		console.log(err)
	}

/*
{
    type: 'http',
    port: '8000',
    host: 'localhost',
    protocol: 'https'
  }*/
app.use(seneca.export('web'))

//###########################################

//######### setting app level configs ##########
var settings = {
	seneca: seneca
	// db: config.db
		//passport: passport,
		//ensureLoggedIn:ensureLoggedIn
};
app.set('settings', settings)

module.exports = app; //exporting app config before
//app.set('config', config)
//###########################################

routes.set(app);


//app.use(forceSSL);
//secureServer.listen(3000)
server.listen(8000, function() {
	var host = server.address().address
	var port = server.address().port
	console.log('app listening at http://%s :%s ', host, port)
})

// ### start app
// var server = app.listen(process.env.PORT || 8080, function() {

// 	var host = server.address().address
// 	var port = server.address().port

// 	console.log('app listening at http://%s :%s ', host, port)
// 	//console.log(config)

// });