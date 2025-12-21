
document.querySelectorAll(".product-card[draggable='true']").forEach(card => {
  card.addEventListener("dragstart", e => {
    e.dataTransfer.setData("name", card.dataset.name);
    e.dataTransfer.setData("price", card.dataset.price);
    e.dataTransfer.setData("image", card.dataset.image);
    e.dataTransfer.effectAllowed = "copy";
  });
});
cartContainer.addEventListener("dragover", e => {
  e.preventDefault(); // required to allow drop
  e.dataTransfer.dropEffect = "copy";
});
cartContainer.addEventListener("drop", e => {
  e.preventDefault();
  const item = {
    name: e.dataTransfer.getData("name"),
    price: e.dataTransfer.getData("price"),
    image: e.dataTransfer.getData("image")
  };
  if (!item.name) return; // ignore invalid drop

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.push(item);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCartItem(item); // show immediately
});

function renderCartItem(item) {
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
}
function renderCartFromStorage() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  cartItems.forEach(renderCartItem);
}

// Call after defining functions and ensuring cartContainer exists
renderCartFromStorage();