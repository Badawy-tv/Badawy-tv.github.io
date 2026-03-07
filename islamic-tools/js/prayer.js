
const prayers = {
Fajr:"05:20",
Dhuhr:"12:40",
Asr:"15:50",
Maghrib:"18:45",
Isha:"20:00"
};

function nextPrayer(){

const now = new Date();
let nextName="";
let nextTime=null;

for(const name in prayers){

const t = prayers[name].split(":");

let prayer = new Date();

prayer.setHours(t[0]);
prayer.setMinutes(t[1]);
prayer.setSeconds(0);

if(prayer > now){

nextName=name;
nextTime=prayer;
break;

}

}

if(!nextTime){

nextName="Fajr";
const t = prayers["Fajr"].split(":");
nextTime = new Date();
nextTime.setDate(nextTime.getDate()+1);
nextTime.setHours(t[0]);
nextTime.setMinutes(t[1]);
nextTime.setSeconds(0);

}

return {name:nextName,time:nextTime};

}

function updateCountdown(){

const n = nextPrayer();
const now = new Date();

const diff = n.time-now;

const h = Math.floor(diff/3600000);
const m = Math.floor((diff%3600000)/60000);
const s = Math.floor((diff%60000)/1000);

document.getElementById("prayerCountdown").innerText =
"Next: "+n.name+" "+h+"h "+m+"m "+s+"s";

}

setInterval(updateCountdown,1000);

