const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');

const config = require(path.resolve('./config.json'));

const console_config = {
  level: config.log_opt.console,
  name: 'pretty_console',
  // handleExceptions: true,
  json: false,
  colorize: true,
  timestamp: true,
};

const error_file_config = {
  name: 'error-file',
  filename: './log/filelog-error.log',
  level: 'error',
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  json: false,
  //colorize: true,
  timestamp: true,
};

const debug_file_config = {
  name: 'debug-file',
  filename: './log/filelog-debug.log',
  level: 'debug',
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  json: false,
  //colorize: true,
  timestamp: true,
};

const info_file_config = {
  name: 'info-file',
  filename: './log/filelog-info.log',
  level: 'info',
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  json: false,
  // colorize: true,
  timestamp: true,
};

/* eslint new-cap: 0 */
/* eslint no-sparse-arrays: 0 */
const logger = new expressWinston.logger({
  // level: 'info',
  // optional: control whether you want to log the meta data about the request (default to true)
  meta: false,
  // optional: customize the default logging message.
  // E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  msg: 'HTTP {{req.method}} {{req.url}}',
  // Use the default Express/morgan request formatting, with the same colors.
  // Enabling this will override any msg and colorStatus if true.
  // Will only output colors on transports with colorize set to true
  expressFormat: true,
  // Color the status code, using the Express/morgan color palette
  // (default green, 3XX cyan, 4XX yellow, 5XX red).
  // Will not be recognized if expressFormat is true
  colorStatus: true,
  // optional: allows to skip some log messages based on request and/or response
  ignoreRoute: () => false,

  transports: [
    new(winston.transports.Console)(console_config),
    new(winston.transports.File)(error_file_config),
    new(winston.transports.File)(debug_file_config),
    new(winston.transports.File)(info_file_config),
  ],
});

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, console_config);
winston.add(winston.transports.File, error_file_config);
winston.add(winston.transports.File, debug_file_config);
winston.add(winston.transports.File, info_file_config);

// set log_level here
winston.level = config.log_opt.console;

// logger.exitOnError = false;

module.exports.logger = logger;