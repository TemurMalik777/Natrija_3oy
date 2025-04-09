const router = require("express").Router();

const adminRoute = require("./admin.routes");
const regionRoute = require("./region.routes");
const clientRoute = require("./clients.routes");
const statusRoute = require("./status.routes");
const paymentRoute = require("./payments.routes");
const ownerRoute = require("./owners.routes");
const categoryRoute = require("./categories.routes")
const deviceLogsRoute = require("./deviceLogs.routes")
const contractRoute = require("./contracts.routes")
const productRoute = require("./products.routes")
// const otpCreateRoute = require("./otpCreate.routes")

router.use("/admins", adminRoute);
router.use("/regions", regionRoute);
router.use("/clients", clientRoute);
router.use("/status", statusRoute);
router.use("/payments", paymentRoute);
router.use("/owners", ownerRoute);
router.use("/categories", categoryRoute)
router.use("/deviceLogs", deviceLogsRoute)
router.use("/contracts", contractRoute)
router.use("/products", productRoute)
// router.use("/otpCreate", otpCreateRoute)


module.exports = router;
