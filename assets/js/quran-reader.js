document.addEventListener("DOMContentLoaded", function(){

const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");
const player = document.getElementById("quranPlayer");

function playAyah(surah, ayah){
const reciter = document.getElementById("reciterSelect").value;
const ayahNum = String(ayah).padStart(3,"0");
player.src = "https://cdn.islamic.network/quran/audio/128/" + reciter + "/" + surah + ayahNum + ".mp3";
player.play();
}

async function loadSurahList(){
try{
const res = await fetch("https://api.alquran.cloud/v1/surah");
const json = await res.json();

surahSelect.innerHTML = "<option value=''>Select Surah</option>";

json.data.forEach(surah=>{
const opt = document.createElement("option");
opt.value = surah.number;
opt.textContent = surah.number + " - " + surah.englishName;
surahSelect.appendChild(opt);
});

}catch(e){
console.error("Surah list error:", e);
}
}

window.loadSurah = async function(){

const surahNumber = surahSelect.value;
if(!surahNumber) return;

try{

const res = await fetch("https://api.alquran.cloud/v1/surah/" + surahNumber);
const json = await res.json();

quranText.innerHTML = "";

json.data.ayahs.forEach(ayah=>{

const ayahDiv = document.createElement("div");
ayahDiv.className = "ayah";

ayahDiv.innerHTML =
'<button class="ayah-play" onclick="playAyah('+surahNumber+','+ayah.numberInSurah+')">▶</button>' +
'<span class="ayah-number">'+ayah.numberInSurah+'</span>' +
'<div class="ayah-ar">'+ayah.text+'</div>';

quranText.appendChild(ayahDiv);

});

}catch(e){
console.error("Surah load error:", e);
}

}

surahSelect.addEventListener("change", loadSurah);


});
