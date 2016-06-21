// =======================
// private lib
// =======================
var routes = require('express').Router();

// ========== logout 
routes.get('/', function(req, res, next) {
	console.log(req.query)
	if (!req.query.strategy_id)
		res.end('ERR:PARAMETERS_VALIDATION_FAILED')


var seneca = req.app.get('settings').seneca;
	seneca.act('role:watchlist,cmd:all', req.query, function(err, val) {
		//console.log('val-->',val)
		if (err)
			res.end(err)

		val.strategy_id=req.query.strategy_id
		res.render('watchlist', val);
	})
});

routes.get('/all', function(req, res, next) {
	console.log(req.query)
	if (!req.query.strategy_id)
		res.end('ERR:PARAMETERS_VALIDATION_FAILED')


	var seneca = req.app.get('settings').seneca;
	seneca.act('role:watchlist,cmd:all', req.query, function(err, val) {
		//console.log('val-->',val)
		if (err)
			res.end(err)

		res.json(val)
	})

});

routes.get('/add', function(req, res, next) {
	console.log(req.query)
	if (!(req.query.strategy_id && req.query.tradingsymbol))
		res.end('ERR:PARAMETERS_VALIDATION_FAILED')
	var seneca = req.app.get('settings').seneca;
	seneca.act('role:watchlist,cmd:add', req.query, function(err, val) {
		//console.log('val-->',val)
		if (err)
			res.end(err)

		res.json(val)
	})
});
routes.get('/retire', function(req, res, next) {
	console.log(req.query)
	if (!(req.query.strategy_id && req.query.tradingsymbol))
		res.end('ERR:PARAMETERS_VALIDATION_FAILED')

	var seneca = req.app.get('settings').seneca;
	seneca.act('role:watchlist,cmd:retire', req.query, function(err, val) {
		//console.log('val-->',val)
		if (err)
			res.end(err)

		res.json(val)
	})

});

routes.get('/activate', function(req, res, next) {
	console.log(req.query)
	if (!(req.query.strategy_id && req.query.tradingsymbol))
		res.end('ERR:PARAMETERS_VALIDATION_FAILED')

	var seneca = req.app.get('settings').seneca;
	seneca.act('role:watchlist,cmd:activate', req.query, function(err, val) {
		//console.log('val-->',val)
		if (err)
			res.end(err)

		res.json(val)
	})

});


routes.get('/remove', function(req, res, next) {
	console.log(req.query)
	if (!(req.query.strategy_id && req.query.tradingsymbol))
		res.end('ERR:PARAMETERS_VALIDATION_FAILED')

	var resultJson = {
			success: true,
			strategy_id: req.query.strategy_id ,
			tradingsymbol: req.query.tradingsymbol
		}
	var pos = dummy_data.findIndex(function(item){return item.tradingsymbol===req.query.tradingsymbol})
	dummy_data.splice(pos,1)
	res.json(resultJson);
});

routes.get('/routine', function(req, res, next) {
	console.log(req.query)
	if (!(req.query.strategy_id && req.query.tradingsymbol))
		res.end('ERR:PARAMETERS_VALIDATION_FAILED')

	var seneca = req.app.get('settings').seneca;
	seneca.act('role:routine,cmd:run_routine', req.query, function(err, val) {
		//console.log('val-->',val)
		if (err)
			res.end(err)

		res.json(val)
	})

});

routes.get('/monthly_eod', function(req, res, next) {
	
	var seneca = req.app.get('settings').seneca;
	seneca.act('role:routine,cmd:monthly_eod_update', {}, function(err, val) {
		//console.log('val-->',val)
		if (err)
			res.end(err)

		res.json(val)
	})

});

routes.get('/search', function(req, res, next) {
	console.log(req.query)

var data = dummy_stock_list.filter(function(item){return item.title.toUpperCase().indexOf(req.query.q.toUpperCase())>=0})
	var resultJson = {
			success: true,
			results:data
		}
	res.json(resultJson);

});


var dummy_stock_list = [{'title': 'ACC'},
{'title': 'ADANIPORTS'},
{'title': 'AMBUJACEM'},
{'title': 'ASIANPAINT'},
{'title': 'AUROPHARMA'},
{'title': 'AXISBANK'},
{'title': 'BAJAJ-AUTO'},
{'title': 'BANKBARODA'},
{'title': 'BHEL'},
{'title': 'BPCL'},
{'title': 'BHARTIARTL'},
{'title': 'INFRATEL'},
{'title': 'BOSCHLTD'},
{'title': 'CIPLA'},
{'title': 'COALINDIA'},
{'title': 'DRREDDY'},
{'title': 'EICHERMOT'},
{'title': 'GAIL'},
{'title': 'GRASIM'},
{'title': 'HCLTECH'},
{'title': 'HDFCBANK'},
{'title': 'HEROMOTOCO'},
{'title': 'HINDALCO'},
{'title': 'HINDUNILVR'},
{'title': 'HDFC'},
{'title': 'ITC'},
{'title': 'ICICIBANK'},
{'title': 'IDEA'},
{'title': 'INDUSINDBK'},
{'title': 'INFY'},
{'title': 'KOTAKBANK'},
{'title': 'LT'},
{'title': 'LUPIN'},
{'title': 'M&M'},
{'title': 'MARUTI'},
{'title': 'NTPC'},
{'title': 'ONGC'},
{'title': 'POWERGRID'},
{'title': 'RELIANCE'},
{'title': 'SBIN'},
{'title': 'SUNPHARMA'},
{'title': 'TCS'},
{'title': 'TATAMTRDVR'},
{'title': 'TATAMOTORS'},
{'title': 'TATAPOWER'},
{'title': 'TATASTEEL'},
{'title': 'TECHM'},
{'title': 'ULTRACEMCO'},
{'title': 'WIPRO'},
{'title': 'YESBANK'},
{'title': 'ZEEL'},
{'title': 'AARTIDRUGS'},
{'title': 'ASAHISONG'},
{'title': 'BBTC'},
{'title': 'ENGINERSIN'},
{'title': 'EXCELINDUS'},
{'title': 'GMBREW'},
{'title': 'JBMA'},
{'title': 'KABRAEXTRU'},
{'title': 'MANALIPETC'},
{'title': 'MARUTI'},
{'title': 'MIRZAINT'},
{'title': 'POLYMED'},
{'title': 'SHILPI'},
{'title': 'STER'},
{'title': 'STOREONE'},
{'title': 'TATAMOTORS'},
{'title': 'WELSPUNIND'},
{'title': 'WINDMACHIN'},
{'title': 'XCHANGING'},
{'title': 'ZICOM'}
]

module.exports.routes = routes;