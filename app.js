const express = require("express");
const config = require("config");
const sequelize = require("./config/db");
const mainRouter = require("./router/index.routes");
const errorHandling = require("./middleware/error/error.handling");
const cookieParser = require("cookie-parser");
// const { resError } = require("./services/logger.service");
// const { reqLogger } = require("./loggers/request.error.logger"); // reqLoggerni import qilish
const logger = require("./services/logger.service");

const PORT = config.get("port") || 3030;

logger.log("info", "LOG ma'lumotlari");
logger.error("ERROR ma'lumotlari");
logger.debug("DEBUG ma'lumotlari");
logger.warn("WARN ma'lumotlari");
logger.info("INFO ma'lumotlari");

const app = express();
app.use(cookieParser());
app.use(express.json());

// So'rovlarni loglash
// app.use(reqLogger);

app.use("/api", mainRouter);
app.use(errorHandling);
// app.use(resError);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
