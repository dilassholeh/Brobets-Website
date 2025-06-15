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