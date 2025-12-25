// ================= PRODUCTS =================
const products = [
  { name: "Dining Table", category: "Furniture", image: "inside/dtable.png", price: 15000, keywords: ["dining table","wooden table","home furniture","family table","dining set"] },
  { name: "Sofa", category: "Furniture", image: "inside/sofa.webp", price: 12000, keywords: ["sofa","living room sofa","couch","home furniture","comfortable seating"] },
  { name: "Dressing Table", category: "Furniture", image: "inside/dresst.jpg", price: 8700, keywords: ["dressing table","mirror table","bedroom furniture","makeup table","storage table"] },
  { name: "Cooking Oil", category: "Snacks", image: "inside/oil.webp", price: 750, keywords: ["oil","cooking oil","grocery","snacks","daily needs"] },
  { name: "Green Tea", category: "Snacks", image: "inside/gtea.webp", price: 350, keywords: ["green tea","tea","healthy drink","snacks","diet tea"] },
  { name: "Wheat", category: "Snacks", image: "inside/wheat.jpg", price: 250, keywords: ["wheat","atta","flour","grocery","snacks","daily needs"] },
  { name: "Men Shirt", category: "Male", image: "inside/shirt.avif", price: 1800, keywords: ["men shirt","shirt for men","male wear","formal shirt","casual shirt"] },
  { name: "Men Trouser", category: "Male", image: "inside/trouser.png", price: 2200, keywords: ["men trouser","pants for men","male wear","formal pant","casual pant"] },
  { name: "Men Jacket", category: "Male", image: "inside/jacket.avif", price: 3500, keywords: ["men jacket","winter wear","male jacket","coat for men"] },
  { name: "Saree", category: "Female", image: "inside/saree.jpg", price: 3500, keywords: ["saree","women saree","traditional wear","ethnic wear","festival dress"] },
  { name: "Women Dress", category: "Female", image: "inside/dress.jpg", price: 2200, keywords: ["women dress","ladies dress","casual dress","party wear","female wear"] },
  { name: "Women Trouser", category: "Female", image: "inside/pant.jpg", price: 4800, keywords: ["women trouser","ladies pant","female wear","casual pant"] },
  { name: "Girls Casual Wear", category: "Kids Casual", image: "inside/gc.jpg", price: 1500, keywords: ["girls casual","girls casual wear","kids casual","girls dress","casual dress"] },
  { name: "Girls Night Wear", category: "Kids Night", image: "inside/gn.webp", price: 1100, keywords: ["girls night","night dress","kids night wear","sleep wear"] },
  { name: "Girls Traditional Wear", category: "Kids Traditional", image: "inside/gt.webp", price: 2000, keywords: ["girls traditional","ethnic dress","festival wear","kids traditional"] },
  { name: "Boys Casual Wear", category: "Kids Casual", image: "inside/bc.jpg", price: 1200, keywords: ["boys casual","boys wear","kids casual","shirt for boys"] },
  { name: "Boys Night Wear", category: "Kids Night", image: "inside/bn.avif", price: 1000, keywords: ["boys night","kids night wear","sleep wear","night dress"] },
  { name: "Boys Traditional Wear", category: "Kids Traditional", image: "inside/bt.jpg", price: 2100, keywords: ["boys traditional","ethnic wear","festival dress","kids traditional"] }
];

// ---------- Search Form Listener ----------
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page reload
  searchProducts();
});

// ---------- Search Logic ----------
function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  if (!query) {
    displayProducts([]);
    return;
  }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.keywords.some(k => k.toLowerCase().includes(query))
  );

  displayProducts(matches);
}

// ---------- Display Products ----------
function displayProducts(productsList) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!productsList || productsList.length === 0) {
    resultsDiv.innerHTML = "<p>No products found.</p>";
    return;
  }

  let html = '<div class="row">';
  productsList.forEach(item => {
    html += `
      <div class="col-md-4 mb-3">
        <div class="card product"
             draggable="true"
             ondragstart="dragProduct(event)"
             data-name="${item.name}"
             data-price="${item.price}"
             data-image="${item.image}">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">₹${item.price}</p>
            <button class="btn btn-success" onclick="addToCart(this)">Add to Cart</button>
            <button class="btn btn-primary" onclick="buyNow(this)">Buy Now</button>
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';

  resultsDiv.innerHTML = html;
}

// ---------- Drag & Drop ----------
function dragProduct(event) {
  const target = event.target.closest(".product");
  const product = {
    name: target.dataset.name,
    price: target.dataset.price,
    image: target.dataset.image
  };
  event.dataTransfer.setData("text/plain", JSON.stringify(product));
}

function allowDrop(event) {
  event.preventDefault();
}

function dropProduct(event) {
  event.preventDefault();
  const raw = event.dataTransfer.getData("text/plain");
  if (!raw) return;

  const product = JSON.parse(raw);

  // ✅ Delegate to cart.js helpers
  let cart = getCart();
  const existing = cart.find(p => p.name === product.name);
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