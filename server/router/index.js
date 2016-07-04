module.exports.set = function(app, settings) {
    // normal routes ===============================================================
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('strategy');
        //res.redirect('/login');
    });
    // ### all rest APIs
    app.use('/watchlist', require('../component/watchlist.js').routes);
    app.use('/strategy', require('../component/strategy.js').routes);
    app.use('/strategy_stock', require('../component/strategy_stock.js').routes);
    app.use('/signal_log', require('../component/signal_log.js').routes);
    app.use('/order_log', require('../component/order_log.js').routes);
    app.use('/eod', require('../component/eod.js').routes);
}