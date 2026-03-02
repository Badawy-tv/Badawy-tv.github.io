let notifications = JSON.parse(localStorage.getItem("badawyNotifications")) || [];

function saveNotifications() {
  localStorage.setItem("badawyNotifications", JSON.stringify(notifications));
}

function addNotification(message) {
  notifications.unshift(message);
  saveNotifications();
  renderNotifications();
}

function renderNotifications() {
  const list = document.getElementById("notificationList");
  const count = document.getElementById("notifyCount");
  if (!list || !count) return;

  list.innerHTML = "";
  notifications.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    list.appendChild(li);
  });

  count.textContent = notifications.length;
}

function goLive(platform) {
  addNotification("🔴 LIVE on " + platform + " now!");
  showLiveBadge();
}

function showLiveBadge() {
  if (!document.getElementById("liveBadge")) {
    const badge = document.createElement("div");
    badge.id = "liveBadge";
    badge.innerHTML = "🔴 LIVE NOW";
    badge.style.position = "fixed";
    badge.style.top = "10px";
    badge.style.right = "10px";
    badge.style.background = "red";
    badge.style.color = "white";
    badge.style.padding = "10px 15px";
    badge.style.borderRadius = "8px";
    badge.style.zIndex = "9999";
    document.body.appendChild(badge);
  }
}

window.onload = renderNotifications;
