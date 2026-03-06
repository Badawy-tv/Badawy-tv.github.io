document.addEventListener("DOMContentLoaded", function(){

const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");
const player = document.getElementById("quranPlayer");

let currentSurah = null;
let currentAyah = 0;
let totalAyahs = 0;

/* LOAD SURAH LIST */

async function loadSurahList(){

const res = await fetch("https://api.alquran.cloud/v1/surah");
const json = await res.json();

surahSelect.innerHTML = '<option value="">Select Surah</option>';

json.data.forEach(surah => {

const opt = document.createElement("option");
opt.value = surah.number;
opt.textContent = surah.number + " - " + surah.englishName;

surahSelect.appendChild(opt);

});

}

/* LOAD SURAH TEXT */

window.loadSurah = async function(){

const surahNumber = surahSelect.value;
if(!surahNumber) return;

currentSurah = surahNumber;

const res = await fetch("https://api.alquran.cloud/v1/surah/"+surahNumber+"/editions/quran-uthmani,en.sahih");
const json = await res.json();

const arabic = json.data[0].ayahs;
const english = json.data[1].ayahs;

totalAyahs = arabic.length;

quranText.innerHTML = "";

arabic.forEach((ayah,i)=>{

const div = document.createElement("div");
div.className="ayah";
div.id="ayah-"+ayah.numberInSurah;

div.innerHTML = `
<button class="ayah-play" onclick="playAyah(${surahNumber},${ayah.numberInSurah})">▶</button>
<div class="ayah-ar">${ayah.text}</div>
<div class="ayah-en">${english[i].text}</div>
<span class="ayah-number">${ayah.numberInSurah}</span>
`;

quranText.appendChild(div);

});

};

/* PLAY AYAH */

window.playAyah = function(surah,ayah){

const reciter = document.getElementById("reciterSelect").value;
const ayahNum = String(ayah).padStart(3,"0");

currentAyah = ayah;

player.src = "https://cdn.islamic.network/quran/audio/128/"+reciter+"/"+surah+ayahNum+".mp3";

highlightAyah(ayah);
scrollToAyah(ayah);

player.play();

};

/* HIGHLIGHT AYAH */

function highlightAyah(ayah){

document.querySelectorAll(".ayah").forEach(a=>{
a.style.background="#fafafa";
});

const current = document.getElementById("ayah-"+ayah);

if(current){
current.style.background="#e8f5e9";
}

}

/* AUTO SCROLL */

function scrollToAyah(ayah){

const el = document.getElementById("ayah-"+ayah);

if(el){

el.scrollIntoView({
behavior:"smooth",
block:"center"
});

}

}

/* NEXT AYAH AUTOPLAY */

player.addEventListener("ended", function(){

if(currentAyah < totalAyahs){

currentAyah++;

playAyah(currentSurah,currentAyah);

}

});

loadSurahList();

});
