const express = require("express")
const router = express.Router()

const {
    postLoginController,
} = require("../controllers/auth")

router.post("/", postLoginController)

module.exports = router