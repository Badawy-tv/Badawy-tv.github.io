const videoContainer = document.getElementById("video-library");

const videos = [
{
title: "Friday Khutbah",
embed: "https://www.youtube.com/embed/dQw4w9WgXcQ"
},
{
title: "Importance of Salah",
embed: "https://www.youtube.com/embed/dQw4w9WgXcQ"
},
{
title: "Understanding Tawheed",
embed: "https://www.youtube.com/embed/dQw4w9WgXcQ"
}
];

videos.forEach(video => {
const card = document.createElement("div");
card.className = "video-card";

card.innerHTML = `
<iframe width="100%" height="220" src="${video.embed}" frameborder="0" allowfullscreen></iframe>
<h3>${video.title}</h3>
`;

videoContainer.appendChild(card);
});
