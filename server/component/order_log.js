// =======================
// private lib
// =======================
var routes = require('express').Router();
// ========== logout 
routes.get('/', function(req, res, next) {
    //console.log(req.query)
    // 	var val = {success:true,"strategy_id": "fifty_2_wk",data:[ {
    // 	"entity$": {
    // 		"name": "order_log"
    // 	},
    // 	"strategy_id": "fifty_2_wk",
    // 	"tradingsymbol": "YESBANK",
    // 	"status": "PLACED",
    // 	"order_obj": {
    // 		"strategy_id": "fifty_2_wk",
    // 		"prev_track_id": "1466566762835/strategy/YESBANK",
    // 		"track_id": "1466566763424/evaluator/YESBANK",
    // 		"tradingsymbol": "YESBANK",
    // 		"exchange": "NSE",
    // 		"transaction_type": "BUY",
    // 		"order_type": "MARKET",
    // 		"quantity": 2,
    // 		"product": "CNC",
    // 		"validity": "DAY"
    // 	},
    // 	"updated_time":1466566763424,
    // 	"status_log": [
    // 		["INIT", 1466566763424],
    // 		["PLACED", 1466566763428]
    // 	],
    // 	"kite_response": [{
    // 		"order_id": "151220000000000",
    // 		"tradingsymbol": "YESBANK",
    // 		"strategy_id": "fifty_2_wk"
    // 	}],
    // 	"order_id": "151220000000000",
    // 	"id": "cu8q9k"
    // }, {
    // 	"entity$": {
    // 		"name": "order_log"
    // 	},
    // 	"strategy_id": "fifty_2_wk",
    // 	"tradingsymbol": "YESBANK",
    // 	"status": "PLACED",
    // 	"order_obj": {
    // 		"strategy_id": "fifty_2_wk",
    // 		"prev_track_id": "1466566762835/strategy/YESBANK",
    // 		"track_id": "1466566763424/evaluator/YESBANK",
    // 		"tradingsymbol": "YESBANK",
    // 		"exchange": "NSE",
    // 		"transaction_type": "BUY",
    // 		"order_type": "MARKET",
    // 		"quantity": 2,
    // 		"product": "CNC",
    // 		"validity": "DAY"
    // 	},
    // 		"updated_time":1466566763424,
    // 	"status_log": [
    // 		["INIT", 1466566763424],
    // 		["PLACED", 1466566763428]
    // 	],
    // 	"kite_response": [{
    // 		"order_id": "151220000000000",
    // 		"tradingsymbol": "YESBANK",
    // 		"strategy_id": "fifty_2_wk"
    // 	}],
    // 	"order_id": "151220000000000",
    // 	"id": "cu8q9k"
    // },
    // 		{
    // 	"entity$": {
    // 		"name": "order_log"
    // 	},
    // 	"strategy_id": "fifty_2_wk",
    // 	"tradingsymbol": "YESBANK",
    // 	"status": "PLACED",
    // 	"order_obj": {
    // 		"strategy_id": "fifty_2_wk",
    // 		"prev_track_id": "1466566762835/strategy/YESBANK",
    // 		"track_id": "1466566763424/evaluator/YESBANK",
    // 		"tradingsymbol": "YESBANK",
    // 		"exchange": "NSE",
    // 		"transaction_type": "BUY",
    // 		"order_type": "MARKET",
    // 		"quantity": 2,
    // 		"product": "CNC",
    // 		"validity": "DAY"
    // 	},
    // 		"updated_time":1466566763424,
    // 	"status_log": [
    // 		["INIT", 1466566763424],
    // 		["PLACED", 1466566763428]
    // 	],
    // 	"kite_response": [{
    // 		"order_id": "151220000000000",
    // 		"tradingsymbol": "YESBANK",
    // 		"strategy_id": "fifty_2_wk"
    // 	}],
    // 	"order_id": "151220000000000",
    // 	"id": "cu8q9k"
    // }]}
    console.log(req.query)
    if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED')
    var seneca = req.app.get('settings').seneca;
    seneca.act('role:order_log,cmd:all', req.query, function(err, val) {
       // console.log('val-->', val)
        if (err) res.end(err)
            //val.data = sort_watchlist(val.data)
        val.strategy_id = req.query.strategy_id
        val.data.forEach(function(item) {
            item.trans_log = item.status_log.map((x) => {
                return {
                    val0: x[0],
                    val1: x[1]
                }
            })
        })
        //console.log(val.data[0].trans_log)
        res.render('order_log', val);
    })
    // val.data.forEach(function(item) {
    //     item.trans_log = item.status_log.map((x) => {
    //         return {
    //             val0: x[0],
    //             val1: x[1]
    //         }
    //     })
    // })
    // 	res.render('order_log', val);
});
module.exports.routes = routes;