const logger = require('winston');

function download(agenda, seneca, job, done) {
  seneca.make$('strategy_stock').list$({
    status: 'ACTIVE',
  }, (err, list) => {
    if (err) logger.error(err);
    const symbols = list.reduce((x, y) => x.concat([y.tradingsymbol]), []);
    logger.debug(symbols);
    seneca.act('role:data,comp:eod,cmd:download', {
      data: symbols,
    }, (error, msg) => {
      logger.debug(msg);
      if (msg.success) {
        // call final callback after succesfull job completion
        done();
      }
    });
    // done()
  });
}

module.exports = (agenda, seneca, config) => {
  agenda.define('eod_download', (job, done) => {
    download(agenda, seneca, job, done);
  });
  // other related jobs

  // scheduling job
  // agenda.on('ready', () => {
  // agenda.now('eod_download', {});

  // scheduling every day at 7 am: 0 0 7 1/1 * ? *
  // every minute : 0 0/1 * 1/1 * ? *
  // setting UTC Time
  logger.debug('cron_exp:', config.cron_exp);
  agenda.every(config.cron_exp, 'eod_download', {}, {
    timezone: config.timezone,
  }, () => {
    logger.debug('eod job:added to database');
  });
  // });
};