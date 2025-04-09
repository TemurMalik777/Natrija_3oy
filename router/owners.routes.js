const {
  addNewOwner,
  getAllOwners,
  getOwnerById,
  updateOwnerById,
  deleteOwnerById,
  loginOwner,
  logoutOwner,
  refreshTokenOwner,
  activateOwner,
} = require("../controller/owners.controller");
const clientAdminGuard = require("../middleware/guard/client.admin.guard");
const clientGuard = require("../middleware/guard/client.guard");
const clietnSelfGuard = require("../middleware/guard/clietn.self.guard");
const ownerAdminGuard = require("../middleware/guard/owner.admin.guard");
const ownerGuard = require("../middleware/guard/owner.guard");
const ownerSelfGuard = require("../middleware/guard/owner.self.guard");

const router = require("express").Router();

router.post("/", addNewOwner);
router.post("/login", loginOwner);
router.get("/logout", logoutOwner);
router.get("/refresh", refreshTokenOwner);
router.get("/activate/:link", activateOwner)

router.get("/", clientGuard, ownerSelfGuard, getAllOwners);
router.get("/:id", clientGuard, ownerGuard, getOwnerById);
router.put("/:id", clientGuard, ownerGuard, updateOwnerById);
router.delete("/:id", clientGuard, clientAdminGuard, deleteOwnerById);

module.exports = router;
