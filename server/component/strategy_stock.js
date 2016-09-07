// =======================
// private lib
// =======================
/* eslint no-param-reassign:0 */
/* eslint new-cap:0 */
const routes = require('express').Router();
const sort = require('../helper/sort');
const logger = require('winston');

// helper function
function sort_watchlist(list) {
  // Sort by price high to low
  list.sort(sort('nrr', true, parseFloat));
  return list;
}

// ========== logout
routes.get('/', (req, res) => {
  // logger.debug(req.query)
  logger.debug(req.query);
  if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  const seneca = req.app.get('settings').seneca;
  seneca.act('role:strategy_stock,cmd:all', req.query, (err, val) => {
    // logger.debug('val-->',val)
    if (err) res.end(err);
    val.data = sort_watchlist(val.data);
    val.strategy_id = req.query.strategy_id;
    res.render('strategy_stock', val);
  });
});

// ========== reset all signals and order_log
routes.get('/reset', (req, res) => {
  // logger.debug(req.query)
  logger.debug(req.query);
  if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  const seneca = req.app.get('settings').seneca;
  seneca.act('role:strategy_stock,cmd:reset_strategy', req.query, (err, val) => {
    // logger.debug('val-->',val)
    if (err) res.end(err);
    res.json(val);
  });
});

// ========== runs routine for the stock
routes.get('/run', (req, res) => {
  // logger.debug(req.query)
  logger.debug(req.query);
  if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  // const seneca = req.app.get('settings').seneca;
  const agenda = req.app.get('settings').agenda;
  agenda.now('fifty_2_wk_eod_run', {}, () => {
    logger.debug('fifty_2_wk_eod_run job: added to database');
  });
});

module.exports.routes = routes;