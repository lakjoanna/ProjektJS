const Sequelize = require("sequelize")
const database = require("../database")

const Address = database.define("address", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false
    },
    homeNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apartmentNumber: {
        type: Sequelize.STRING,
        allowNull:false
    },
    postCode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Address