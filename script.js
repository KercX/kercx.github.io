let coins = 10;
const productsContainer = document.getElementById('products');
const statusEl = document.getElementById('status');
const coinsEl = document.getElementById('coins');

// Загружаем JSON с продуктами
fetch('products.json')
    .then(res => res.json())
    .then(products => {
        products.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product';
            div.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}">
                <p>Price: ${product.price} coins</p>
                <button onclick="buyProduct(${product.id})">Buy</button>
            `;
            productsContainer.appendChild(div);
        });

        window.products = products; // сохраняем для покупки
    });

function buyProduct(id) {
    const product = window.products.find(p => p.id === id);
    if (coins >= product.price) {
        coins -= product.price;
        coinsEl.innerText = coins;
        startDelivery(product.name);
    } else {
        statusEl.style.color = 'red';
        statusEl.innerText = "Not enough coins! 😢";
    }
}

function startDelivery(productName) {
    statusEl.style.color = 'black';
    statusEl.innerText = `Order received for ${productName} ✅`;

    setTimeout(() => {
        statusEl.innerText = `${productName} is being prepared 🥤`;
    }, 2000);

    setTimeout(() => {
        statusEl.innerText = `${productName} is on the way 🚚`;
    }, 5000);

    setTimeout(() => {
        statusEl.style.color = 'green';
        statusEl.innerText = `${productName} has arrived! Enjoy! 🎉`;
    }, 9000);
}
