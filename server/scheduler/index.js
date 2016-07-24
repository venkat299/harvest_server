const task_config = require(__dirname + '/../../task.json');

function initialize(agenda, seneca) {
  /* eslint global-require: 0 */
  /* eslint prefer-template: 0 */

  const tasks = ((task_config).active_tasks);
  const task_list = ((task_config).task_list);
  tasks.forEach((item) => {
    require('./jobs/' + task_list[item].name)(agenda, seneca);
  });

  agenda.on('ready', () => {
    agenda.start();
    // Note: comment out after test. Not to be used in server
    // agenda.purge((err, numRemoved) => {
    //   console.log(numRemoved);
    // });
  });

  function graceful() {
    agenda.stop(() => {
      console.log('job queue cleared');
      process.exit(0);
    });
  }

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
}

module.exports = initialize;