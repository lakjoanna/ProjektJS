document.addEventListener("DOMContentLoaded", () => {
    // 1. Tworzymy w html tabelę z informacjami o zmowieniach. Tworzymy table, thead i puste tbody
    // 2. Kolumny takie jak dane na zmówieniu
    // 3. Przy pomocy fetch pobieramy dane o zamówieniach z serwera
    // 4. Na podstawie pobranych danych tworzymy wiersze tabeli w tbody

    fetchOrdersAndCraeteTable()
})

function fetchOrdersAndCraeteTable()
{
 
    fetch("http://127.0.0.1:3000/orders", {
        method:"GET"
    })
    .then( res => {
        if(res.ok)
        {
            return res.json()
        }
    })
    .then(data => {
        console.log(data)
        if(data && data.orders)
        {
            createOrdersTable(data.orders)
        }
    })
}

function createOrdersTable(orders) {
    const tBodyZamowienia = document.getElementById("tBodyZamowienia")
    tBodyZamowienia.innerText = ""
    
    // 1. Robimy pętlę for po tablicy orders
    // 2. Dla każego zamówienia z tablicy orders tworzymy wiersz tr w tabeli

    for(const order of orders)
    {
        const tr = document.createElement ("tr")
        tBodyZamowienia.appendChild(tr)

        const tdZamowienie = document.createElement("td")
        tr.appendChild(tdZamowienie)

        const pZamowienie = document.createElement("p")
        tdZamowienie.appendChild(pZamowienie)
        if(order.user)
        {
            pZamowienie.innerText = order.number + " - " + order.user.name + " " + order.user.surname
        }
        else
        {
            pZamowienie.innerText = order.number
        }

        const btnUsun = document.createElement("button")
        tdZamowienie.appendChild(btnUsun)
        btnUsun.innerText = "Usuń"

        btnUsun.addEventListener("click", () => {
            fetch("http://127.0.0.1:3000/orders/" + order.id, {
                method:"DELETE"
            })
            .then(res => {
                if(res.ok)
                {
                    // Odświeżamy
                    fetchOrdersAndCraeteTable()
                }
                else
                {
                    alert("Błąd usuwania!")
                }
            })
        })

        // Tworzymy tabelę z pozycjami
        // 1. Tworzymy tabelę
        // 2. Tworzymy thead i tbody
        // 3. Tworzymy tr dla thead oraz th w tym tr z nagłówkami
        // 4. Robimy pętlę po elementach tablicy order.orderPositions, która to tablica zawiera pozycje zamówienia
        // 5. Dla każej pozycji zamówienia z tablicy order.orderPositions twozrymy jeden wiersz tr, tworzymy td z danymi oraz dodajemy
        // takie utworzone tr do tbody

        const tablePositions = document.createElement("table")
        tdZamowienie.appendChild(tablePositions)
       
        const theadPositions = document.createElement("thead")
        tablePositions.appendChild(theadPositions)

        const tbodyPositions = document.createElement("tbody")
        tablePositions.appendChild(tbodyPositions)

        // Nagłówek
        const trHeader = document.createElement("tr")
        theadPositions.appendChild(trHeader)

        const thName = document.createElement("th")
        trHeader.appendChild(thName)
        thName.innerText = "Nazwa Towaru"

        const thPrice = document.createElement("th")
        trHeader.appendChild(thPrice)
        thPrice.innerText = "Cena"

        const thQuantity = document.createElement("th")
        trHeader.appendChild(thQuantity)
        thQuantity.innerText = "Ilość"

        const thValue = document.createElement("th")
        trHeader.appendChild(thValue)
        thValue.innerText = "Wartość"

        // Wiersze z danymi do tbody

        let sumValue = 0
        for (let orderPosition of order.orderPositions)
        {
            const tr = document.createElement("tr")
            tbodyPositions.appendChild(tr)

            const tdName = document.createElement("td")
            tr.appendChild(tdName)
            tdName.innerText = orderPosition.commodity.name

            const tdPrice = document.createElement("td")
            tr.appendChild(tdPrice)
            tdPrice.innerText = orderPosition.commodity.price

            const tdQuantity = document.createElement("td")
            tr.appendChild(tdQuantity)
            tdQuantity.innerText = orderPosition.quantity

            const tdValue = document.createElement("td")
            tr.appendChild(tdValue)
            tdValue.innerText = orderPosition.commodity.price * orderPosition.quantity

            sumValue += orderPosition.commodity.price * orderPosition.quantity
        }

        // Wiersz z podsumowaniem pozycji
        const trSum = document.createElement("tr")
        tbodyPositions.appendChild(trSum)

        const tdSumaName = document.createElement("td")
        trSum.appendChild(tdSumaName)

        const tdSumaPrice = document.createElement("td")
        trSum.appendChild(tdSumaPrice)

        const tdSumaQuantity = document.createElement("td")
        trSum.appendChild(tdSumaQuantity)
        tdSumaQuantity.innerText = "Suma:"

        const tdSumaValue = document.createElement("td")
        trSum.appendChild(tdSumaValue)
        tdSumaValue.innerText = sumValue
    }

}