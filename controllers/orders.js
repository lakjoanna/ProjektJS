const Order = require("../models/Order")
const OrderPosition = require("../models/OrderPosition")
const Commodity = require("../models/Commodity")

module.exports.getAllOrderController = async (req, res) => {
    const orders = await Order.findAll({
        include:[{model: OrderPosition, include: Commodity }]
    })
    res.json({orders})
}

module.exports.postOrderController = async (req, res) => {
    const number = getOrderNumber()
    const userId = req.body.userId
    const adressId = req.body.adressId
    const orderPositionModels = req.body.orderPositions

    const order = await Order.create({
        number,
        userId,
        adressId
    })

    for(let orderPositionModel of orderPositionModels)
    {
        await OrderPosition.create({
            quantity: orderPositionModel.quantity,
            commodityId: orderPositionModel.commodityId,
            orderId: order.id
        })
    }

    res.sendStatus(200)
}

module.exports.deleteOrderController = async (req, res) => {
     const id = req.params.id
     await Order.destroy({ where: {id:id} })
     res.sendStatus(200)
}

function getOrderNumber()
{
    return "ZAM/" + Date.now() + "/" + new Date().getFullYear()
}