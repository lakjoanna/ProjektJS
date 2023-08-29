const express = require("express")
const router = express.Router()

const {
    getCommoditiesController,
    postCommodityController,
    deleteCommodityController,
    updateCommodityController
} = require("../controllers/commoditys")

router.get("/", getCommoditiesController)
router.post("/", postCommodityController)
router.delete("/:id",deleteCommodityController)
router.put("/:id",updateCommodityController)
module.exports = router