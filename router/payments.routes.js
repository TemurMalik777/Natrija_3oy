const {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controller/paymetns.controller");

const router = require("express").Router();

router.post("/", addNewPayment);
router.get("/", getAllPayments);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentById);
router.delete("/:id", deletePaymentById);

module.exports = router;
