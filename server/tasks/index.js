const relay_init = require('./lib/task_relay.js');
const task_config = require(__dirname + '/../../task.json');
let seneca;

function initialize(seneca_instance) {
  seneca = seneca_instance;
  const relay = relay_init(seneca_instance);
  const today = (new Date()).toISOString().substr(0, 10);
  const task_list = [];
  const tasks = ((task_config).tasks);
  tasks.forEach(function (item) {
    console.log('item.update_date', item.update_date, today, item.update_date !== today);
    console.log('item.status', item.status, 'COMPLETE', item.status !== 'COMPLETE');
    relay.push({
      id: item.name + today,
      task: item.name,
      data: item.data,
      when: Date.now(),
    });
  });
}
module.exports = initialize;