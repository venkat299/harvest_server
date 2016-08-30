const logger = require('winston');
// =======================
// private lib
// =======================
const routes = require('express').Router();
// ========== logout
routes.get('/', (req, res, next) => {
  logger.debug(req.query);
  if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  const seneca = req.app.get('settings').seneca;
  seneca.act('role:order_log,cmd:all', req.query, (err, val) => {
    // logger.debug('val-->', val)
    if (err) res.end(err);
    // val.data = sort_watchlist(val.data)
    val.strategy_id = req.query.strategy_id;
    val.data.forEach((item) => {
      item.trans_log = item.status_log.map((x) => {
        return {
          val0: x[0],
          val1: x[1],
        };
      });
      item.updated_time = item.trans_log[item.trans_log.length - 1].val1;
    });
   // logger.debug(val.data[0].updated_time);
    res.render('order_log', val);
  });
});
routes.get('/all', (req, res, next) => {
  logger.debug(req.query);
  if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  const seneca = req.app.get('settings').seneca;
  seneca.act('role:order_log,cmd:all', req.query, (err, val) => {
    // logger.debug('val-->', val)
    if (err) res.end(err);
    // val.data = sort_watchlist(val.data)
    val.strategy_id = req.query.strategy_id;
    val.success = true;
    res.json(val);
  });
});
routes.get('/approval', (req, res, next) => {
  logger.debug(req.query);
  // if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  const seneca = req.app.get('settings').seneca;
  console.log('request received');
  res.json({ success: true });
});
module.exports.routes = routes;