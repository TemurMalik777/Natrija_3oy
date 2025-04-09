const {
  addNewStatus,
  getAllStatus,
  getStatusById,
  updateStatus,
  deleteStatus,
} = require("../controller/status.controller");

const router = require("express").Router();

router.post("/", addNewStatus);
router.get("/", getAllStatus);
router.get("/:id", getStatusById);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

module.exports = router;
