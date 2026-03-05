async function loadYouTubeVideos() {

const channelID = "UC4R8DWoMoI7CAwX8_LjQHig";
const rssUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=" + channelID;

const response = await fetch(rssUrl);
const data = await response.json();

const container = document.getElementById("youtube-videos");

container.innerHTML = "";

data.items.slice(0,12).forEach(video => {

const title = video.title.toLowerCase();

let category = "general";

if(title.includes("salah")) category="salah";
else if(title.includes("tawheed")) category="tawheed";
else if(title.includes("seerah")) category="seerah";
else if(title.includes("quran")) category="quran";

const videoID = video.link.split("v=")[1];

const card = document.createElement("div");

card.className="lecture-card";

card.innerHTML = `
<h3>${video.title}</h3>
<iframe width="360" height="215"
src="https://www.youtube.com/embed/${videoID}"
frameborder="0"
allowfullscreen></iframe>
`;

container.appendChild(card);

});

}

loadYouTubeVideos();
