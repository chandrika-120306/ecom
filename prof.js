
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
  if (input.includes("hello") || input.includes("hi")) return "Hi there! 👋";
  if (input.includes("hours")) return "We are open 9 AM - 6 PM.";
  if (input.includes("help")) return "I can answer FAQs and guide you. What do you need?";
  if (input.includes("bye")) return "Goodbye!";
  if (input.includes("what is this website")) return "This is a shopping website where you can buy clothes, furniture, and snacks.";
  if (input.includes("who are you")) return "I am a chatbot assistant for this shopping website.";
  if (input.includes("offers")) return "We have exciting offers on all products! check in the offers section which will be enabled when offers are there";
  return "Sorry, I don’t understand that.";
}

