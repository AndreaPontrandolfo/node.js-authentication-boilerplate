/// Custom Winston logger setup

const { createLogger, format, transports, addColors } = require("winston");

/// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const level = process.env.LOG_LEVEL || "debug";

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace("T", " ");

  return `${ts} ${level}: ${message} ${Object.keys(args).length
    ? JSON.stringify(args, "", "")
    : ""}`;
}

function formatParamsDev(info) {
  const {  level, message, ...args } = info;

  return `${level}: ${message} ${Object.keys(args).length
    ? JSON.stringify(args, "", "")
    : ""}`;
}

const developmentFormat = format.combine(
  format.colorize(),
  format.align(),
  format.printf(formatParamsDev)
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

let logger;

if (process.env.NODE_ENV !== "production") {
  logger = createLogger({
    level: level,
    format: developmentFormat,
    transports: [new transports.Console()]
  });

} else {
  logger = createLogger({
    level: level,
    format: productionFormat,
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combined.log" })
    ]
  });
}

module.exports = logger



