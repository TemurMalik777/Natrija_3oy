const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .send({ message: "Admindan boshqasiga kirishga ruxsat yo'q" });
    }

    if (req.user.role === "admin" && req.user.is_creater === false || req.user.is_creater === true) {
      return next();
    }

    const id = req.params.id;
    if (id != req.user.id) {
      return res.status(403).send({
        messagae: "Faqat shaxsiy malumotlarni ko'rishga ruxsat etiladi. ",
      });
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
