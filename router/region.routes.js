const {
  addNewRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
} = require("../controller/region.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const clientGuard = require("../middleware/guard/client.guard");

const router = require("express").Router();

router.post("/", clientGuard, adminGuard, addNewRegion);
router.get("/", clientGuard, adminGuard, getAllRegions);
router.get("/:id", clientGuard, adminGuard, getRegionById);
router.put("/:id", clientGuard, adminGuard, updateRegion);
router.delete("/:id", clientGuard, adminGuard, deleteRegion);

module.exports = router;
