document.addEventListener("DOMContentLoaded", function(){

const surahSelect=document.getElementById("surahSelect");
const quranText=document.getElementById("quranText");
const player=document.getElementById("quranPlayer");

function playAyah(surah,ayah){
const reciter=document.getElementById("reciterSelect").value;
const ayahNum=String(ayah).padStart(3,"0");
player.src="https://cdn.islamic.network/quran/audio/128/"+reciter+"/"+surah+ayahNum+".mp3";
player.play();
}

window.playAyah=playAyah;

async function loadSurahList(){

const res=await fetch("https://api.alquran.cloud/v1/surah");
const data=await res.json();

surahSelect.innerHTML='<option value="">Select Surah</option>';

data.data.forEach(surah=>{
const opt=document.createElement("option");
opt.value=surah.number;
opt.textContent=surah.number+" - "+surah.englishName;
surahSelect.appendChild(opt);
});

}

async function loadSurah(){

const surahNumber=surahSelect.value;
if(!surahNumber) return;

const res=await fetch("https://api.alquran.cloud/v1/surah/"+surahNumber+"/editions/quran-uthmani,en.sahih");
const json=await res.json();

quranText.innerHTML="";

const arabic=json.data[0].ayahs;
const english=json.data[1].ayahs;

arabic.forEach((ayah,i)=>{

const div=document.createElement("div");
div.className="ayah";

div.innerHTML=`
<button onclick="playAyah(${surahNumber},${ayah.numberInSurah})">▶</button>
<div class="ayah-ar">${ayah.text}</div>
<div class="ayah-en">${english[i].text}</div>
`;

quranText.appendChild(div);

});

}

surahSelect.addEventListener("change",loadSurah);

loadSurahList();

});
