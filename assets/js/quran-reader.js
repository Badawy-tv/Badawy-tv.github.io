const surahSelect = document.getElementById("surah-select");
const quranText = document.getElementById("quran-text");

fetch("https://api.alquran.cloud/v1/surah")
.then(res => res.json())
.then(data => {

data.data.forEach(surah => {

let option = document.createElement("option");

option.value = surah.number;
option.text = surah.number + ". " + surah.englishName;

surahSelect.appendChild(option);

});

});

surahSelect.addEventListener("change", function(){

fetch("https://api.alquran.cloud/v1/surah/" + this.value)
.then(res => res.json())
.then(data => {

quranText.innerHTML = "";

data.data.ayahs.forEach(ayah => {

let p = document.createElement("p");

p.innerHTML = ayah.numberInSurah + ". " + ayah.text;

quranText.appendChild(p);

});

});

});
