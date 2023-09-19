document.addEventListener("DOMContentLoaded", () => {
    // 1. Pobrać towary z serwera przy pomocy fetch()
    // 2. Stworzyć bazową tabelkę w HTML -> <table>, <thead> (w thead nagłówki) i <tbody>
    // 3. Na podstawie pobranych towarów wygenerować tabelkę tj. wiersze tabelki
    // Każdy wiersz tabelki to jeden kolejny towar

    const dataTBody = document.getElementById("dataTBody") 
    fetch("http://127.0.0.1:3000/commodities")
        .then(res=>{
            if(res.ok)
            {
                return res.json()
            }
            else
            {
                alert("Error")
            }
        })
        .then(data => {
            if(data)
            {
                console.log(data)

                for(let commodity of data.commoditys)
                {
                    const tr = document.createElement("tr")
                    dataTBody.appendChild(tr)

                    const tdID = document.createElement("td")
                    tr.appendChild(tdID)
                    tdID.innerText = commodity.id

                    const tdMarka = document.createElement("td")
                    tr.appendChild(tdMarka)
                    tdMarka.innerText = commodity.brand

                    const tdNazwa = document.createElement("td")
                    tr.appendChild(tdNazwa)
                    tdNazwa.innerText = commodity.name

                    const tdCena = document.createElement("td")
                    tr.appendChild(tdCena)
                    tdCena.innerText = commodity.price

                    const tdButton = document.createElement("td")
                    tr.appendChild(tdButton)
                    
                    const button = document.createElement("button")
                    button.innerText = "Dodaj do koszyka"
                    tdButton.appendChild(button)
                   
                    button.addEventListener("click", () => {
                        addToCart(commodity)
                    })
                }
            }
        })

})


function addToCart(commodity)
{
    let shoppingCart = []
    const shoppingCartJson = localStorage.getItem("shoppingCart")
    if(shoppingCartJson)
    {
        shoppingCart = JSON.parse(shoppingCartJson)
    }

    let shopingCartItem = shoppingCart.find(x => x.commodity.id == commodity.id)
    if(shopingCartItem)
    {
        shopingCartItem.quantity = shopingCartItem.quantity + 1
    }
    else
    {
        shopingCartItem = { commodity, quantity: 1  }
        shoppingCart.push(shopingCartItem)
    }

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
}