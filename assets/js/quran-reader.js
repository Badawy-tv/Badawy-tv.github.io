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

/* Initialize */

loadSurahList();
