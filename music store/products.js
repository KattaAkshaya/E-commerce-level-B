let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');

document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});
function filterProducts() {
  const priceRange = document.getElementById('price-range').value;
  const instrumentType = document.getElementById('instrument-type').value;
  const products = document.querySelectorAll('.product');

  products.forEach((product) => {
     let productPrice = parseInt(product.querySelector('.price').innerText.replace(/₹|,/g, ''));
     let productName = product.querySelector('h3').innerText.toLowerCase();
     let showProduct = true;

     // Filter by price
     if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (productPrice < min || productPrice > max) {
           showProduct = false;
        }
     }

     // Filter by instrument type
     if (instrumentType !== 'all') {
        if (!productName.includes(instrumentType)) {
           showProduct = false;
        }
     }

     // Show or hide product based on filter
     if (showProduct) {
        product.style.display = 'block';
     } else {
        product.style.display = 'none';
      }
   });
}
// Function to show a popup
function showPopup(popupId) {
  document.getElementById(popupId).style.display = 'flex';
}

// Function to hide a popup
function hidePopup(popupId) {
  document.getElementById(popupId).style.display = 'none';
}

// Initialize the cart
function initializeCart() {
  let cart = localStorage.getItem('cart');
  if (!cart) {
      localStorage.setItem('cart', JSON.stringify([]));
  }
}

// Add item to the cart
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      showPopup('popup-added'); // Show popup for item added
  } else {
      showPopup('popup-existing'); // Show popup for item already in cart
  }
}

// Function to handle the "Buy Now" action
function buyNow(productId) {
  let cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart.includes(productId)) {
      cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      showPopup('popup-added'); // Show popup for item added
  } else {
      showPopup('popup-existing'); // Show popup for item already in cart
  }
}

// Add event listeners to the Add to Cart and Buy Now buttons
document.addEventListener('DOMContentLoaded', () => {
  initializeCart();

  document.querySelectorAll('.cart').forEach(button => {
      button.addEventListener('click', (e) => {
          const productId = e.target.closest('.preview').dataset.target;
          addToCart(productId);
      });
  });

  document.querySelectorAll('.buy').forEach(button => {
      button.addEventListener('click', (e) => {
          const productId = e.target.closest('.preview').dataset.target;
          buyNow(productId);
      });
  });

  // Add event listeners to close the popups
  document.getElementById('close-popup-added').addEventListener('click', () => {
      hidePopup('popup-added');
  });

  document.getElementById('close-popup-existing').addEventListener('click', () => {
      hidePopup('popup-existing');
  });
});
