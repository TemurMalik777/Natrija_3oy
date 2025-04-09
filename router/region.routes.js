const {
  addNewRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion,
} = require("../controller/region.controller");

const router = require("express").Router();

router.post("/", addNewRegion);
router.get("/", getAllRegions);
router.get("/:id", getRegionById);
router.put("/:id", updateRegion);
router.delete("/:id", deleteRegion);

module.exports = router;
