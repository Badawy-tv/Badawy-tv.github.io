const surahTitle=document.getElementById("surah-title");
const surahMeta=document.getElementById("surah-meta");
const prevBtn=document.getElementById("prev-surah");
const nextBtn=document.getElementById("next-surah");


const surahSelect = document.getElementById("surah-select");
const versesContainer = document.getElementById("verses");
const loadButton = document.getElementById("load-surah");
const ayahInput = document.getElementById("ayah-input");
const reciterSelect = document.getElementById("reciter-select");

let currentReciter = reciterSelect.value;

reciterSelect.addEventListener("change", () => {
currentReciter = reciterSelect.value;
});

fetch("https://api.alquran.cloud/v1/surah")
.then(res => res.json())
.then(data => {

data.data.forEach(surah => {

const option = document.createElement("option");

option.value = surah.number;
option.textContent = surah.number + " - " + surah.englishName;

surahSelect.appendChild(option);

});

});

loadButton.addEventListener("click", loadSurah);

function loadSurah(){

const surahNumber = surahSelect.value;
const ayahNumber = ayahInput.value;

versesContainer.innerHTML = "Loading...";

Promise.all([

fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`),
fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`)

])
.then(res => Promise.all(res.map(r=>r.json())))
.then(data => {

const arabic = data[0].data.ayahs;
const translation = data[1].data.ayahs;
const surah = data[0].data.surah;
if(surahTitle){surahTitle.innerText = surah.englishName + " (" + surah.name + ")";}
if(surahMeta){surahMeta.innerText = surah.revelationType + " • " + surah.numberOfAyahs + " Ayahs";}


versesContainer.innerHTML = "";

arabic.forEach((ayah,index)=>{

if(ayahNumber && ayah.numberInSurah != ayahNumber) return;

const div = document.createElement("div");
div.className="ayah";

const audioURL =
`https://cdn.islamic.network/quran/audio/128/${currentReciter}/${ayah.number}.mp3`;

div.innerHTML =

`
<div class="arabic">
${ayah.text} (${ayah.numberInSurah})
</div>

<div class="translation">
${translation[index].text}
</div>

<audio controls src="${audioURL}"></audio>
`;

versesContainer.appendChild(div);

});

});

}

const playSurahBtn=document.getElementById("play-surah");
if(playSurahBtn){
playSurahBtn.addEventListener("click",()=>{
const audios=[...document.querySelectorAll("audio")];
let i=0;
function playNext(){
if(i>=audios.length) return;
audios[i].play();
audios[i].onended=()=>{i++;playNext();};
}
playNext();
});
}
