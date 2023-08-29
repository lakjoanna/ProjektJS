const Sequelize = require("sequelize")
const database = require("../database");

const Commodity = database.define("commodity", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
})

module.exports = Commodity