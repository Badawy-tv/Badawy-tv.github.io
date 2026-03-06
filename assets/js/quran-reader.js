document.addEventListener("DOMContentLoaded", () => {

const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");

/* Load Surah List */

async function loadSurahList(){

try{

const res = await fetch("https://api.alquran.cloud/v1/surah");
const json = await res.json();

surahSelect.innerHTML = "";

json.data.forEach(surah => {

let opt = document.createElement("option");

opt.value = surah.number;
opt.textContent = surah.number + ". " + surah.englishName;

surahSelect.appendChild(opt);

});

}catch(e){

console.error("Surah list error:",e);

}

}

/* Load Selected Surah */

window.loadSurah = async function(){

try{

const surahNumber = surahSelect.value;

if(!surahNumber) return;

const res = await fetch("https://api.alquran.cloud/v1/surah/" + surahNumber + "/quran-uthmani");
const json = await res.json();

quranText.innerHTML = "";

json.data.ayahs.forEach(ayah => {

const ayahDiv = document.createElement("div");

ayahDiv.className = "ayah";

ayahDiv.innerHTML =
ayah.text +
' <span class="ayah-number">' +
ayah.numberInSurah +
"</span>";

quranText.appendChild(ayahDiv);

});

}catch(e){

console.error("Surah load error:",e);

}

};

/* Start */

loadSurahList(); setTimeout(()=>{loadSurah()},500);

});
