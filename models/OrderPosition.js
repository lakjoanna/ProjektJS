const Sequelize = require ("sequelize")
const database = require("../database")

const OrderPosition = database.define("orderPosition", {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = OrderPosition