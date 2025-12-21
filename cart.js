function allowDrop(e) {
  e.preventDefault();
}

function dragProduct(e) {
  console.log("DRAG STARTED");

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

  const data = e.dataTransfer.getData("text/plain");
  if (!data) return;

  const product = JSON.parse(data);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  alert("Product added to cart");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = cart.length;
}

function buyNow(button) {
  const product = button.closest(".product");

  const buyItem = {
    name: product.dataset.name,
    price: product.dataset.price,
    image: product.dataset.image,
    quantity: 1
  };

  localStorage.setItem("buyNowItem", JSON.stringify(buyItem));
  window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", updateCartCount);
document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.getElementById("cartIcon");
  if (cartIcon) {
    cartIcon.addEventListener("click", function () {
      window.location.href = "cart.html";
    });
  }
});
function renderCartPage() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cart.forEach(item => {
    container.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card">
          <img src="${item.image}" class="card-img-top">
          <div class="card-body">
            <h5>${item.name}</h5>
            <p>₹${item.price}</p>
          </div>
        </div>
      </div>`;
  });
}

document.addEventListener("DOMContentLoaded", renderCartPage);
