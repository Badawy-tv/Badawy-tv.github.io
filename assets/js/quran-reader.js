const surahSelect = document.getElementById("surah-select");
const quranText = document.getElementById("quran-text");
const translation = document.getElementById("quran-translation");
const audio = document.getElementById("quran-audio");

fetch("https://api.alquran.cloud/v1/surah")
.then(r=>r.json())
.then(data=>{
data.data.forEach(s=>{
let o=document.createElement("option");
o.value=s.number;
o.text=s.number+" - "+s.englishName;
surahSelect.appendChild(o);
});
});

surahSelect.addEventListener("change",function(){

quranText.innerHTML="Loading...";
translation.innerHTML="";

fetch("https://api.alquran.cloud/v1/surah/"+this.value+"/ar.alafasy")
.then(r=>r.json())
.then(data=>{

quranText.innerHTML="";
translation.innerHTML="";

data.data.ayahs.forEach(a=>{

let arab=document.createElement("p");
arab.style.fontSize="24px";
arab.style.direction="rtl";
arab.innerHTML=a.text;
quranText.appendChild(arab);

});

audio.src=data.data.ayahs[0].audio;

});

fetch("https://api.alquran.cloud/v1/surah/"+this.value+"/en.sahih")
.then(r=>r.json())
.then(data=>{

data.data.ayahs.forEach(a=>{
let t=document.createElement("p");
t.style.color="#444";
t.innerHTML=a.numberInSurah+". "+a.text;
translation.appendChild(t);
});

});

});
