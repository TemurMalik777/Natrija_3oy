const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
    const id = req.params.id;
    if (req.user.role === "owner") {
      return res
        .status(403)
        .send({ message: "Ruxsat berilmagan foydalanuvchi" });
    }

    if (req.user.role != "admin"){
      if (id != req.user.id) {
        return res.status(403).send({
          messagae: "Faqat shaxsiy malumotlarni ko'rishga ruxsat etiladi. ",
        });
      }
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
