
window.onload = function() {

  if (typeof firebase === "undefined") {
    console.log("Firebase not loaded");
    return;
  }

  const auth = firebase.auth();
  const db = firebase.database();

  let pressTimer;
  let loginOpen = false;

  const logo = document.querySelector(".profile-img");
  if (!logo) {
    console.log("Profile image not found");
    return;
  }

  logo.addEventListener("touchstart", function() {
    pressTimer = setTimeout(() => {
      openLogin();
    }, 5000);
  });

  logo.addEventListener("touchend", () => clearTimeout(pressTimer));
  logo.addEventListener("touchmove", () => clearTimeout(pressTimer));

  function openLogin() {

    if (loginOpen) return;
    loginOpen = true;

    const email = prompt("Enter Admin Email:");
    if (!email) { loginOpen = false; return; }

    const password = prompt("Enter Password:");
    if (!password) { loginOpen = false; return; }

    auth.signInWithEmailAndPassword(email.trim(), password.trim())
      .then(() => {
        showAdminPanel();
        loginOpen = false;
      })
      .catch(error => {
        alert("Login Failed");
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
    panel.style.transform = "translate(-50%, -50%)";
    panel.style.width = "90%";
    panel.style.maxWidth = "400px";
    panel.style.background = "#111";
    panel.style.color = "white";
    panel.style.padding = "25px";
    panel.style.borderRadius = "20px";
    panel.style.zIndex = "10000";

    panel.innerHTML = `
      <h2 style="text-align:center;">🚀 ADMIN CONTROL</h2>

      <button id="toggleLive" style="width:100%;padding:12px;margin:10px 0;background:#00c853;color:white;border:none;border-radius:10px;">Toggle LIVE</button>

      <input id="announcementInput" placeholder="Type announcement..."
        style="width:100%;padding:10px;border-radius:8px;border:none;margin-bottom:10px;">

      <button id="sendAnnouncement" style="width:100%;padding:12px;background:#ff9800;color:white;border:none;border-radius:10px;">Send Announcement</button>

      <button id="logoutBtn" style="width:100%;padding:10px;margin-top:15px;background:#f44336;color:white;border:none;border-radius:10px;">Logout</button>
    `;

    document.body.appendChild(panel);

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

};

