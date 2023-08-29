document.addEventListener("DOMContentLoaded", () => {
    const sessionDataJson = localStorage.getItem("sessionData")
    const sessionData = JSON.parse(sessionDataJson)

    // Wyświetlamy imię użytkownika na stronie
    const spanName = document.getElementById("spanName")
    spanName.innerText = sessionData.user.name

    // Obsługa wylogowywania
    const btnLogout = document.getElementById("btnLogout")
    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("sessionData")
        window.location = "/index.html"
    })
})