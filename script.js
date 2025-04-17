// Sample Product Data
const products = [
  { id: 1, name: "Produk 1", price: 10000 },
  { id: 2, name: "Produk 2", price: 20000 },
  { id: 3, name: "Produk 3", price: 30000 },
  { id: 4, name: "Produk 4", price: 40000 },
  { id: 5, name: "Produk 5", price: 50000 },
  { id: 6, name: "Produk 6", price: 60000 },
  { id: 7, name: "Produk 7", price: 70000 },
  { id: 8, name: "Produk 8", price: 80000 },
  { id: 9, name: "Produk 9", price: 90000 },
];

const itemsPerPage = 8;
let currentPage = 1;

// Shopping Cart State
let cart = [];

// Render Products
function renderProducts(page) {
  const productGrid = document.getElementById("productGrid");
  productGrid.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const paginatedProducts = products.slice(start, end);

  paginatedProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Rp ${product.price.toLocaleString()}</p>
      <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
    `;
    productGrid.appendChild(card);
  });
}

// Pagination
function renderPagination() {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.onclick = () => changePage(i);
      if (i === currentPage) button.classList.add("active");
      pagination.appendChild(button);
    }
  }
}

function changePage(page) {
  currentPage = page;
  renderProducts(currentPage);
  renderPagination();
}

// Add to Cart Functionality
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
    alert(`Produk "${product.name}" telah ditambahkan ke keranjang.`);
  }
}

// Update Cart Display
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  // Clear previous cart items
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
    `;
    cartItemsContainer.appendChild(cartItem);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Rp ${total.toLocaleString()}`;
}

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Contact Form Redirect
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = e.target.name.value;
  const message = e.target.message.value;
  const whatsappUrl = `https://wa.me/6285773009666?text=${encodeURIComponent(
    `Nama: ${name}\nPesan: ${message}`
  )}`;
  window.open(whatsappUrl, "_blank");
});

// Initialize
renderProducts(currentPage);
renderPagination();
