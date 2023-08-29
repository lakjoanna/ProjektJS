const Sequelize = require ("sequelize")

const databaseName = "clotesshop"
const login = "root"
const password = "root"

const database = new Sequelize (databaseName, login, password,
{
    dialect:"mysql",
    host:"localhost",
    timezone:"+02:00"
})

module.exports = database