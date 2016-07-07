// =======================
// private lib
// =======================
var routes = require('express').Router();

routes.get('/one?', function(req, res, next) {
    // console.log(req.query)
    if (!req.query.tradingsymbol) res.end('ERR:PARAMETERS_VALIDATION_FAILED')
    var seneca = req.app.get('settings').seneca;
    seneca.make$('eod').list$(req.query, function(err, val) {
        //console.log('val-->',val)
        if (err) res.end(err)
        //val.data = sort_watchlist(val.data)
        val.tradingsymbol = req.query.tradingsymbol
        val.success = true
        res.json(val);
    })
});
routes.get('/all?', function(req, res, next) {
    // console.log(req.query)
    var seneca = req.app.get('settings').seneca;
    seneca.make$('eod').list$(function(err, val) {
        //console.log('val-->',val)
        if (err) res.end(err)
        //val.data = sort_watchlist(val.data)
     var final_val = {}
        val.forEach(function(item){ final_val[item.tradingsymbol]=item.data$(false)})
       
        final_val.success = true
        final_val.data = val
        res.json(final_val);
    })
});

module.exports.routes = routes;