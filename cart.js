const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cartItems");

if (cartItems.length === 0) {
  cartContainer.innerHTML = "<p>Your cart is empty.</p>";
} else {
  cartItems.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
      <div class="card mb-3">
        <img src="${item.image}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">₹${item.price}</p>
        </div>
      </div>
    `;
    cartContainer.appendChild(col);
  });
}