const Sequelize = require ("sequelize")
const database = require("../database");

const Order = database.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    number: {
        type: Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Order