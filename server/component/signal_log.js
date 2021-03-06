// =======================
// private lib
// =======================
const routes = require('express').Router();
// ========== logout
routes.get('/', function (req, res, next) {
  console.log(req.query);
  if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  const seneca = req.app.get('settings').seneca;
  seneca.act('role:signal_log,cmd:all', req.query, function (err, val) {
        // console.log('val-->',val)
    if (err) res.end(err);
            // val.data = sort_watchlist(val.data)
    val.strategy_id = req.query.strategy_id;
    val.data.forEach(function (item) {
      item.trans_log = item.log.map((x) => {
        return {
          val0: x[0],
          val1: x[1],
          val2: x[2],
        };
      });
    });
        // console.log(val.data[0].trans_log)
    res.render('signal_log', val);
  });
});
routes.get('/update?', function (req, res, next) {
  console.log(req.query);
  if (!req.query.strategy_id || !req.query.tradingsymbol || !req.query.action) res.end('ERR:PARAMETERS_VALIDATION_FAILED');
  let url = '';
  if (req.query.action === 'REVERT') url = 'role:signal_log,cmd:revert_signal';
  if (req.query.action === 'DELETE') url = 'role:signal_log,cmd:delete_hard';
  const seneca = req.app.get('settings').seneca;
  seneca.act(url, req.query, function (err, val) {
        // console.log('val-->',val)
    if (err) res.end(err);
            // val.data = sort_watchlist(val.data)
    val.strategy_id = req.query.strategy_id;
    val.success = true;
    res.json(val);
  });
});
module.exports.routes = routes;