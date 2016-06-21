module.exports.set = function(app, settings) {

	// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index');
		//res.redirect('/login');
	});

	// ### all rest APIs
	app.use('/watchlist', require('../component/watchlist.js').routes);
	app.use('/strategy', require('../component/strategy.js').routes);

}