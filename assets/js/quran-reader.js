const prevBtn=document.getElementById("prev-surah");
const nextBtn=document.getElementById("next-surah");


const surahSelect = document.getElementById("surah-select");
const versesContainer = document.getElementById("verses");
const loadButton = document.getElementById("load-surah");
const ayahInput = document.getElementById("ayah-input");
const reciterSelect = document.getElementById("reciter-select");

let currentReciter = reciterSelect.value;

reciterSelect.addEventListener("change", () => {
currentReciter = reciterSelect.value;
});

fetch("https://api.alquran.cloud/v1/surah")
.then(res => res.json())
.then(data => {

data.data.forEach(surah => {

const option = document.createElement("option");

option.value = surah.number;
option.textContent = surah.number + " - " + surah.englishName;

surahSelect.appendChild(option);

});

});

loadButton.addEventListener("click", loadSurah);

function loadSurah(){
    versesContainer.innerHTML = "Loading...";

const surahNumber = parseInt(surahSelect.value);
versesContainer.innerHTML="Loading Quran...";
const ayahNumber = ayahInput.value;

versesContainer.innerHTML = "Loading...";

Promise.all([

fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`),
fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`)

])
.then(res => Promise.all(res.map(r=>r.json())))
.then(data => {

const arabic = data[0].data.ayahs;
const translation = data[1].data.ayahs;


versesContainer.innerHTML="";

arabic.forEach((ayah,index)=>{

if(ayahNumber && ayah.numberInSurah != ayahNumber) return;

const div = document.createElement("div");
div.className="ayah";

const audioURL =
`https://cdn.islamic.network/quran/audio/128/${currentReciter}/${ayah.number}.mp3`;

div.innerHTML =

`
<div class="arabic" onclick="this.classList.toggle('word-mode')">
</div>
</div>

<div class="translation">
${translation[index].text}
</div>

<audio controls src="${audioURL}"></audio>
<button class="tafsir-btn">📖 Tafsir</button>
<button class="bookmark-btn">⭐ Bookmark</button>
<br><a download href="${audioURL}">⬇ Download</a>

`;

versesContainer.appendChild(div);

});

});

}

const playSurahBtn=document.getElementById("play-surah");
if(playSurahBtn){
playSurahBtn.addEventListener("click",()=>{
const audios=[...document.querySelectorAll(".ayah audio")];
if(audios.length===0){alert("Load a Surah first");return;}
let i=0;
function playNext(){
if(i>=audios.length) return;
audios[i].play().catch(()=>{});
audios[i].closest(".ayah").scrollIntoView({behavior:"smooth",block:"center"});

audios[i].onended=()=>{i++;playNext();};
}
playNext();
});
}
}
playNext();
});
}
const repeatBtn=document.getElementById("repeat-ayah");
let repeatMode=false;
if(repeatBtn){repeatBtn.onclick=()=>{repeatMode=!repeatMode;repeatBtn.style.background=repeatMode?"#4caf50":""}}



document.addEventListener("click",function(e){
if(e.target.classList.contains("bookmark-btn")){
const ayah=e.target.closest(".ayah").innerText;
let bookmarks=JSON.parse(localStorage.getItem("quranBookmarks")||"[]");
bookmarks.push(ayah);
localStorage.setItem("quranBookmarks",JSON.stringify(bookmarks));
alert("Ayah bookmarked");
}
});



function updateKhatmProgress(surah){
let read=JSON.parse(localStorage.getItem("khatm")||"[]");
if(!read.includes(surah)){
read.push(surah);
localStorage.setItem("khatm",JSON.stringify(read));
}
document.getElementById("khatm-progress").innerText="Progress: "+read.length+" / 114 Surahs";
}



document.addEventListener("click",function(e){
if(e.target.classList.contains("tafsir-btn")){
alert("Tafsir feature loading soon — preparing full Tafsir API integration.");
}
});

