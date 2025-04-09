const {
  addNewStatus,
  getAllStatus,
  getStatusById,
  updateStatus,
  deleteStatus,
} = require("../controller/status.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const clientGuard = require("../middleware/guard/client.guard");

const router = require("express").Router();

router.post("/", clientGuard, adminGuard,  addNewStatus);
router.get("/", clientGuard, adminGuard, getAllStatus);
router.get("/:id", clientGuard, adminGuard, getStatusById);
router.put("/:id", clientGuard, adminGuard, updateStatus);
router.delete("/:id", clientGuard, adminGuard, deleteStatus);

module.exports = router;
