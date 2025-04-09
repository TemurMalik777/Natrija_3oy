const {
  addNewAdmin,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admin.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const clientGuard = require("../middleware/guard/client.guard");
const supperAdminGuard = require("../middleware/guard/supper.admin.guard");

const router = require("express").Router();

router.post("/", clientGuard, supperAdminGuard, addNewAdmin); //adminGuard, supperAdminGuard,
router.post("/login", loginAdmin); // adminGuard,
router.get("/logout", logoutAdmin);
router.get("/refresh", refreshTokenAdmin);

router.get("/", clientGuard, supperAdminGuard, getAllAdmin); //adminGuard, supperAdminGuard,
router.get("/:id", clientGuard, adminGuard, getAdminById); // adminGuard,
router.put("/:id", clientGuard, adminGuard, updateAdmin); //adminGuard, supperAdminGuard,
router.delete("/:id", adminGuard, supperAdminGuard, deleteAdmin); //adminGuard, supperAdminGuard,

module.exports = router;
