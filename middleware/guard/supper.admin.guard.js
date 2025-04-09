const { errorHandler } = require("../../helpers/error_handler");
const ApiError = require("../../helpers/api.error")

module.exports = function (req, res, next) {
  try {
    if (!req.user.is_creater) {
        throw ApiError.forbidden("Faqat super admin ruxsat etiladi.");
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
