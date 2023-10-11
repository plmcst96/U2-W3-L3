// Funzione per caricare i dati dei libri dalla chiamata HTTP GET
const fetchBook = function () {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error('Problemi a contattare il server!')
            }
        })
        .then((data) => {
            console.log(data)
            displayBooks(data)
            outherBook = data
        })
        .catch((err) => {
            console.log('ERRORE!', err)
        })
}

// Funzione per visualizzare i libri nella pagina
const displayBooks = function (books) {
    const bookList = document.getElementById("bookList")
    bookList.innerHTML = ""

    books.forEach((book) => {
        const card = document.createElement("div")
        card.classList.add("col-md-3", "mb-4")

        card.innerHTML = `
                <div class="card">
                    <img src="${book.img
            }" class="card-img-top" alt="Copertina del libro" style="height: 380px;">
                    <div class="card-body">
                        <h6 class="card-title text-nowrap overflow-hidden text-truncate">${book.title
            }</h6>
                        <p class="card-text">$${book.price}</p>
                        <button class="btn btn-primary" onclick="addToCart('${book.title
            }', ${book.price})">Aggiungi al Carrello</button>
                        <button class="btn btn-danger" onclick="removeCard(this)">Scarta</button>
                    </div>
                </div>
            `

        bookList.appendChild(card)
    })
}

// Funzione per aggiungere un libro al carrello
const addToCart = function (title, price) {
    const cartList = document.getElementById("cartList")
    const li = document.createElement("li")
    li.innerHTML = `
            ${title} - $${price}
            <button class="btn btn-outline-danger" onclick="removeFromCart(this)">Rimuovi dal Carrello</button>
        `
    cartList.appendChild(li)
    updateCartStorage()
}

// Funzione per rimuovere un libro dal carrello
const removeFromCart = function (button) {
    const li = button.parentElement
    li.remove()
    updateCartStorage()
}

// Funzione per rimuovere una card dalla pagina
const removeCard = function (button) {
    const card = button.closest(".col-md-3")
    card.remove()
}

// Funzione per aggiornare il carrello nello storage del browser
const updateCartStorage = function () {
    const cartList = document.getElementById("cartList")
    const items = []
    cartList.querySelectorAll("li").forEach((li) => {
        items.push(li.textContent)
    })
    localStorage.setItem("cart", JSON.stringify(items))
}

// Inizializza la pagina caricando i libri e il carrello dallo storage
window.onload = () => {
    fetchBook()
    const cartList = document.getElementById("cartList")
    const cartItems = JSON.parse(localStorage.getItem("cart")) || []
    cartItems.forEach((item) => {
        const li = document.createElement("li")
        li.innerHTML = item
        cartList.appendChild(li)
    })
}
