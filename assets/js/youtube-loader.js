const container = document.getElementById("youtube-videos");

const videos = [
{
title: "Tawheed Lecture",
id: "dQw4w9WgXcQ"
},
{
title: "Importance of Salah",
id: "M7lc1UVf-VE"
},
{
title: "Lessons from Seerah",
id: "ysz5S6PUM-U"
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
