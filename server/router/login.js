// =======================
// private lib
// =======================
var routes = require('express').Router();
var URI = require('urijs');
var url_parse = require('url-parse');
var checksum = require('checksum');
//Load the request module
var request = require('request');

//var feedImpl = require('../impl/feed.js');
// ### go to home page
routes.get('/', function(req, res, next) {

	//check if logged in kite connect
	var kite = req.app.get('config').kite;
	var url = new URI(kite.api_login_url);
	url.addQuery("api_key", kite.api_key);
	console.log(url.toString());
	console.log('req.app.locals.kite_login:', req.app.locals.kite_login);
	res.redirect(url.toString());

});

// ========== logout 
routes.get('/close', function(req, res, next) {

	//check if logged in kite connect
	var kite = req.app.get('config').kite;
	var url = new URI(kite.api_endpoint +  '/session/token');
	url.addQuery("api_key", kite.api_key);
	url.addQuery("access_token",req.app.locals.kite_access_token);


		//Lets configure and request
	request({
		url: url.toString(), //URL to hit
		method: 'DELETE',
	}, function(error, response, body) {
		if (error) {
			console.log(error);
			res.render('index', {
				kite: {
					logout: true,
					error: error
				}
			});
		} else {
			body = JSON.parse(body);
			res.render('index', {
				kite: {
					login_status:  'log in'
				}
			});
		}
	});

});

// ======= private api
routes.get('/ok', function(req, res, next) {

	var kite = req.app.get('config').kite;
	var param = kite.api_key + req.query.request_token + kite.api_secret;
	param = checksum(param, {
		algorithm: 'sha256'
	});

	var url = new URI(kite.api_endpoint + '/session/token');
	url.addQuery("api_key", kite.api_key);
	url.addQuery("request_token", req.query.request_token);
	url.addQuery("checksum", param);

	//Lets configure and request
	request({
		url: url.toString(), //URL to hit
		method: 'POST',
	}, function(error, response, body) {
		if (error) {
			console.log(error);
			res.render('index', {
				kite: {
					logout: true,
					error: error
				}
			});
		} else {
			body = JSON.parse(body);
			req.app.locals.kite_access_token = body.data.access_token;
			res.render('index', {
				kite: {
					login_status: (body.status === 'success' ? 'logged in' : 'log in'),
					data: body.data
				}
			});
		}
	});

	// res.redirect()

	// res.render('index',{kite:{login:false}});

});
// // ### dispatch recent feeds
// routes.get('/recent?', function(req, res, next) {
// 	//console.log(req.query)
// 	feedImpl.getRecent(req.query).then(function(val) {
// 		res.render('posts', val);
// 	});
// });
// routes.get('/nextRecent?', function(req, res, next) {
// 	console.log(req.query)
// 	feedImpl.getRecent(req.query)
// 		.then(function(resultJson) {
// 			//console.log(resultJson)
// 			if (resultJson.msg)
// 				res.render('feed_no_more', resultJson);
// 			else
// 				res.render('posts_next', resultJson);
// 		});
// });
module.exports.routes = routes;