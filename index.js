// =======================
// public lib
// =======================
// const cookieParser = require('cookie-parser');
// const forceSSL = require('express-force-ssl');
// const fs = require('fs');
// const https = require('https');
const Agenda = require('agenda');
const agendash = require('agendash');
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const http = require('http');
const mustache = require('mustache-express');
// =======================
// private lib
// =======================
const config = require('./config.json');
const routes = require('./server/router');
const start_scheduler = require('./server/scheduler');
const Logger = require('./app_logger');
/* eslint no-unused-vars: 0 */
// intialize logger here.
// FIXME: (low-priority) Don't know how to configure with express-winston
const logger = Logger.logger;

// =======================
// application logic
// =======================
const app = express();
const server = http.createServer(app);

// ######### https ssl configuration #########
/**
 * var ssl_config     = {
 *     key: fs.readFileSync('file.pem'),
 *     cert: fs.readFileSync('file.crt')
 * };
 * var secureServer = https.createServer(ssl_config, app);
 * app.use(forceSSL);
 */

// ######### log module #########
// app.use(logger);

// ######### parsing request #########
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json()); // to support JSON-encoded bodies

// ######### setting view engine #########
app.engine('html', mustache());
app.set('view engine', 'html'); // set up ejs for templating
app.set('views', `${__dirname}/frontend/html`);

// ######### compress all requests #########
app.use(compression());

// ######### serving static files #########
app.use('/client_lib', express.static(`${__dirname}/frontend/client_module`)); // all js files
app.use('/client_style', express.static(`${__dirname}/frontend/css`)); // all css files
app.use('/client_img', express.static(`${__dirname}/frontend/custom_img`));
app.use('/semantic', express.static(`${__dirname}/semantic`));

// #########  change db here #########
const harvest_db = config.test.current_db;
const harvest_scheduler_db = config.test.current_scheduler_db;
// ####################################
const harvest_db_name = config.test[harvest_db].db_type;
const harvest_db_config = config.test[harvest_db].db_config;
const scheduler_db_uri = config.test[harvest_scheduler_db].db_uri;

// ######### seneca api integration ##########
const harvest_data = require('harvest_data');
const harvest_strategy = require('harvest_strategy');
const harvest_evaluator = require('harvest_evaluator');
const harvest_executor = require('harvest_executor');
const seneca = require('seneca')()
  .use('entity')
  .use(harvest_data)
  .use(harvest_strategy)
  .use(harvest_evaluator)
  .use(harvest_executor)
  .client({
    port: '8000',
  });

// ######## adding scheduler support here ######
const app_agenda = new Agenda({
  db: {
    address: `${scheduler_db_uri}`,
    collection: 'agendaJobs',
  },
});

app.use('/agendash', agendash(app_agenda));

// ######### adding test db  #########
try {
  seneca.use(harvest_db_name, harvest_db_config);
} catch (err) {
  console.log(err);
}

/**
 * {
 *  type: 'http',
 *  port: '8000',
 *  host: 'localhost',
 *  protocol: 'https'
 * }
 */
app.use(seneca.export('web'));

// ######### setting app level configs ##########
const settings = {
  seneca,
  // db: config.db
  // passport: passport,
  // ensureLoggedIn:ensureLoggedIn
};
app.set('settings', settings);

// exporting app config before
// app.set('config', config)

module.exports = app;

routes.set(app);

// ######### server listenning  ##########
server.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('app listening at http://%s :%s ', host, port);
  console.log('starting tasks');
  start_scheduler(app_agenda, app.get('settings').seneca);
});
// secureServer.listen(3000)