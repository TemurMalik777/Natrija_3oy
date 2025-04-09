const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
    const id = req.params.id;
    if(!req.user.role === "client"){
      return res.status(403).send({
        message: "Client ma'lumotlarni o'chirishga urunma"
      })
    }
    if (req.user.role === "owner") {
      return res
        .status(403)
        .send({ message: "Owner Clientni va o'zini malumotlarni o'chira olmaydi" });
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
