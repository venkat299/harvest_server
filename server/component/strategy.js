// =======================
// private lib
// =======================
/* eslint new-cap:0 */
const routes = require('express').Router();

// ========== logout
routes.get('/', (req, res) => {
  const seneca = req.app.get('settings').seneca;
  seneca.make$('strategy').list$({}, (err, list) => {
    // console.log('val-->',val)
    const val = {
      success: true,
      data: [],
    };
    if (err) res.end(err);
    list.forEach((item) => val.data.push(item.data$(false)));
    val.success = true;
    res.render('strategy', val);
  });
});

module.exports.routes = routes;