const fs = require("fs");
const winston = require("winston");
const config = require("config");

if (!fs.existsSync("log")) {
  fs.mkdirSync("log");
}

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: "sequelize-project" }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console({ level: "debug" }),
    new transports.File({ filename: "log/errors.log", level: "error" }),
    new transports.File({ filename: "log/combined.log", level: "info" }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: "log/exceptions.log" }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: "log/rejections.log" }),
  ],
});

logger.exitOnError = false;

module.exports = logger;
