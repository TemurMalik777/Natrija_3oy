const {
  addNewProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProductById,
} = require("../controller/products.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const clientGuard = require("../middleware/guard/client.guard");
const ownerGuard = require("../middleware/guard/owner.guard");

const router = require("express").Router();

router.post("/", clientGuard, ownerGuard, addNewProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", clientGuard, ownerGuard, updateProductById);
router.delete("/:id",clientGuard, adminGuard, deleteProduct);

module.exports = router;
