document.addEventListener("DOMContentLoaded", function(){

const surahSelect = document.getElementById("surahSelect");

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

console.error("Surah loading failed",err);

}

}

loadSurahList();

});
