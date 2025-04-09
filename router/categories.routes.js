const {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controller/categories.controller");
const adminGuard = require("../middleware/guard/admin.guard");
const clientGuard = require("../middleware/guard/client.guard");
const supperAdminGuard = require("../middleware/guard/supper.admin.guard");

const router = require("express").Router();

router.post("/", clientGuard, adminGuard, addNewCategory);
router.get("/", clientGuard, adminGuard, getAllCategories);
router.get("/:id", getCategoryById);//clientGuard
router.put("/:id", clientGuard, adminGuard, updateCategoryById);
router.delete("/:id", clientGuard, adminGuard, deleteCategoryById);

module.exports = router;
