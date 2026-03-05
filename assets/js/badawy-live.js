
const CHANNEL_ID = "UC9CqN3Gk8LQ2GqJHk0Y0pVQ";
const API_KEY = "YOUR_YOUTUBE_API_KEY";

async function loadBadawyLive(){

const liveContainer = document.querySelector(".live-player");

try{

// check if channel is live
let liveResponse = await fetch(
`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
);

let liveData = await liveResponse.json();

if(liveData.items.length > 0){

let videoId = liveData.items[0].id.videoId;

liveContainer.innerHTML = `
<iframe width="100%" height="480"
src="https://www.youtube.com/embed/${videoId}"
allowfullscreen></iframe>
`;

showLiveNotification();

}

else{

// show last livestream
let latestResponse = await fetch(
`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&maxResults=6&type=video&key=${API_KEY}`
);

let latestData = await latestResponse.json();

let videosHTML = "";

latestData.items.forEach(v=>{
videosHTML += `
<div class="live-video-card">
<iframe src="https://www.youtube.com/embed/${v.id.videoId}" allowfullscreen></iframe>
<p>${v.snippet.title}</p>
</div>
`;
});

liveContainer.innerHTML = `<div class="live-grid">${videosHTML}</div>`;

}

}catch(e){

console.log("Live system error",e);

}

}

function showLiveNotification(){

let popup=document.createElement("div");
popup.className="live-notice";
popup.innerHTML="🔴 Badawy TV is LIVE now — Click to Watch";

popup.onclick=function(){
window.scrollTo({top:0,behavior:"smooth"});
};

document.body.appendChild(popup);

setTimeout(()=>{
popup.remove();
},10000);

}

setInterval(loadBadawyLive,60000);

window.onload=loadBadawyLive;

