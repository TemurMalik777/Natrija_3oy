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
const clientselfGuard = require("../middleware/guard/clietn.self.guard");

const router = require("express").Router();

router.post("/", addNewClient);
router.post("/login", loginClient);
router.get("/logout", logoutClient);
router.get("/refresh", refreshTokenClient);
router.get("/activate/:link", activateClients)

router.get("/", clientGuard, clientselfGuard, getAllClients);
router.get("/:id",  clientGuard, clientselfGuard, getClientById);
router.put("/:id", clientGuard, clientselfGuard,  updateClientById);
router.delete("/:id", clientGuard, clientselfGuard, deleteClientById);

module.exports = router;
