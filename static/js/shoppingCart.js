document.addEventListener("DOMContentLoaded", () => {
    // 1. Pobieramy tablicę zawierajacą dane koszyka z localstorage
    // 2. Wyświetlamy dane z tablicy w formie tabeli

    let shoppingCart = []
    const shoppingCartJson = localStorage.getItem("shoppingCart") 
    if(shoppingCartJson)
    {
        shoppingCart = JSON.parse(shoppingCartJson)
    }

    const tBodyshoppingCart = document.getElementById("tBodyshoppingCart")

    for(let shoppingCartItem of shoppingCart)
    {
        const tr = document.createElement("tr")
        tBodyshoppingCart.appendChild(tr)

        const tdId = document.createElement("td")
        tr.appendChild(tdId)
        tdId.innerText = shoppingCartItem.commodity.id

        const tdName = document.createElement("td")
        tr.appendChild(tdName)
        tdName.innerText = shoppingCartItem.commodity.name

        const tdBrand = document.createElement("td")
        tr.appendChild(tdBrand)
        tdBrand.innerText = shoppingCartItem.commodity.brand
        
        const tdPrice = document.createElement("td")
        tr.appendChild(tdPrice)
        tdPrice.innerText = shoppingCartItem.commodity.price

        const tdQuantity = document.createElement("td")
        tr. appendChild(tdQuantity)
        tdQuantity.innerText = shoppingCartItem.quantity

        // 1. Tworzymy td dla wartości produktu
        // 2. dodajme to td do tr
        // 3. jako innerText tego td przypisujemy wartość = ilośc * cena

        const tdValue = document.createElement("td")
        tr.appendChild(tdValue)
        tdValue.innerText = shoppingCartItem.quantity * shoppingCartItem.commodity.price

        const tdBtnDelete = document.createElement("td")
        tr.appendChild(tdBtnDelete)
        
        const btnDelete = document.createElement("button")
        btnDelete.innerText = "Usuń"
        tdBtnDelete.appendChild(btnDelete)

        btnDelete.addEventListener("click" , () => {
            if(shoppingCartItem.quantity > 1)
            {
                shoppingCartItem.quantity = shoppingCartItem.quantity - 1
                tdQuantity.innerText = shoppingCartItem.quantity
            }
            else
            {
                const index = shoppingCart.indexOf(shoppingCartItem)
                shoppingCart.splice(index, 1)
                tr.remove()
            }

            const shoppingCartUpdatedJson = JSON.stringify(shoppingCart)
            localStorage.setItem("shoppingCart", shoppingCartUpdatedJson)
        })
    }


    // Zamawianie
     const btnZamow = document.getElementById("btnZamow")

     btnZamow.addEventListener("click", () => {

        if(confirm("Czy chcesz złożyć zamówienie?"))
        {
            createOrder()
        }

        // if(shoppingCartItem.commodity * )
     })

})

function createOrder()
{
    let shoppingCart = []
    const shoppingCartJson = localStorage.getItem("shoppingCart") 
    if(shoppingCartJson)
    {
        shoppingCart = JSON.parse(shoppingCartJson)
    }

    if(shoppingCart.length == 0)
    {
        alert("Twój koszyk jest pusty!")
        return
    }

    const sessionData = JSON.parse(localStorage.getItem("sessionData"))

    const orderData = {
        userId: sessionData.user.id,
        adressId: 1,
        orderPositions: []
    }

    for(let shoppingCartItem of shoppingCart)
    {
        const orderPositionModel = {
            quantity: shoppingCartItem.quantity,
            commodityId: shoppingCartItem.commodity.id
        }
        orderData.orderPositions.push(orderPositionModel)
    }

    fetch("http://127.0.0.1:3000/orders", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(res => {
        if(res.ok)
        {
            alert("Zamówienie utworzone poprawnie!")
            localStorage.removeItem("shoppingCart")
        }
        else
        {
            alert("Wystąpił błąd podczas tworzenia zamówienia!")
        }
    })

}

// 1. Dodać do tabeli koszyka, na stronie Koszyk, kolumnę z wartością która jest wyliczana dla każdego wiersza jako cena * ilość
// 2. Na stronie Koszyk dodać poniżej tabeli guzik "Zamów"
// - po jego kliknięciu pojawia się prompt z pytaniem czy na pewno chcemy złożyć zamówienie
// 3. Jeśli klient chce złożyć zamówienie, tworzyymy zamówienie na podstawie towarów z koszyka