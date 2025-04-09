const ApiError = require("../../helpers/api.error");

module.exports = function (req, res, next) {
  if (req.user.role != "owner") {
    throw ApiError.forbidden("Owner boshqasiga kirishga ruxsat yo'q");
  }
  next();
};
