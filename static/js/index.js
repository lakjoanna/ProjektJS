document.addEventListener("DOMContentLoaded", () => {
    /*
    1. Pobieramy formularz oraz inputy do zmiennych
    2. Tworzymy listener zdarzenia 'submit' na formularzu
    3. Pobieramy dane z inputów czyl tekst w nich wporwdzony
    4. Wysyłamy dane na serwer
    */

    const loginForm = document.getElementById("loginForm")
    const inputLogin = document.getElementById("inputLogin")
    const inputPassword = document.getElementById("inputPassword")

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const login = inputLogin.value;
        const password = inputPassword.value;

        const userData= {
            login,
            password
        }

        const errors = validateUserData(userData)
        showErrors(errors)

        if(errors.length > 0)
        {
            return
        }

        fetch("http://127.0.0.1:3000/auth", {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        .then(res => {
            if(res.ok)
            {
                return res.json()
            }
            else
            {
                const errors = ["Wprowadzone dane logowania są błędne!"]
                showErrors(errors)
            }
        })
        .then(data => {
            if(data)
            {
                const sessionData = {
                    sessionId: getSessionId(),
                    user: data.user
                }

                const sessionDataJson = JSON.stringify(sessionData)
                localStorage.setItem("sessionData", sessionDataJson)

                window.location = "/userMain.html"
            }
        })

    })

})

function getSessionId()
{
    return  Math.floor(Math.random() * 10000) + 1
}


function validateUserData(userData)
{
    const errors = []
    if(!userData.login)
    {
        errors.push("Nie podano loginu!")
    }
    if(!userData.password)
    {
        errors.push("Nie podano hasła!")
    }
    return errors
}

function showErrors(errors)
{
    const divRegisterErrors = document.getElementById("divLoginErrors")
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