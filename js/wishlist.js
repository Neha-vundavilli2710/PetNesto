// Load wishlist from localStorage or initialize
let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
let wishlistCounter = wishlistItems.length;

// Update count display
function updateCounts() {
  const countSpan = document.getElementById("wishlistCountDesktop");
  if (countSpan) countSpan.textContent = wishlistCounter;
}

// Toggle wishlist when heart is clicked
function toggleWishlist(element) {
  element.classList.toggle("active");

  const card = element.closest(".card");
  const name = card.querySelector(".name")?.innerText;
  const img = card.querySelector("img")?.src;

  if (!name || !img) return;

  if (element.classList.contains("active")) {
    wishlistItems.push({ name, img });
  } else {
    wishlistItems = wishlistItems.filter((item) => item.name !== name);
  }

  wishlistCounter = wishlistItems.length;
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));

  updateCounts();
  renderPopupItems("wishlistItems", wishlistItems);
  animateIcon("navWishlistDesktop");
}

// Render popup items in the wishlist
function renderPopupItems(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>No items added yet.</p>";
    return;
  }

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("popup-item");
    div.innerHTML = `
      <img src="${item.img}" alt="item" />
      <span>${item.name}</span>
    `;
    container.appendChild(div);
  });
}

// Toggle wishlist popup visibility
function togglePopup(id) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  }
}

// Animate icon (small bounce)
function animateIcon(id) {
  const icon = document.getElementById(id);
  if (icon) {
    icon.classList.add("bounce");
    setTimeout(() => icon.classList.remove("bounce"), 500);
  }
}

// Close popups when clicking outside
window.addEventListener("click", function (e) {
  if (
    !e.target.closest("#navWishlistDesktop") &&
    !e.target.closest(".popup")
  ) {
    const popup = document.getElementById("wishlistPopup");
    if (popup) popup.style.display = "none";
  }
});

// On page load
document.addEventListener("DOMContentLoaded", () => {
  wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  wishlistCounter = wishlistItems.length;

  updateCounts();
  renderPopupItems("wishlistItems", wishlistItems);

  // Activate wishlist hearts on already added items
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    const name = card.querySelector(".name")?.innerText;
    const heart = card.querySelector(".wishlist-icon");

    if (name && heart && wishlistItems.find(item => item.name === name)) {
      heart.classList.add("active");
    }
  });
});
