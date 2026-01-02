function closeWelcome() {
  document.getElementById("welcomeOverlay").style.display = "none";
  document.getElementById("offersContent").style.display = "block";
  document.querySelectorAll(".strip").forEach(strip => strip.remove());
}

// Generate falling strips on load
window.onload = function() {
  for (let i = 0; i < 25; i++) {
    let strip = document.createElement("div");
    strip.className = "strip";
    strip.style.left = Math.random() * window.innerWidth + "px";
    strip.style.background = ["#ff9800","#f44336","#4caf50","#2196f3","#ffc107"][Math.floor(Math.random()*5)];
    strip.style.animationDuration = (2 + Math.random()*3) + "s";
    document.getElementById("welcomeOverlay").appendChild(strip);
  }
};