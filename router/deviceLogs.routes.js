const {
  addNewDeviceLog,
  getAllDeviceLogs,
  getDeviceLogById,
  updateDeviceLogById,
  deleteDeviceLogById,
} = require("../controller/deviceLogs.controller");

const router = require("express").Router();

router.post("/", addNewDeviceLog);
router.get("/", getAllDeviceLogs);
router.get("/:id", getDeviceLogById);
router.put("/:id", updateDeviceLogById);
router.delete("/:id", deleteDeviceLogById);

module.exports = router;
