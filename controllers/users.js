const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports.getUsersController = async (req,res) => {
    const users = await User.findAll()
    res.json({users})
}

module.exports.postUserController = async (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const login = req.body.login
    const password = req.body.password

    const hash = await bcrypt.hash(password, 8)

    await User.create({
        name,
        surname,
        login,
        password: hash
    })
    res.sendStatus(200)
}

module.exports.deleteUserController = async (req,res) => {
    const id = req.params.id
    await User.destroy({ where: {id:id} })
    res.sendStatus(200)
}