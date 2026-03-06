document.addEventListener("DOMContentLoaded", function(){

const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");

/* Load Surah List */

async function loadSurahList(){

const response = await fetch("https://api.alquran.cloud/v1/surah");
const data = await response.json();

surahSelect.innerHTML = "";

data.data.forEach(surah => {

let option = document.createElement("option");

option.value = surah.number;
option.textContent = surah.number + ". " + surah.englishName;

surahSelect.appendChild(option);

});

}

/* Load Surah Ayahs */

async function loadSurah(){

const surahNumber = surahSelect.value;

const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`);
const data = await response.json();

quranText.innerHTML = "";

data.data.ayahs.forEach(ayah => {

let ayahBlock = document.createElement("div");

ayahBlock.className = "ayah";

ayahBlock.innerHTML = `
${ayah.text}
<span class="ayah-number">${ayah.numberInSurah}</span>
`;

quranText.appendChild(ayahBlock);

});

}

/* Make button work */

document.querySelector(".quran-controls button").onclick = loadSurah;

/* Initialize */

loadSurahList();

});
