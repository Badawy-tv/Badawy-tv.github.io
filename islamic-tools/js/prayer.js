
async function getPrayerTimes(){

if(!navigator.geolocation){
document.getElementById("location").innerText="Location not supported";
return;
}

navigator.geolocation.getCurrentPosition(async pos=>{

const lat = pos.coords.latitude;
const lon = pos.coords.longitude;

const today = new Date();
const day = today.getDate();
const month = today.getMonth()+1;
const year = today.getFullYear();

const api = `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lon}&method=2`;

const res = await fetch(api);
const data = await res.json();

const t = data.data.timings;

document.getElementById("fajr").innerText=t.Fajr;
document.getElementById("dhuhr").innerText=t.Dhuhr;
document.getElementById("asr").innerText=t.Asr;
document.getElementById("maghrib").innerText=t.Maghrib;
document.getElementById("isha").innerText=t.Isha;

document.getElementById("location").innerText =
data.data.meta.timezone;

startCountdown(t);

});

}

function startCountdown(times){

const prayers = [
["Fajr",times.Fajr],
["Dhuhr",times.Dhuhr],
["Asr",times.Asr],
["Maghrib",times.Maghrib],
["Isha",times.Isha]
];

function update(){

const now = new Date();

for(let p of prayers){

let [name,time]=p;

let parts=time.split(":");

let prayerTime=new Date();

prayerTime.setHours(parts[0]);
prayerTime.setMinutes(parts[1]);
prayerTime.setSeconds(0);

if(prayerTime>now){

let diff=prayerTime-now;

let h=Math.floor(diff/3600000);
let m=Math.floor((diff%3600000)/60000);
let s=Math.floor((diff%60000)/1000);

document.getElementById("nextPrayer").innerText=name;

document.getElementById("countdown").innerText=
h+"h "+m+"m "+s+"s";

return;

}

}

}

setInterval(update,1000);

}

getPrayerTimes();

