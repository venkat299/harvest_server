// =======================
// private lib
// =======================
var routes = require('express').Router();

// ========== logout 
routes.get('/', function(req, res, next) {
	//console.log(req.query)
	var val = {success:true,
		strategy_id:"fifty_2_wk",data:[ 
		{
			"entity$": {
				"name": "strategy_stock"
			},
			"strategy_id": "fifty_2_wk",
			"tradingsymbol": "YESBANK",
			"stock_ceil": 0.4,
			"nrr": 0.8,
			"profit_margin": 1.1,
			"buy_price_threshold": 1.25,
			"prev_buy_price": 990,
			"prev_sell_price": 140,
			"id": "edf25z"
		},
			{
			"entity$": {
				"name": "strategy_stock"
			},
			"strategy_id": "fifty_2_wk",
			"tradingsymbol": "DENA",
			"stock_ceil": 0.4,
			"nrr": 0.8,
			"profit_margin": 1.1,
			"buy_price_threshold": 1.25,
			"prev_buy_price": 990,
			"prev_sell_price": 140,
			"id": "edf25z"
		},
			{
			"entity$": {
				"name": "strategy_stock"
			},
			"strategy_id": "fifty_2_wk",
			"tradingsymbol": "SBI",
			"stock_ceil": 0.4,
			"nrr": 0.8,
			"profit_margin": 1.1,
			"buy_price_threshold": 1.25,
			"prev_buy_price": 990,
			"prev_sell_price": 140,
			"id": "edf25z"
		}
]}
	res.render('strategy_stock', val);
});



module.exports.routes = routes;