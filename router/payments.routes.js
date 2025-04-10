const {
  addNewPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controller/paymetns.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const clientGuard = require("../middleware/guard/client.guard");
const clietnSelfGuard = require("../middleware/guard/clietn.self.guard");

const router = require("express").Router();

router.post("/", addNewPayment);
router.get("/", clientGuard, adminGuard, getAllPayments);
router.get("/:id", clientGuard, clietnSelfGuard, getPaymentById);
router.put("/:id", clientGuard, clietnSelfGuard, updatePaymentById);
router.delete("/:id", clientGuard, adminGuard, deletePaymentById);

module.exports = router;
