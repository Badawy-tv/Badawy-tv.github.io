const ADMIN_PASSWORD = "Badawy254@ahmad";

window.addEventListener("load", function() {

  const logo = document.querySelector(".profile-img");

  if (!logo) {
    console.log("Profile image not found");
    return;
  }

  let pressTimer;

  logo.addEventListener("touchstart", function() {
    pressTimer = setTimeout(function() {
      openAdmin();
    }, 2000); // 2 seconds long press
  });

  logo.addEventListener("touchend", function() {
    clearTimeout(pressTimer);
  });

  logo.addEventListener("touchmove", function() {
    clearTimeout(pressTimer);
  });

});

function openAdmin() {
  let pass = prompt("Enter Admin Password:");
  if (pass === ADMIN_PASSWORD) {
    showAdminPanel();
  } else {
    alert("Wrong Password");
  }
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
