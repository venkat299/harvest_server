const logger = require('winston');

function routine(agenda, seneca, job, done) {
  seneca.act('role:signal_log,cmd:delete_expired', {}, (error, msg) => {
    if (msg.success) {
      // call final callback after succesfull job completion
      done();
    }
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