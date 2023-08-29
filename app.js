const express = require ("express")
const database = require("./database")

const app = express()
app.use(express.json())
app.use(express.static("static"))

// models
const User = require("./models/User")
const OrderPosition = require("./models/OrderPosition")
const Order = require("./models/Order")
const Commodity = require("./models/Commodity")
const Address = require("./models/Address")

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(OrderPosition)
OrderPosition.belongsTo(Order)

Commodity.hasMany(OrderPosition)
OrderPosition.belongsTo(Commodity)

Address.hasMany(Order)
Order.belongsTo(Address)

Address.hasMany(User)
User.belongsTo(Address)

// Routes
const commoditysRouter = require("./routes/commoditys")
app.use("/commodities", commoditysRouter)

const ordersRouter = require("./routes/orders")
app.use("/orders", ordersRouter)

const usersRouter = require("./routes/users")
app.use("/users", usersRouter)

const authRouter = require("./routes/auth")
app.use("/auth", authRouter)

database
    // .sync({ force: true })
    .sync()
    .then(async ()=> {
        // await initializeData()

        app.listen(3000, () => {
            console.log("Serwer port 3000")
        })
    })

async function initializeData()
{
    const address1 = await Address.create({
        city: "Kraków",
        street: "Piłsudskiego",
        homeNumber: "12",
        apartmentNumber: "15A",
        postCode: "12-456",
        country: "Poland"
    })

    const address2 = await Address.create({
        city: "Warszawa",
        street: "Grodzka",
        homeNumber: "452",
        apartmentNumber: "32",
        postCode: "44-123",
        country: "Poland"
    })

    const user1 = await User.create({
        name: "Jacek",
        surname:"Kowalski",
        login: "jacek",
        password: "jacek123",
        addressId: address1.id
    })

    const user2 = await User.create({
        name: "Karolina",
        surname:"Huk",
        login: "karolina",
        password: "karolina123",
        addressId: address2.id
    })

    const commodity1 = await Commodity.create({
        name: "leginsy sportowe",
        brand: "Adidas",
        price: 150
    })

    const commodity2 = await Commodity.create({
        name: "Kurtka przeciwdeszczowa",
        brand: "Nike",
        price: 400
    })

    const commodity3 = await Commodity.create({
        name: "Sukienka letnia",
        brand: "Zara",
        price: 200
    })
}