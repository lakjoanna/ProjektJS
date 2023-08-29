const express = require("express")
const router = express.Router()

const {
    getUsersController,
    postUserController,
    deleteUserController
} = require("../controllers/users")

router.get("/",getUsersController)
router.post("/",postUserController)
router.delete("/:id",deleteUserController)

module.exports = router
