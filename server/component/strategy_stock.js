// =======================
// private lib
// =======================
const routes = require('express').Router();
const sort = require('../helper/sort');
    // ========== logout
routes.get('/', function (req, res, next) {
    // console.log(req.query)
  console.log(req.query);
  if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  const seneca = req.app.get('settings').seneca;
  seneca.act('role:strategy_stock,cmd:all', req.query, function (err, val) {
        // console.log('val-->',val)
    if (err) res.end(err);
    val.data = sort_watchlist(val.data);
    val.strategy_id = req.query.strategy_id;
        // seneca.make$('eod').list$(function(err, ls) {
        //     if (err) res.end(err)
        //     ls.forEach(function(eod) {
        //         var idx = val.data.findIndex((item) => {
        //             return item.tradingsymbol === eod.tradingsymbol
        //         })
        //         if (idx >= 0) val.data[idx].close = eod.close
        //     })
        //     //console.log(val.data[0],ls)
        //    res.render('strategy_stock', val);
        // })
    res.render('strategy_stock', val);
  });
});

function sort_watchlist(list) {
    // Sort by price high to low
  list.sort(sort('nrr', true, parseFloat));
  return list;
}
module.exports.routes = routes;