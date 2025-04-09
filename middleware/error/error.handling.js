const ApiError = require("../../helpers/api.error");
const logger = require("../../services/logger.service");

module.exports = function (err, req, res, next) {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json(err.toJson());
  }

  if (err instanceof SyntaxError) {
    return res.status(400).json({ message: err.message });
  }

  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  return res.status(500).json(ApiError.internal("Something went wrong"));
};
