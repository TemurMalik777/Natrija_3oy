const { createOtp } = require("../controller/otp.controller")



const router = require("express").Router()

router.post("/createotp", createOtp)

module.exports = router