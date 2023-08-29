const Commodity = require("../models/Commodity")

module.exports.getCommoditiesController = async (req, res) => {
    const commoditys = await Commodity.findAll()
    res.json({commoditys})
}

// Dodawnie towaru
module.exports.postCommodityController = async (req, res) => {
    const name = req.body.name
    const brand = req.body.brand
    const price = req.body.price

    await Commodity.create({
        name,
        brand,
        price
    })

    res.sendStatus(200)
}

// Usuwanie towaru
module.exports.deleteCommodityController = async (req, res) =>{
    const id = req.params.id
    await Commodity.destroy({ where: {id:id }})
    res.sendStatus(200)
}



// Aktualizacja
module.exports.updateCommodityController = async (req,res) => {
    const id = req.params.id
    const name = req.body.name
    const brand = req.body.brand
    const price = req.body.price

    const commodity = await Commodity.findOne({where: {id} })
    if(commodity)
    {
        if(name)
        {
            commodity.name = name 
        }

        if(brand)
        {
            commodity.brand = brand
        }

        if(price)
        {
            commodity.price = price
        }

        await commodity.save()
    }
    res.sendStatus(200)
}

