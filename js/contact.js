function showSuccessPopup(message) {
    const popup = document.getElementById("successPopup");
    popup.querySelector("p").textContent = "✔️ " + message;
    popup.style.display = "block";

    setTimeout(() => {
      popup.style.display = "none";
    }, 3000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form-container form");
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // cegah reload
      showSuccessPopup("Pesan berhasil dikirim!");
      form.reset();
    });

    const newsletterBtn = document.getElementById("newsletter-btn");
    const newsletterInput = document.querySelector(".newsletter input");

    newsletterBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (newsletterInput.value.trim() !== "") {
        showSuccessPopup("Pertanyaan berhasil dikirim!");
        newsletterInput.value = "";
      }
    });
  });

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
  event.stopPropagation();
  const popup = document.getElementById("user-popup");

  const isVisible = popup.style.display === "block";

  closeAllPopups();

  popup.style.display = isVisible ? "none" : "block";
}

function logout() {
  
  closeAllPopups();

  
  localStorage.setItem("isLoggedIn", "false");


  location.reload();
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
  // alert("Produk ditambahkan ke keranjang!");
  updateCartCount();
  closePopup();
}


function showCartPopup() {
  closeAllPopups(); 
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) return; 

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
          <p>${item.quantity}</p>
          <p>Rp${(item.price * item.quantity).toLocaleString()}</p>
        </div>
        <button class="delete-btn" onclick="removeItem(${index})">🗑️</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }

  document.getElementById("cartPopup").style.display = "flex";
  
  const checkoutBtn = document.querySelector(".co-btn");
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      localStorage.setItem("checkoutCart", JSON.stringify(cart)); 
      window.location.href = "checkout.html"; 
    };
  }
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








function toggleNav() {
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector("nav");

  navLinks.classList.toggle("show");
  hamburger.classList.toggle("active");

  // Deteksi apakah halaman Home (ubah sesuai path-mu)
  if (window.location.pathname.includes("home")) {
    nav.classList.toggle("active");
  }
}
