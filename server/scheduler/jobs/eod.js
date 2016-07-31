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
      logger.info(msg);
      if (msg.success) {
        // call final callback after succesfull job completion
        done();
      }
    });
    // done()
  });
}

// Asia/Kolkata

module.exports = (agenda, seneca) => {
  agenda.define('eod_download', (job, done) => {
    download(agenda, seneca, job, done);
  });
  // other related jobs

  // scheduling job
  agenda.on('ready', () => {
    agenda.now('eod_download', {});
  });
};