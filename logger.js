/// Custom Winston logger setup

const winston = require("winston");

const logger = winston.createLogger({
  level: 'debug',
  colorize: true,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  ]
});

module.exports = logger



