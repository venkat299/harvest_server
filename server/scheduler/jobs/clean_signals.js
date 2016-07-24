function clear_signals(agenda, seneca, job, done) {
  seneca.act('role:signal_log,cmd:clear_expired_signals', job, (error, msg) => {
    console.log(msg);
    if (msg.success) {
      // call final callback after succesfull job completion
      done();
    }
  });
}

module.exports = (agenda, seneca) => {
  agenda.define('clear_signals', (job, done) => {
    clear_signals(agenda, seneca, job, done);
  });
};