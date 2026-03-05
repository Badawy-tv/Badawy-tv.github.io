const container = document.getElementById("youtube-videos");

const videos = [
{
title: "Live Stream - Ahmad Badawy TV",
id: "live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig"
},
{
title: "Islamic Lecture",
id: "live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig"
},
{
title: "Islamic Reminder",
id: "live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig"
}
];

videos.forEach(video => {

const block = document.createElement("div");

block.innerHTML = `
<h3>${video.title}</h3>
<iframe width="560" height="315"
src="https://www.youtube.com/embed/${video.id}"
frameborder="0"
allowfullscreen>
</iframe>
`;

container.appendChild(block);

});
