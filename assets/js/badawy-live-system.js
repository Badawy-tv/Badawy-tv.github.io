/*
  Safe Badawy TV live helper (no YouTube API, no fetch)
  - Always shows the channel uploads playlist (latest videos)
  - Adds a clear "Watch Live on YouTube" button so users can go to live when available
  - Avoids any cross-origin fetchs to YouTube (no CORS errors), so no console '!'.
*/
(function(){
  const channelID = "UC9CqN3Gk8LQ2GqJHk0Y0pVQ";
  const liveContainer = document.querySelector(".live-player");
  if(!liveContainer) return;

  function loadUploads(){
    const uploads = "https://www.youtube.com/embed/videoseries?list=UU" + channelID.substring(2);
    liveContainer.innerHTML = ''
      + '<iframe width="100%" height="480" src="'+uploads+'" frameborder="0" allowfullscreen></iframe>'
      + '<div style="margin-top:12px; text-align:center;">'
      + '<a class="btn btn-primary" href="https://www.youtube.com/channel/'+channelID+'/live" target="_blank" rel="noopener">▶ Watch Live on YouTube</a>'
      + '</div>';
  }

  // Populate immediately (works on GitHub Pages)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadUploads);
  } else {
    loadUploads();
  }

  // Optional: refresh the uploads every 10 minutes to pick up new videos
  setInterval(loadUploads, 10 * 60 * 1000);
})();
