// Global products array (define once at the top of your script)
const products = [

  // ================= SNACKS / GROCERIES =================
  {
    name: "Cooking Oil",
    category: "Snacks",
    image: "inside/oil.webp",
    link: "snacks.html",
    keywords: [
      "oil", "cooking oil", "grocery", "snacks",
      "kitchen oil", "daily needs"
    ]
  },
  {
    name: "Green Tea",
    category: "Snacks",
    image: "inside/gtea.webp",
    link: "snacks.html",
    keywords: [
      "green tea", "tea", "healthy drink",
      "snacks", "diet tea"
    ]
  },
  {
    name: "Wheat",
    category: "Snacks",
    image: "inside/wheat.jpg",
    link: "snacks.html",
    keywords: [
      "wheat", "atta", "flour",
      "grocery", "snacks", "daily needs"
    ]
  },

  // ================= MALE =================
  {
    name: "Men Shirt",
    category: "Male",
    image: "inside/shirt.avif",
    link: "male.html",
    keywords: [
      "men shirt", "shirt for men",
      "male wear", "formal shirt",
      "casual shirt"
    ]
  },
  {
    name: "Men Trouser",
    category: "Male",
    image: "inside/trouser.png",
    link: "male.html",
    keywords: [
      "men trouser", "pants for men",
      "male wear", "formal pant",
      "casual pant"
    ]
  },
  {
    name: "Men Jacket",
    category: "Male",
    image: "inside/jacket.avif",
    link: "male.html",
    keywords: [
      "men jacket", "winter wear",
      "male jacket", "coat for men"
    ]
  },

  // ================= FEMALE =================
  {
    name: "Saree",
    category: "Female",
    image: "inside/saree.jpg",
    link: "female.html",
    keywords: [
      "saree", "women saree",
      "traditional wear", "ethnic wear",
      "festival dress"
    ]
  },
  {
    name: "Women Dress",
    category: "Female",
    image: "inside/dress.jpg",
    link: "female.html",
    keywords: [
      "women dress", "ladies dress",
      "casual dress", "party wear",
      "female wear"
    ]
  },
  {
    name: "Women Trouser",
    category: "Female",
    image: "inside/pant.jpg",
    link: "female.html",
    keywords: [
      "women trouser", "ladies pant",
      "female wear", "casual pant"
    ]
  },

  // ================= KIDS =================
  {
    name: "Girls Casual Wear",
    category: "Kids Casual",
    image: "inside/gc.jpg",
    link: "kids.html",
    keywords: [
      "girls casual", "girls casual wear",
      "kids casual", "girls dress",
      "casual dress"
    ]
  },
  {
    name: "Girls Night Wear",
    category: "Kids Night",
    image: "inside/gn.webp",
    link: "kids.html",
    keywords: [
      "girls night", "night dress",
      "kids night wear", "sleep wear"
    ]
  },
  {
    name: "Girls Traditional Wear",
    category: "Kids Traditional",
    image: "inside/gt.webp",
    link: "kids.html",
    keywords: [
      "girls traditional", "ethnic dress",
      "festival wear", "kids traditional"
    ]
  },
  {
    name: "Boys Casual Wear",
    category: "Kids Casual",
    image: "inside/bc.jpg",
    link: "kids.html",
    keywords: [
      "boys casual", "boys wear",
      "kids casual", "shirt for boys"
    ]
  },
  {
    name: "Boys Night Wear",
    category: "Kids Night",
    image: "inside/bn.jpg",
    link: "kids.html",
    keywords: [
      "boys night", "kids night wear",
      "sleep wear", "night dress"
    ]
  },
  {
    name: "Boys Traditional Wear",
    category: "Kids Traditional",
    image: "inside/bt.jpg",
    link: "kids.html",
    keywords: [
      "boys traditional", "ethnic wear",
      "festival dress", "kids traditional"
    ]
  }
];

// Attach listener to the search form
document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop page reload
  searchProducts();   // call your search function
});

function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  if (!query) {
    displayProducts([]); // show "No products found" if empty
    return;
  }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.keywords.some(k => k.toLowerCase().includes(query))
  );

  displayProducts(matches);
}

function displayProducts(productsList) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!productsList || productsList.length === 0) {
    resultsDiv.innerHTML = "<p>No products found.</p>";
    return;
  }

  let html = "";
  productsList.forEach(item => {
    html += `
      <div class="col-md-4 mb-3">
        <div class="card product">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.category}</p>
            <a href="${item.link}" class="btn btn-primary">View</a>
            <button class="btn btn-warning" onclick="addToCart('${item.name}')">Add to Cart</button>
            <button class="btn btn-success" onclick="buyNow('${item.name}')">Buy Now</button>
          </div>
        </div>
      </div>
    `;
  });

  resultsDiv.innerHTML = html;
}

// Example cart + buy functions
function addToCart(productName) {
  alert(productName + " added to cart!");
  // integrate with your cart.js logic here
}

function buyNow(productName) {
  alert("Proceeding to checkout for " + productName);
  // redirect to checkout page or payment gateway here
}