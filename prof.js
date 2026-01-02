
  function showInfo() {
    alert('Name: John Doe ,Mobile: 9876543210');
    // Later you can replace alert with a modal or a div showing details
  }

  function logoutUser() {
    alert('Logged out!');
    // Here you would clear session / redirect in a real app
  }
 
// Hide launcher when chatbot opens, show again when closed
const chatbotWindow = document.getElementById('chatbotWindow');
const chatLauncher = document.getElementById('chatLauncher');

chatbotWindow.addEventListener('show.bs.collapse', () => {
  chatLauncher.style.display = 'none';
});
chatbotWindow.addEventListener('hidden.bs.collapse', () => {
  chatLauncher.style.display = 'block';
});

function sendMessage() {
  const inputEl = document.getElementById("userInput");
  const chatbox = document.getElementById("chatbox");
  const text = inputEl.value.trim();
  if (!text) return;

  chatbox.innerHTML += "<p><b>You:</b> " + text + "</p>";
  chatbox.innerHTML += "<p><b>Bot:</b> " + getBotResponse(text.toLowerCase()) + "</p>";
  inputEl.value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotResponse(input) {
  input = input.toLowerCase(); // normalize input for easier matching

  if (input.includes("hello") || input.includes("hi")) return "Hi there! 👋";
  if (input.includes("hours")) return "We are open 9 AM - 6 PM.";
  if (input.includes("help")) return "I can answer FAQs and guide you. What do you need?";
  if (input.includes("bye")) return "Goodbye!";
  if (input.includes("what is this website") || input.includes("about")) 
    return "This is an e-commerce shopping website where you can buy clothes, furniture, groceries, and more.";
  if (input.includes("who are you") || input.includes("you")) 
    return "I am your friendly chatbot assistant here to help with shopping queries.";
  if (input.includes("offers") || input.includes("deal")) 
    return "We have exciting New Year offers on all products! 🎉 Check the offers section.";
  if (input.includes("shop")) 
    return "You can explore categories like Clothes, Furniture, and Groceries from the navigation menu.";
  if (input.includes("cart")) 
    return "Your cart keeps track of all the items you add. 🛒 You can checkout anytime.";
  if (input.includes("info")) 
    return "This page provides product details, discounts, and special festival offers.";
  if (input.includes("contact")) 
    return "You can reach us via the Contact page for support or queries.";

  return "Sorry, I don’t understand that.";
}

function showInfo() {
      // Redirect to another page
      window.location.href = "info.html";
    }


function logoutUser() {
  alert("You have been logged out!");
}
document.getElementById("footer").innerHTML = `
    <footer style="width:100%; height:40px; background:#222; color:#fff; display:flex; align-items:center; justify-content:center; font-size:14px;">
      © 2025 Your E-Commerce Store
    </footer>
  `;
