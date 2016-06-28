// var seneca = require('seneca')()
var jsonfile = require('jsonfile')
var Promise = require('bluebird')
var queue = require('../lib/task_relay.js');
var seneca;
jsonfile.spaces = 4
var file = __dirname + '/../../../task.json'

function run(event, seneca_instance, cb) {
    console.log('event:', event)
    seneca = seneca_instance
    //console.log(seneca.make$)
    var jobId = event.id
    var job_name = event.task
    try {
        seneca.make$('strategy_stock').list$({
            status: 'ACTIVE'
        }, function(err, list) {
            if (err) console.log(err)
            var symbols = list.reduce((x, y) => {
                return x.concat([y.tradingsymbol])
            }, [])
            console.log(symbols)
            var promise_arr = []
            symbols.forEach(function(item) {
                promise_arr.push(new Promise(function(resolve, reject) {
                    seneca.make$('eod').list$({
                        tradingsymbol: item
                    }, function(err, dt) {
                        if (err) console.log(err)
                        else {
                            seneca.act('role:strategy,id:fifty_2_wk,cmd:run', {
                                data: dt[0].data$(false),
                                tradingsymbol: item
                            }, function(err, msg) {
                                if (err) console.log(err)
                                else console.log(msg)
                                    resolve()
                            })
                        }
                    })
                }))
                Promise.all(promise_arr).then(function(){cb()})
            })
            //cb()
        })
    } catch (e) {
        cb(e)
    }
}
module.exports = run