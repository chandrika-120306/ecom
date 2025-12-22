// ---------- Session behavior helpers ----------
function isReloadOrDirectOpen() {
  const nav = performance.getEntriesByType("navigation")[0];
  const type = nav ? nav.type : "navigate"; // "reload" | "navigate" | "back_forward" | "prerender"
  const directOpen = document.referrer === ""; // opened directly (no previous page)
  return type === "reload" || directOpen;
}

function isCartPage() {
  return location.pathname.endsWith("cart.html");
}

// ---------- Storage (session-only within current tab) ----------
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}
function setCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}
function clearCart() {
  sessionStorage.removeItem("cart");
}

// ---------- UI ----------
function updateCartCount() {
  const cart = getCart();
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = cart.length;
}

// ---------- Drag & Drop ----------
function allowDrop(e) {
  e.preventDefault();
}

function dragProduct(e) {
  const product = e.currentTarget;
  const data = {
    name: product.dataset.name,
    price: product.dataset.price,
    image: product.dataset.image
  };
  e.dataTransfer.setData("text/plain", JSON.stringify(data));
}

function dropToCart(e) {
  e.preventDefault();
  const raw = e.dataTransfer.getData("text/plain");
  if (!raw) return;

  const product = JSON.parse(raw);
  let cart = getCart();

  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  setCart(cart);
  updateCartCount();
  alert("Product added to cart");
}

// ---------- Buy Now ----------
function buyNow(button) {
  const product = button.closest(".product");
  const buyItem = {
    name: product.dataset.name,
    price: product.dataset.price,
    image: product.dataset.image,
    quantity: 1
  };
  sessionStorage.setItem("buyNowItem", JSON.stringify(buyItem));
  window.location.href = "checkout.html";
}

// ---------- Cart page rendering ----------
function renderCartPage() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<div class="alert alert-info text-center">Your cart is empty</div>`;
    const totalEl = document.getElementById("totalPrice");
    if (totalEl) totalEl.textContent = 0;
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const qty = item.quantity || 1;
    total += Number(item.price) * qty;

    container.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card">
          <img src="${item.image}" class="card-img-top">
          <div class="card-body">
            <h5>${item.name}</h5>
            <p>₹${item.price} × ${qty}</p>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      </div>`;
  });

  const totalEl = document.getElementById("totalPrice");
  if (totalEl) totalEl.textContent = total;
}

function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1);
  setCart(cart);
  renderCartPage();
  updateCartCount();
}

// ---------- Boot ----------
document.addEventListener("DOMContentLoaded", function () {
  // Clear cart ONLY when the tab is freshly opened or the page is refreshed.
  if (isReloadOrDirectOpen()) {
    clearCart();
  }

  updateCartCount();

  // Route to cart page from the icon
  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      window.location.href = "cart.html";
    });
  }

  // Render only on cart page
  if (isCartPage()) {
    renderCartPage();
  }
});