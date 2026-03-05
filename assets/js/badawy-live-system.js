const channelID = "UC4R8DWoMoI7CAwX8_LjQHig";
const liveContainer = document.querySelector(".live-player");

function loadLive(){
    const liveURL = "https://www.youtube.com/embed/live_stream?channel="+channelID;
    liveContainer.innerHTML =
    '<iframe width="100%" height="480" src="'+liveURL+'" frameborder="0" allowfullscreen></iframe>';
}

function showOfflineVideos(){
    const playlist = "https://www.youtube.com/embed/videoseries?list=UU"+channelID.substring(2);
    liveContainer.innerHTML =
    '<iframe width="100%" height="480" src="'+playlist+'" frameborder="0" allowfullscreen></iframe>';
}

function checkLive(){
    fetch("https://www.youtube.com/channel/"+channelID+"/live")
    .then(res => res.text())
    .then(data => {
        if(data.includes("isLiveNow")){
            loadLive();
            notifyLive();
        } else {
            showOfflineVideos();
        }
    });
}

function notifyLive(){
if(!localStorage.getItem("badawy_live_notified")){
alert("🔴 Badawy TV is LIVE now! Join the stream.");
localStorage.setItem("badawy_live_notified","1");
}
}

checkLive();
setInterval(checkLive,300000);
