document.addEventListener("DOMContentLoaded", () => {
    /*
    1. Pobieramy do zmiennych formularz oraz inputy
    */

    const addUserForm = document.getElementById("addUserForm")
    const inputName = document.getElementById("inputName")
    const inputSurname = document.getElementById("inputSurname")
    const inputLogin = document.getElementById("inputLogin")
    const inputPassword = document.getElementById("inputPassword")
    const inputPassword2 = document.getElementById("inputPassword2")


    addUserForm.addEventListener("submit", e => {
        e.preventDefault()
        
        const userData = {
            name: inputName.value,
            surname: inputSurname.value,
            login: inputLogin.value,
            password: inputPassword.value,
            password2: inputPassword2.value
        }

        const errors = validateUserData(userData)
        showErrors(errors)

        if(errors.length > 0)
        {
            return
        }

        // Rejestracja użytkownika
        fetch("http://127.0.0.1:3000/users", {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(res => {
            if(res.ok)
            {
                const infos = ["Rejestracja przebiegła poprawnie"]
                showInfos(infos)
            }
            else
            {
                const errors = ["Wystąpił błąd podczas rejestracji"]
                showErrors(errors)
            }
        })

    })
})

function validateUserData(userData)
{
    const errors = []
    if(!userData.name)
    {
        errors.push("Nie podano imienia!")
    }

    if(!userData.surname)
    {
        errors.push("Nie podano nazwiska!")
    }

    if(!userData.login)
    {
        errors.push("Nie podano loginu!")
    }

    if(!userData.password)
    {
        errors.push("Nie podano hasła!")
    }

    if(userData.password != userData.password2)
    {
        errors.push("Podane hasła nie są zdgodne!")
    }
    return errors
}

function showInfos(infos)
{
    const divRegisterInfo = document.getElementById("divRegisterInfo")
    if(infos.length > 0)
    {
        let message = ""
        for(let info of infos)
        {
            message += info + "</br>"
        }
        
        divRegisterInfo.innerHTML = message
    }
    else
    {
        divRegisterInfo.innerHTML = ""
    }
}

function showErrors(errors)
{
    const divRegisterErrors = document.getElementById("divRegisterErrors")
    if(errors.length > 0)
    {
        let message = ""
        for(let error of errors)
        {
            message += error + "</br>"
        }
        
        divRegisterErrors.innerHTML = message
    }
    else
    {
        divRegisterErrors.innerHTML = ""
    }
}