// =======================
// private lib
// =======================
const routes = require('express').Router();
const logger = require('winston');

routes.get('/one?', function (req, res, next) {
    // console.log(req.query)
  if (!req.query.tradingsymbol) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  const seneca = req.app.get('settings').seneca;
  seneca.make$('eod').list$(req.query, function (err, val) {
        // console.log('val-->',val)
    if (err) res.end(err);
        // val.data = sort_watchlist(val.data)
    val.tradingsymbol = req.query.tradingsymbol;
    val.success = true;
    res.json(val);
  });
});
routes.get('/all?', function (req, res, next) {
    // console.log(req.query)
  const seneca = req.app.get('settings').seneca;
  seneca.make$('eod').list$(function (err, val) {
        // console.log('val-->',val)
    if (err) res.end(err);
        // val.data = sort_watchlist(val.data)
    const final_val = {};
    val.forEach(function (item) { final_val[item.tradingsymbol] = item.data$(false); });

    final_val.success = true;
    final_val.data = val;
    res.json(final_val);
  });
});

// ========== runs routine for the stock
routes.get('/eod_download?', (req, res) => {
  // logger.debug(req.query)
  logger.debug(req.query);
  const agenda = req.app.get('settings').agenda;
  agenda.now('eod_download', {}, () => {
    logger.debug('eod_download job: added to database');
  });
});

module.exports.routes = routes;