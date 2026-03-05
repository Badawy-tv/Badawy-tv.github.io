#!/usr/bin/env bash

FILE="pages/lectures.html"

cat > $FILE <<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lectures - Badawy TV</title>

<style>
body{
font-family:Arial, sans-serif;
background:#0f172a;
color:white;
padding:40px;
}

h1{
text-align:center;
margin-bottom:40px;
}

h2{
margin-top:50px;
margin-bottom:20px;
}

.video-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
gap:20px;
}

iframe{
width:100%;
height:250px;
border:none;
border-radius:10px;
}
</style>
</head>

<body>

<h1>Islamic Lectures</h1>

<h2>Salah Lectures</h2>
<div id="salah-videos" class="video-grid"></div>

<h2>Tawheed Lectures</h2>
<div id="tawheed-videos" class="video-grid"></div>

<h2>Seerah Lectures</h2>
<div id="seerah-videos" class="video-grid"></div>

<script>

const API_KEY="AIzaSyCiv6whXRujv8cwN-1qfqThbC_FDeYknZE"

async function loadVideos(query,container){

const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=4&q=${query}&key=${API_KEY}`

const res=await fetch(url)
const data=await res.json()

const box=document.getElementById(container)

data.items.forEach(v=>{
box.innerHTML+=`
<iframe src="https://www.youtube.com/embed/${v.id.videoId}" allowfullscreen></iframe>
`
})

}

loadVideos("how to pray salah islam lecture","salah-videos")
loadVideos("tawheed islam lecture","tawheed-videos")
loadVideos("seerah prophet muhammad lecture","seerah-videos")

</script>

</body>
</html>
HTML

echo "Lecture page installed successfully"
