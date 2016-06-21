// =======================
// private lib
// =======================
var routes = require('express').Router();

// ========== logout 
routes.get('/', function(req, res, next) {
	console.log(req.query)
	var val = {success:true,data:[ {
			strategy_id: 'fifty_2_wk',
			status:'INACTIVE',
			budget: 10000,
			spent: 2000,
			equity_ceil: 0.2
		}, {
			strategy_id: 'dummy_strategy1',
			status:'INACTIVE',
			budget: 10000,
			spent: 2000,
			equity_ceil: 0.2
		},
		{
			strategy_id: 'dummy_strategy2',
			status:'INACTIVE',
			budget: 10000,
			spent: 2000,
			equity_ceil: 0.2
		}]}
	res.render('watchlist', val);
});



module.exports.routes = routes;