const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
    if (!req.user.is_creater) {
      return res.status(403).send({message: "Faqat super admin ruxsat etiladi." })
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
