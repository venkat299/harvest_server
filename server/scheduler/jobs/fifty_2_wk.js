const logger = require('winston');
const Promise = require('bluebird');

function routine(agenda, seneca, job, done) {
  // querying for stock list for which strategy to be run
  seneca.make$('strategy_stock').list$({
    status: 'ACTIVE',
    strategy_id: 'fifty_2_wk',
  }, (err, list) => {
    if (err) logger.debug(err);
    const symbols = list.reduce((x, y) => x.concat([y.tradingsymbol]), []);
    logger.debug(symbols);
    // for each symbol run the strategy
    logger.debug(symbols);
    const promise_arr = [];
    symbols.forEach((item) => {
      promise_arr.push(new Promise((resolve, reject) => {
        seneca.make$('eod').list$({
          tradingsymbol: item,
        }, (query_err, dt) => {
          if (query_err) reject(query_err);
          else {
            seneca.act('role:strategy,id:fifty_2_wk,cmd:run', {
              data: dt[0].data$(false),
              tradingsymbol: item,
            }, (strategy_run_err, msg) => {
              if (strategy_run_err) reject(strategy_run_err);
              else logger.debug(msg);
              resolve();
            });
          }
        });
      }));
      Promise.all(promise_arr).then(() => {
        done();
      });
    });
  });
}

module.exports = (agenda, seneca, config) => {
  agenda.define('fifty_2_wk_eod_run', (job, done) => {
    routine(agenda, seneca, job, done);
  });

  // every minute : 0 0/1 * 1/1 * ? *
  // setting UTC Time
  agenda.every(config.cron_exp, 'fifty_2_wk_eod_run', {}, {
    timezone: config.timezone,
  }, () => {
    logger.debug('fifty_2_wk_eod_run job: added to database');
  });
};

/**
seneca.make$('strategy_stock').list$({
            status: 'ACTIVE'
        }, function(err, list) {
            if (err) logger.debug(err)
            var symbols = list.reduce((x, y) => {
                return x.concat([y.tradingsymbol])
            }, [])
            logger.debug(symbols)
            var promise_arr = []
            symbols.forEach(function(item) {
                promise_arr.push(new Promise(function(resolve, reject) {
                    seneca.make$('eod').list$({
                        tradingsymbol: item
                    }, function(err, dt) {
                        if (err) logger.debug(err)
                        else {
                            seneca.act('role:strategy,id:fifty_2_wk,cmd:run', {
                                data: dt[0].data$(false),
                                tradingsymbol: item
                            }, function(err, msg) {
                                if (err) logger.debug(err)
                                else logger.debug(msg)
                                    resolve()
                            })
                        }
                    })
                }))
                Promise.all(promise_arr).then(function(){cb()})
            })
            //cb()
        })
        */