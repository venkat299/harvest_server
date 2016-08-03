const logger = require('winston');
const task_config = require(__dirname + '/../../task.json');

function initialize(agenda, seneca) {
  /* eslint global-require: 0 */
  /* eslint prefer-template: 0 */

  agenda.on('ready', () => {
    agenda.start();
    // Note: comment out after test. Not to be used in server
    agenda.purge((err, numRemoved) => {
      logger.info('job removed  from db:', numRemoved);
      // adding all jobs
      const tasks = ((task_config).active_tasks);
      const task_list = ((task_config).task_list);
      tasks.forEach((task_name) => {
        // should validate cron exp and then to be added
        require('./jobs/' + task_list[task_name].name)(agenda, seneca, task_list[task_name]);
      });
    });
  });

  function graceful() {
    agenda.stop(() => {
      logger.info('job queue cleared');
      process.exit(0);
    });
  }

  process.on('SIGTERM', graceful);
  process.on('SIGINT', graceful);
}

module.exports = initialize;