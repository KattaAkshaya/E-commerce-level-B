document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceContainer = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalPriceContainer.innerHTML = 'Total Price: ₹0';
            return;
        }

        cart.forEach(productId => {
            let product = getProductDetailsById(productId);
            if (product) {
                let productElement = document.createElement('div');
                productElement.className = 'cart-item';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <div class="price">${product.price}</div>
                    <button class="delete-btn" data-id="${productId}">Delete</button>
                `;
                cartItemsContainer.appendChild(productElement);
                totalPrice += parseInt(product.price.replace('₹', '').replace(',', ''));
            }
        });

        totalPriceContainer.innerHTML = `Total Price: ₹${totalPrice.toLocaleString()}`;
    }

    function getProductDetailsById(id) {
        const products = {
            'p-1': { name: 'Acoustic Guitar', image: 'images/guitar acoustic.jpeg', price: '₹15,000' },
            'p-2': { name: 'Sitar',           image: 'images/sitar.jpeg',          price: '₹5,000' },
            'p-3': { name: 'Bass Guitar',     image: 'images/guitars bass.png',    price: '₹36,999' },
            'p-4': { name: 'Tabla',           image: 'images/tabla.jpeg',           price: '₹3,999' },
            'p-5': { name: 'Double Bass',     image: 'images/doublebaaass.png',     price: '₹11,899' },
            'p-6': { name: 'Electric Guitar', image: 'images/guitar electric.jpeg', price: '₹25,000' },
            'p-7': { name: 'Piano',           image: 'images/piano.jpeg',          price: '₹35,000' },
            'p-8': { name: 'Saxophones',      image: 'images/saxophones.jpeg',    price: '₹12,000' },
            'p-9': { name: 'Drums',           image: 'images/drums.jpeg',         price: '₹9,300' },
            'p-10': { name: 'Black Drums',    image: 'images/black drums.jpeg',   price: '₹13,200' },
            'p-11': { name: 'Violin',         image: 'images/violin.jpeg',        price: '₹25,000' },
            'p-12': { name: 'Portable Piano', image: 'images/portable piano.png', price: '₹22,999' },
            'p-13': { name: 'Flute',          image: 'images/flute.png',          price: '₹1,999' },
            'p-14': { name: 'Cellos',        image: 'images/cellooss.jpeg',       price: '₹9,899' },
            'p-15': { name: 'Xylophone',     image: 'images/Xylophone.png',       price: '₹14,641' }
        };
        return products[id];
    }

    function removeFromCart(productId) {
        cart = cart.filter(id => id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
   

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const productId = event.target.getAttribute('data-id');
            removeFromCart(productId);
        }
    });

    displayCartItems();

    checkoutBtn.addEventListener('click', () => {
        localStorage.setItem('totalPrice', totalPriceContainer.textContent.replace('Total Price: ₹', ''));
        window.location.href = 'pay.html';
    });
});
