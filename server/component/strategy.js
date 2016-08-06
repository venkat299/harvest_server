// =======================
// private lib
// =======================
const routes = require('express').Router();

// ========== logout
routes.get('/', function (req, res, next) {
	// console.log(req.query)
	                const val = { success: true, data: [{
			                    strategy_id: 'fifty_2_wk',
			                    desc: 'Strategy that sells when stock comes near 52 wk low and sells at x% profit',
			                    status: 'INACTIVE',
			                    budget: 10000,
			                    spent: 2000,
			                    equity_ceil: 0.2,
		}, {
			                    strategy_id: 'dummy_strategy1',
			                    desc: 'Strategy that sells when stock comes near 52 wk low and sells at x% profit',
			                    status: 'INACTIVE',
			                    budget: 10000,
			                    spent: 2000,
			                    equity_ceil: 0.2,
		},
		                    {
			                                        strategy_id: 'dummy_strategy2',
			                                        desc: 'Strategy that sells when stock comes near 52 wk low and sells at x% profit',
			                                        status: 'INACTIVE',
			                                        budget: 10000,
			                                        spent: 2000,
			                                        equity_ceil: 0.2,
		                    }] };
	                    res.render('strategy', val);
});


module.exports.routes = routes;