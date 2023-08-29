const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports.postLoginController = async (req, res) => {
    const login = req.body.login
    const password = req.body.password

    /*
    1. Wyszukujemy użytkownika po loginie
    2. Sprawdzamy poprawność hasła
    3. Odsyłamy informację
    */

    const user = await User.findOne({
        where: {
            login: login
        }
    })

    if(!user)
    {
        res.sendStatus(401)
        return
    }

    const passworCorrect = await bcrypt.compare(password, user.password)
    if(!passworCorrect)
    {
        res.sendStatus(401)
        return
    }

    res.json({ user })
}