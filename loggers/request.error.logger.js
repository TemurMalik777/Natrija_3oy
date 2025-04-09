const winston = require("winston");
const expressWinston = require("express-winston");

// Logger konfiguratsiyasi
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "log/combined.log",
      level: "info", // barcha informatsiyalarni loglash
    }),
    new winston.transports.File({
      filename: "log/error.log",
      level: "error", // faqat xatoliklarni loglash
    }),
  ],
});

// ExpressWinston uchun so'rovlar loglarini yaratish
const reqLogger = expressWinston.requestLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "log/requestLogger.log",
      level: "info",
    }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
});

// ExpressWinston uchun xatoliklarni loglash
const resError = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "log/requestErrorLogger.log",
      level: "error",
    }),
  ],
  format: winston.format.combine(winston.format.json()),
});

module.exports = { reqLogger, resError, logger };

