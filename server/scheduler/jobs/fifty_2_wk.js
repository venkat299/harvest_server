 function routine(agenda, seneca, job, done) {
   // cleaning stale signals
   // const job_data = {
   //   strategy_id: 'fifty_2_wk',
   // };
   seneca.act('role:signal_log,cmd:delete_expired', {}, (error, msg) => {
     if (msg.success) {
       // call final callback after succesfull job completion
       done();
     }
   });
 }

 function iniatilze(agenda, seneca) {
   // defining jobs
   agenda.define('fifty_2_wk_eod_run', (job, done) => {
     routine(agenda, seneca, job, done);
   });

   // scheduling job
   agenda.on('ready', () => {
     agenda.schedule('1 minutes from now', 'fifty_2_wk_eod_run', {});
     // agenda.now('fifty_2_wk_eod_run', {});
     // agenda.now('eod_download', {});
   });
 }

 module.exports = iniatilze;