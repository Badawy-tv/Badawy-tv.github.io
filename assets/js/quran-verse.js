
async function loadQuranVerse(){

try{

const response = await fetch("https://api.alquran.cloud/v1/ayah/random/en.asad");

const data = await response.json();

const verse = data.data.text;
const surah = data.data.surah.englishName;
const ayah = data.data.numberInSurah;

document.getElementById("quran-verse").innerHTML =
"📖 " + verse + "<br><strong>" + surah + " : " + ayah + "</strong>";

}catch(e){

document.getElementById("quran-verse").innerText =
"Unable to load Quran verse.";

}

}

loadQuranVerse();

