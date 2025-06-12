const user = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const authButtons = document.getElementById("auth-buttons");
const userIcon = document.getElementById("user-icon");
const userIconEl = document.getElementById("user-icon");
if (userIconEl) {
  userIconEl.addEventListener("click", toggleUserPopup);
}


if (isLoggedIn && user) {
  userIcon.style.display = "block";
  authButtons.style.display = "none";

  document.getElementById("popup-nama").textContent = user.nama;
  document.getElementById("popup-email").textContent = user.email;
  document.getElementById("popup-telp").textContent = user.telp;
  document.getElementById("popup-alamat").textContent = user.alamat;
} else {
  userIcon.style.display = "none";
  authButtons.style.display = "block";
}
function closeAllPopups() {
  const userPopup = document.getElementById("user-popup");
  const cartPopup = document.getElementById("cartPopup");

  if (userPopup) {
    userPopup.style.display = "none";
  }

  if (cartPopup) {
    console.log("Menutup keranjang");
    cartPopup.style.display = "none";
  }
}



function toggleUserPopup(event) {
  event.stopPropagation(); // Hindari bubbling agar tidak ditutup oleh window click
  const popup = document.getElementById("user-popup");

  const isVisible = popup.style.display === "block";

  closeAllPopups();

  popup.style.display = isVisible ? "none" : "block";
}

function logout() {
  // Tutup semua popup sebelum logout
  closeAllPopups();

  // Set logout di localStorage
  localStorage.setItem("isLoggedIn", "false");


  location.reload();
}


let selectedProduct = null;
let selectedQty = 1;

function showProductPopup(button) {
  const card = button.closest(".card");
  const name = card.querySelector(".product-title").innerText;
  const priceText = card.querySelector(".price").innerText;
  const price = parseInt(priceText.replace("Rp", "").replace(/\./g, "").trim());
  const image = card.querySelector("img").src;

  selectedProduct = { name, price, image };
  selectedQty = 1;

  document.getElementById("popupImage").src = image;
  document.getElementById("popupName").innerText = name;
  document.getElementById("popupPrice").innerText = "Harga: Rp" + price.toLocaleString();
  document.getElementById("popupQty").innerText = selectedQty;

  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function increasePopupQty() {
  selectedQty++;
  document.getElementById("popupQty").innerText = selectedQty;
}

function decreasePopupQty() {
  if (selectedQty > 1) {
    selectedQty--;
    document.getElementById("popupQty").innerText = selectedQty;
  }
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalItems;
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
});

function confirmAddToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingItem = cart.find(item => item.name === selectedProduct.name);

  if (existingItem) {
    existingItem.quantity += selectedQty;
  } else {
    cart.push({ ...selectedProduct, quantity: selectedQty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang!");
  updateCartCount();
  closePopup();
}


function showCartPopup() {
  closeAllPopups(); // Tutup popup lain sebelum buka keranjang
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) return; // Jangan tampilkan popup kalau belum login

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Keranjang kosong.</p>";
  } else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <p><strong>${item.name}</strong></p>
          <p>Qty: ${item.quantity}</p>
          <p>Harga: Rp${(item.price * item.quantity).toLocaleString()}</p>
        </div>
        <button class="delete-btn" onclick="removeItem(${index})">🗑️</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }

  document.getElementById("cartPopup").style.display = "flex";
}


function closeCartPopup() {
  document.getElementById("cartPopup").style.display = "none";
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartPopup();
}

document.getElementById("cart-btn").addEventListener("click", showCartPopup);

document.getElementById("cartPopup").addEventListener("click", function (e) {
  if (e.target === this) closeCartPopup();
});

window.addEventListener("click", function (e) {
  const userPopup = document.getElementById("user-popup");
  const userIcon = document.getElementById("user-icon");
  const cartPopup = document.getElementById("cartPopup");


  // Tutup popup user jika klik di luar
  if (userPopup && !userPopup.contains(e.target) && !userIcon.contains(e.target)) {
    userPopup.style.display = "none";
  }

  if (cartPopup && e.target === cartPopup) {
    cartPopup.style.display = "none";
  }

});

const path = window.location.pathname;
if (path.includes("produk.html")) {
  document.getElementById("nav-produk").classList.add("active");
} else if (path.includes("home.html")) {
  document.getElementById("nav-home").classList.add("active");
} else if (path.includes("contact.html")) {
  document.getElementById("nav-contact").classList.add("active");
}

function toggleNav() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("show");
}