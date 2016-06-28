// var seneca = require('seneca')()
var jsonfile = require('jsonfile')
var queue = require('../lib/task_relay.js');
var seneca;
jsonfile.spaces = 4
var file = __dirname + '/../../../task.json'

function download(event, seneca_instance, cb) {
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
            seneca.act('role:data,comp:eod,cmd:download', {
                data: symbols
            }, function(err, msg) {
                console.log(msg)
                if (msg.success) {
                    //update the json
                    console.log('path:', file)
                    console.log('job_name:', job_name)
                    jsonfile.readFile(file, function(err, obj) {
                        console.dir(obj)
                        var index = obj.tasks.findIndex(function(elem, idx, arr) {
                            return (elem.name === job_name)
                        })
                        var task_to_update = obj.tasks[index]
                        task_to_update['name'] = job_name
                        task_to_update['update_date'] = (new Date()).toISOString().substr(0, 10)
                        task_to_update['status'] = "COMPLETE"
                        obj.tasks[index] = task_to_update
                        jsonfile.writeFile(file, obj, function(err) {
                            console.error(err)
                            cb()
                        })
                    })
                }
            })
            //cb()
        })
    } catch (e) {
        cb(e)
    }
}
module.exports = download