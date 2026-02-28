
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

    <button id="ytBtn" style="
      width:100%;
      padding:12px;
      margin-bottom:10px;
      border:none;
      border-radius:10px;
      background:#ff0000;
      color:white;
      font-weight:bold;
      font-size:16px;
    ">🔴 Go LIVE on YouTube</button>

    <button id="fbBtn" style="
      width:100%;
      padding:12px;
      margin-bottom:15px;
      border:none;
      border-radius:10px;
      background:#1877f2;
      color:white;
      font-weight:bold;
      font-size:16px;
    ">🔵 Go LIVE on Facebook</button>

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

    <br><br>

    <button onclick="this.parentElement.remove()" style="
      width:100%;
      padding:10px;
      border:none;
      border-radius:10px;
      background:#444;
      color:white;
    ">Close</button>
  `;

  document.body.appendChild(panel);

  setTimeout(() => {
    panel.style.transform = "translate(-50%, -50%) scale(1)";
  }, 100);

  // Firebase controls
  const db = firebase.database();

  document.getElementById("toggleLive").onclick = () => {
    db.ref("liveStatus").once("value").then(snapshot => {
      const current = snapshot.val();
      db.ref("liveStatus").set(!current);
    });
  };

  document.getElementById("sendAnnouncement").onclick = () => {
    const message = document.getElementById("announcementInput").value;
    if (message.trim() !== "") {
      db.ref("announcement").set(message);
      document.getElementById("announcementInput").value = "";
      alert("Announcement sent!");
    }
  };

  document.getElementById("ytBtn").onclick = () => {
    window.open("https://youtube.com/", "_blank");
  };

  document.getElementById("fbBtn").onclick = () => {
    window.open("https://facebook.com/", "_blank");
  };
}

