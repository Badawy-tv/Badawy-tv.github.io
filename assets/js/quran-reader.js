document.addEventListener("DOMContentLoaded", function(){

const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");
const player = document.getElementById("quranPlayer");

window.playAyah = function(surah, ayah){
const reciter = document.getElementById("reciterSelect").value;
const ayahNum = String(ayah).padStart(3,"0");
player.src = "https://cdn.islamic.network/quran/audio/128/"+reciter+"/"+surah+ayahNum+".mp3";
player.play();
};

async function loadSurahList(){
const res = await fetch("https://api.alquran.cloud/v1/surah");
const json = await res.json();

surahSelect.innerHTML = '<option value="">Select Surah</option>';

json.data.forEach(surah=>{
const opt = document.createElement("option");
opt.value = surah.number;
opt.textContent = surah.number+" - "+surah.englishName;
surahSelect.appendChild(opt);
});
}

async function loadSurah(){

const surahNumber = surahSelect.value;
if(!surahNumber) return;

const res = await fetch("https://api.alquran.cloud/v1/surah/"+surahNumber+"/editions/quran-uthmani,en.sahih");
const json = await res.json();

const arabic = json.data[0].ayahs;
const english = json.data[1].ayahs;

quranText.innerHTML = "";

arabic.forEach((ayah,i)=>{

const div = document.createElement("div");
div.className="ayah";

div.innerHTML = `
<button onclick="playAyah(${surahNumber},${ayah.numberInSurah})">▶</button>
<div class="ayah-ar">${ayah.text}</div>
<div class="ayah-en">${english[i].text}</div>
<span class="ayah-number">${ayah.numberInSurah}</span>
`;

quranText.appendChild(div);

});

}

surahSelect.addEventListener("change",loadSurah);

loadSurahList();

});
