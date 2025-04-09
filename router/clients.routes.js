const {
  addNewClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
  loginClient,
  logoutClient,
  refreshTokenClient,
  activateClients,
} = require("../controller/clients.controller");
const clientGuard = require("../middleware/guard/client.guard");
const clientadminGuard = require("../middleware/guard/client.admin.guard");
const clientselfGuard = require("../middleware/guard/clietn.self.guard");
const roleGuard = require("../middleware/guard/role.guard");
const clientAdminGuard = require("../middleware/guard/client.admin.guard");

const router = require("express").Router();

router.post("/", addNewClient);
router.post("/login", loginClient);
router.get("/logout", logoutClient);
router.get("/refresh", refreshTokenClient);
router.get("/activate/:link", activateClients)

router.get("/", clientGuard, clientadminGuard, getAllClients);
router.get("/:id",  clientGuard, clientAdminGuard, getClientById);
router.put("/:id", clientGuard, clientAdminGuard, updateClientById);
router.delete("/:id", clientGuard, clientAdminGuard, deleteClientById);

module.exports = router;
