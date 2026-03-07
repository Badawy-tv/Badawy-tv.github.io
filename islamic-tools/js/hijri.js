
const months = [
"Muharram",
"Safar",
"Rabi al-Awwal",
"Rabi al-Thani",
"Jumada al-Awwal",
"Jumada al-Thani",
"Rajab",
"Sha'ban",
"Ramadan",
"Shawwal",
"Dhul Qa'dah",
"Dhul Hijjah"
];

function getHijriToday(){

const today = new Date();

const hijri = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
day:'numeric',
month:'numeric',
year:'numeric'
}).formatToParts(today);

let day,month,year;

hijri.forEach(p=>{
if(p.type==="day") day=parseInt(p.value);
if(p.type==="month") month=parseInt(p.value);
if(p.type==="year") year=parseInt(p.value);
});

return {day,month,year};
}

function renderMonths(){

const container = document.getElementById("hijriMonths");
if(!container) return;

container.innerHTML="";

const today = getHijriToday();

months.forEach((m,i)=>{

const el = document.createElement("div");

el.className="hijri-month";

if(i+1===today.month){
el.classList.add("current-month");
}

el.innerText=m;

el.onclick=()=>{
renderDays(i+1);
};

container.appendChild(el);

});

renderDays(today.month);

}

function renderDays(month){

const container = document.getElementById("hijriDays");
if(!container) return;

container.innerHTML="";

const today = getHijriToday();

for(let d=1; d<=30; d++){

const day = document.createElement("div");

day.className="hijri-day";

if(month===today.month && d===today.day){
day.classList.add("today");
}

day.innerText=d;

container.appendChild(day);

}

}

document.addEventListener("DOMContentLoaded",renderMonths);

