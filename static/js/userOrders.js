document.addEventListener("DOMContentLoaded", () => {
    // 1. Tworzymy w html tabelę z informacjami o zmowieniach. Tworzymy table, thead i puste tbody
    // 2. Kolumny takie jak dane na zmówieniu
    // 3. Przy pomocy fetch pobieramy dane o zamówieniach z serwera
    // 4. Na podstawie pobranych danych tworzymy wiersze tabeli w tbody


    
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

})

function createOrdersTable(orders) {
    const tBodyZamowienia = document.getElementById("tBodyZamowienia")
    
    // 1. Robimy pętlę for po tablicy orders
    // 2. Dla każego zamówienia z tablicy orders tworzymy wiersz tr w tabeli

    for(const order of orders)
    {
        const tr = document.createElement ("tr")
        tBodyZamowienia.appendChild(tr)

        const tdNumerZamowienia = document.createElement("td")
        tr.appendChild(tdNumerZamowienia)
        tdNumerZamowienia.innerText = order.number

        const tdUser = document.createElement("td")
        tr.appendChild (tdUser)
        tdUser.innerText = order.userId
    }

}