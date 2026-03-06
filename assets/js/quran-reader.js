document.addEventListener("DOMContentLoaded", function(){

const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");

/* Load Surah List */

async function loadSurahList(){

try{

const response = await fetch("https://api.alquran.cloud/v1/surah");
const data = await response.json();

surahSelect.innerHTML = "";

data.data.forEach(surah => {

let option = document.createElement("option");

option.value = surah.number;
option.textContent = surah.number + ". " + surah.englishName;

surahSelect.appendChild(option);

});

}catch(err){

console.error(err);

}

}

/* Load Surah */

window.loadSurah = async function(){

try{

const surahNumber = surahSelect.value;

const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`);
const data = await response.json();

quranText.innerHTML = "";

data.data.ayahs.forEach(ayah => {

let div = document.createElement("div");

div.className = "ayah";

div.innerHTML = ayah.text + " <span class='ayah-number'>" + ayah.numberInSurah + "</span>";

quranText.appendChild(div);

});

}catch(err){

console.error(err);

}

}

/* Start */

loadSurahList();

});
