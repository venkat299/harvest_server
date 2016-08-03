const logger = require('winston');

function clear_signals(agenda, seneca, job, done) {
  seneca.act('role:signal_log,cmd:clear_expired_signals', job, (error, msg) => {
    if (msg.success) {
      // call final callback after succesfull job completion
      logger.debug('clear_signals job: completed', msg);
      done();
    }
  });
}

module.exports = (agenda, seneca, config) => {
  agenda.define('clear_signals', (job, done) => {
    clear_signals(agenda, seneca, job, done);
  });

  // every minute : 0 0/1 * 1/1 * ? *
  // setting UTC Time
  logger.debug('cron_exp:', config.cron_exp);
  agenda.every(config.cron_exp, 'clear_signals', {}, {
    timezone: config.timezone,
  }, () => {
    logger.debug('clear_signals job:added to database');
  });
};