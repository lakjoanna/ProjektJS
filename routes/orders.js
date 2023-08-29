const express = require("express")
const router = express.Router()

const {

    getAllOrderController,
    postOrderController,
    deleteOrderController
} = require("../controllers/orders")

router.get("/", getAllOrderController)
router.post("/", postOrderController)
router.delete("/:id", deleteOrderController)

module.exports = router