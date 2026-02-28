
const auth = firebase.auth();
const db = firebase.database();

// Auto detect login
auth.onAuthStateChanged(user => {
  if (user) {
    showAdminPanel();
  }
});

// Long press 5 seconds to open login
let pressTimer;
let loginOpen = false;

window.addEventListener("load", function() {

  const logo = document.querySelector(".profile-img");
  if (!logo) return;

  logo.addEventListener("touchstart", function() {
    pressTimer = setTimeout(() => {
      openLogin();
    }, 5000);
  });

  logo.addEventListener("touchend", () => clearTimeout(pressTimer));
  logo.addEventListener("touchmove", () => clearTimeout(pressTimer));

});

function openLogin() {

  if (loginOpen) return;
  loginOpen = true;

  const email = prompt("Enter Admin Email:");
  if (!email) { loginOpen = false; return; }

  const password = prompt("Enter Password:");
  if (!password) { loginOpen = false; return; }

  auth.signInWithEmailAndPassword(email.trim(), password.trim())
    .then(() => {
      loginOpen = false;
    })
    .catch(error => {
      alert("Login Failed: " + error.message);
      loginOpen = false;
    });
}

function showAdminPanel() {

  if (document.getElementById("adminPanel")) return;

  const panel = document.createElement("div");
  panel.id = "adminPanel";

  panel.style.position = "fixed";
  panel.style.top = "50%";
  panel.style.left = "50%";
  panel.style.transform = "translate(-50%, -50%) scale(0.8)";
  panel.style.width = "90%";
  panel.style.maxWidth = "400px";
  panel.style.background = "#111";
  panel.style.color = "white";
  panel.style.padding = "25px";
  panel.style.borderRadius = "20px";
  panel.style.boxShadow = "0 20px 50px rgba(0,0,0,0.6)";
  panel.style.zIndex = "10000";
  panel.style.transition = "0.3s ease";

  panel.innerHTML = `
    <h2 style="text-align:center;margin-bottom:20px;">🚀 ADMIN CONTROL</h2>

    <button id="toggleLive" style="
      width:100%;
      padding:12px;
      margin-bottom:15px;
      border:none;
      border-radius:10px;
      background:#00c853;
      color:white;
      font-weight:bold;
      font-size:16px;
    ">Toggle LIVE Status</button>

    <input id="announcementInput" placeholder="Type announcement..."
      style="
        width:100%;
        padding:10px;
        border-radius:8px;
        border:none;
        margin-bottom:10px;
      ">

    <button id="sendAnnouncement" style="
      width:100%;
      padding:12px;
      border:none;
      border-radius:10px;
      background:#ff9800;
      color:white;
      font-weight:bold;
      font-size:16px;
    ">Send Announcement</button>

    <button id="logoutBtn" style="
      width:100%;
      padding:10px;
      margin-top:15px;
      border:none;
      border-radius:10px;
      background:#f44336;
      color:white;
    ">Logout</button>
  `;

  document.body.appendChild(panel);

  setTimeout(() => {
    panel.style.transform = "translate(-50%, -50%) scale(1)";
  }, 100);

  document.getElementById("toggleLive").onclick = () => {
    db.ref("liveStatus").once("value").then(snapshot => {
      db.ref("liveStatus").set(!snapshot.val());
    });
  };

  document.getElementById("sendAnnouncement").onclick = () => {
    const msg = document.getElementById("announcementInput").value;
    if (msg.trim() !== "") {
      db.ref("announcement").set(msg);
      alert("Announcement sent!");
    }
  };

  document.getElementById("logoutBtn").onclick = () => {
    auth.signOut();
    panel.remove();
  };
}

