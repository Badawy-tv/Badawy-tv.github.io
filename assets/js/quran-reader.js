function playAyah(surah,ayah){const reciter=document.getElementById("reciterSelect").value;const player=document.getElementById("quranPlayer");const ayahNum=String(ayah).padStart(3,"0");player.src="https://cdn.islamic.network/quran/audio/128/"+reciter+"/"+surah+ayahNum+".mp3";player.play();}
document.addEventListener("DOMContentLoaded", () => {

const surahSelect = document.getElementById("surahSelect");
const quranText = document.getElementById("quranText");
const player = document.getElementById("quranPlayer");
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
/* Load Selected Surah */
window.loadSurah = async function(){
const surahNumber = surahSelect.value;
if(!surahNumber) return;
const reciter = document.getElementById("reciterSelect").value;
const audioURL="https://cdn.islamic.network/quran/audio-surah/128/"+reciter+"/"+surahNumber+".mp3"; player.src=audioURL;
const res = await fetch("https://api.alquran.cloud/v1/surah/" + surahNumber + "/editions/quran-uthmani,en.sahih," + reciter);
quranText.innerHTML = "";
const arabic = json.data[0].ayahs;
const english = json.data[1].ayahs;
arabic.forEach((ayah,i)=>{
const ayahDiv=document.createElement("div");
ayahDiv.className="ayah";
ayahDiv.innerHTML=`
<button class="ayah-play" onclick="playAyah(${surahNumber},${ayah.numberInSurah})">▶</button>
<div class="ayah-ar">${ayah.text}</div>
<div class="ayah-en">${english[i] ? english[i].text : ""}</div>
quranText.appendChild(ayahDiv);
console.error("Surah load error:",e);
};
/* Start */
loadSurahList(); setTimeout(()=>{loadSurah()},500);
