const {
  addNewContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,
  getContractByClientIdAndContractId,
  getContractByClientId,
  getContractByOwnerIdAndContractId,
  getContractByOwnerId,
} = require("../controller/contracts.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const clientAdminGuard = require("../middleware/guard/client.admin.guard");
const clientGuard = require("../middleware/guard/client.guard");
const clietnSelfGuard = require("../middleware/guard/clietn.self.guard");
const ownerSelfGuard = require("../middleware/guard/owner.self.guard");

const router = require("express").Router();

router.post("/", clientGuard, clientAdminGuard, addNewContract);//,
router.get("/client/:id/contract/:contractId", getContractByClientIdAndContractId)
router.get("/client/:id/contracts", clientGuard, clietnSelfGuard, getContractByClientId)
router.get("/owner/:id/contract/:contractId", clientGuard, ownerSelfGuard, getContractByOwnerIdAndContractId)
router.get("/owner/:id/contracts", clientGuard, ownerSelfGuard , getContractByOwnerId)
router.get("/", clientGuard, adminGuard, getAllContracts);
router.get("/:id", clientGuard, clietnSelfGuard, getContractById);
router.put("/:id", updateContractById);
router.delete("/:id", deleteContractById);

module.exports = router;
