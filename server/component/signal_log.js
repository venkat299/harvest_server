// =======================
// private lib
// =======================
var routes = require('express').Router();
// ========== logout 
routes.get('/', function(req, res, next) {
    //console.log(req.query)
    // 	var val = {success:true,"strategy_id": "fifty_2_wk",data:[ {
    // 	"entity$": {
    // 		"name": "signal_log"
    // 	},
    // 	"transaction_type": "SELL",
    // 	"tradingsymbol": "YESBANK",
    // 	"strategy_id": "fifty_2_wk",
    // 	"signal_status": "CLOSE",
    // 	"log": [
    // 		["PENDING_OPEN", "BUY", 1466566763415],
    // 		["OPEN", "BUY", 1466566763447],
    // 		["PENDING_CLOSE", "SELL", 1466566764566],
    // 		["CLOSE", "SELL", 1466566764581]
    // 	],
    // 	"id": "vkfep6",
    // 	"updated_time":1466566764581
    // }, {
    // 	"entity$": {
    // 		"name": "signal_log"
    // 	},
    // 	"transaction_type": "SELL",
    // 	"tradingsymbol": "YESBANK",
    // 	"strategy_id": "fifty_2_wk",
    // 	"signal_status": "CLOSE",
    // 	"log": [
    // 		["PENDING_OPEN", "BUY", 1466566763415],
    // 		["OPEN", "BUY", 1466566763447],
    // 		["PENDING_CLOSE", "SELL", 1466566764566],
    // 		["CLOSE", "SELL", 1466566764581]
    // 	],
    // 	"id": "vkfep6",
    // 	"updated_time":1466566764581
    // },
    // 		{
    // 	"entity$": {
    // 		"name": "signal_log"
    // 	},
    // 	"transaction_type": "SELL",
    // 	"tradingsymbol": "YESBANK",
    // 	"strategy_id": "fifty_2_wk",
    // 	"signal_status": "CLOSE",
    // 	"log": [
    // 		["PENDING_OPEN", "BUY", 1466566763415],
    // 		["OPEN", "BUY", 1466566763447],
    // 		["PENDING_CLOSE", "SELL", 1466566764566],
    // 		["CLOSE", "SELL", 1466566764581]
    // 	],
    // 	//trans_log:{val1:'',val2:''}
    // 	"id": "vkfep6",
    // 	"updated_time":1466566764581
    // }]}
    console.log(req.query)
    if (!req.query.strategy_id) res.end('ERR:PARAMETERS_VALIDATION_FAILED')
    var seneca = req.app.get('settings').seneca;
    seneca.act('role:signal_log,cmd:all', req.query, function(err, val) {
        //console.log('val-->',val)
        if (err) res.end(err)
        //val.data = sort_watchlist(val.data)
        val.strategy_id = req.query.strategy_id
        val.data.forEach(function(item) {
            item.trans_log = item.log.map((x) => {
                return {
                    val0: x[0],
                    val1: x[1],
                    val2: x[2]
                }
            })
        })
        //console.log(val.data[0].trans_log)
        res.render('signal_log', val);
    })
});
module.exports.routes = routes;