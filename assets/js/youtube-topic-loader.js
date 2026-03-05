/*
 youtube-topic-loader.js - read /data/videos.json and inject topic-matching videos.
 Expects data/videos.json = [{"id":"VIDEOID","title":"Title"}, ...]
*/
async function loadTopicVideos(topic, containerId, limit=8) {
  topic = (topic||"").toLowerCase();
  try {
    const res = await fetch('/data/videos.json', {cache: "no-store"});
    if (!res.ok) { console.warn("Could not load /data/videos.json:", res.status); return; }
    const videos = await res.json();
    const filtered = videos.filter(v => (v.title||"").toLowerCase().includes(topic)).slice(0,limit);
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    if (filtered.length === 0) {
      container.innerHTML = "<p>No matching videos found for '"+topic+"'.</p>";
      return;
    }
    filtered.forEach(v=>{
      const div = document.createElement('div');
      div.className = 'video-card';
      div.innerHTML = `
        <div class="video-frame"><iframe loading="lazy" src="https://www.youtube.com/embed/${v.id}" frameborder="0" allowfullscreen></iframe></div>
        <h3 class="video-title">${escapeHtml(v.title)}</h3>
      `;
      container.appendChild(div);
    });
  } catch(e) {
    console.error("youtube-topic-loader error:", e);
  }

  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,function(m){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];}); }
}
