const Sequelize = require("sequelize")
const database = require("../database");

const User = database.define("user", {
    id: { 
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true,
        unique: true

    },
    name: {
        type: Sequelize.STRING,
        allowNull: false

    },
    surname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User