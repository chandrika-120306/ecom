
  function showInfo() {
    alert('Name: John Doe ,Mobile: 9876543210');
    // Later you can replace alert with a modal or a div showing details
  }

  function logoutUser() {
    alert('Logged out!');
    // Here you would clear session / redirect in a real app
  }
 
document.getElementById('chatbotWindow').addEventListener('show.bs.collapse', () => {
  document.getElementById('chatLauncher').style.display = 'none';
});
document.getElementById('chatbotWindow').addEventListener('hidden.bs.collapse', () => {
  document.getElementById('chatLauncher').style.display = 'block';
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
  return "Sorry, I don’t understand that.";
}
