/* youtube-topic-loader.js
   Loads data/videos.json (created locally) and injects topic-matching videos
   Usage: loadTopicVideos("salah", "salahVideos", 6)
*/
async function loadTopicVideos(topic, containerId, limit = 6) {
  topic = (topic||"").toLowerCase();
  try {
    const res = await fetch("/data/videos.json");
    if (!res.ok) {
      console.warn("Could not load /data/videos.json (status " + res.status + ")");
      return;
    }
    const videos = await res.json();
    const filtered = videos.filter(v => v.title && v.title.toLowerCase().includes(topic)).slice(0, limit);
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    if (filtered.length === 0) {
      container.innerHTML = "<p>No matching videos found for &quot;" + topic + "&quot;.</p>";
      return;
    }
    filtered.forEach(v => {
      const div = document.createElement("div");
      div.className = "video-card";
      div.innerHTML = `
        <div class="video-frame">
          <iframe loading="lazy" src="https://www.youtube.com/embed/${v.id}" frameborder="0" allowfullscreen></iframe>
        </div>
        <h3 class="video-title">${escapeHtml(v.title)}</h3>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("youtube-topic-loader error:", err);
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]); });
  }
}
