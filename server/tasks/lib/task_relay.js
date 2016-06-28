var level = require('level');
var db = level(__dirname + '/../../../test/test_db/tasks');
var Jobs = require('level-jobs');
var eod = require(__dirname + '/../jobs/eod');
var eod_run = require(__dirname + '/../jobs/eod_run');
var maxConcurrency = 1;
var queue = Jobs(db, worker, maxConcurrency);
//module.exports = queue;
var seneca;

function worker(event, cb) {
    //console.log(event)
    switch (event.task) {
        case 'eod':
            eod(event, seneca, function(err) {
                if (err) console.error('Error processing event %s: %s', event.id, err.message);
                else console.log('event %s successfully relayed', event.id);
                //cb(err);
                // queue.del(event.id, function(err) {
                //     if (err) console.error('Error deleting job', err.stack);
                // });
                cb()
            })
            break;
        case 'eod_run':
            eod_run(event, seneca, function(err) {
                if (err) console.error('Error processing event %s: %s', event.id, err.message);
                else console.log('event %s successfully relayed', event.id);
                //cb(err);
                // queue.del(event.id, function(err) {
                //     if (err) console.error('Error deleting job', err.stack);
                // });
                cb()
            })
            break;
        default:
            cb();
            break;
    }
}

function init(seneca_instance) {
    seneca = seneca_instance
    return queue
}
module.exports = init
// function worker(event, cb) {  
//   sendEventToRemoteService(event, function(err) {
//     if (err) console.error('Error processing event %s: %s', event.id, err.message);
//     else console.log('event %s successfully relayed', event.id);
//     cb(err);
//   });
// }
// function sendEventToRemoteService(event, cb) {  
//   setTimeout(function() {
//     var err;
//     if (Math.random() > 0.5) err = Error('something awful has happened');
//     cb(err);
//   }, 100);
// }