// middleware/guard/client.self.guard.js

const { errorHandler } = require("../../helpers/error_handler");

module.exports = function (req, res, next) {
  try {
    const currentClient = req.client;
    const currentAdmin = req.admin;
    const requestedId = parseInt(req.params.id);

    if (currentAdmin) return next(); // admin bo‘lsa — hammasi mumkin

    if (currentClient && currentClient.id === requestedId) {
      return next(); // o‘zining ID bo‘lsa ruxsat
    }

    return res.status(403).send({
      message: "Faqat o‘zingizning ma’lumotlaringizga ruxsat beriladi.",
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
