const ADMIN_PASSWORD = "Badawy254@ahmad";

let pressTimer;
let isPromptOpen = false;   // lock system
let isProcessing = false;   // prevent double trigger

window.addEventListener("load", function() {

  const logo = document.querySelector(".profile-img");

  if (!logo) {
    console.log("Profile image not found");
    return;
  }

  logo.addEventListener("touchstart", function() {

    if (isProcessing) return;

    pressTimer = setTimeout(function() {
      openAdmin();
    }, 5000);

  });

  logo.addEventListener("touchend", function() {
    clearTimeout(pressTimer);
  });

  logo.addEventListener("touchmove", function() {
    clearTimeout(pressTimer);
  });

});

function openAdmin() {

  if (isPromptOpen) return;

  isPromptOpen = true;
  isProcessing = true;

  let pass = prompt("Enter Admin Password:");

  if (pass === null) {
    isPromptOpen = false;
    isProcessing = false;
    return;
  }

  pass = pass.trim();

  if (pass === ADMIN_PASSWORD) {
    showAdminPanel();
  } else {
    alert("Wrong Password");
  }

  isPromptOpen = false;
  setTimeout(() => {
    isProcessing = false;
  }, 500);
}

function showAdminPanel() {

  if (document.getElementById("adminPanel")) return;

  const panel = document.createElement("div");
  panel.id = "adminPanel";
  panel.style.position = "fixed";
  panel.style.bottom = "20px";
  panel.style.right = "20px";
  panel.style.background = "white";
  panel.style.padding = "15px";
  panel.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
  panel.style.borderRadius = "10px";
  panel.style.zIndex = "9999";

  panel.innerHTML = `
    <h3>ADMIN PANEL</h3>
    <button onclick="goLive('YouTube')">Go LIVE YouTube</button><br><br>
    <button onclick="goLive('Facebook')">Go LIVE Facebook</button><br><br>
    <button onclick="addNotification('New update added!')">Add Update</button><br><br>
    <button onclick="this.parentElement.remove()">Close</button>
  `;

  document.body.appendChild(panel);
}
