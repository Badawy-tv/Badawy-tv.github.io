document.addEventListener("DOMContentLoaded", function(){

const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();

fetch(`https://api.aladhan.com/v1/timingsByCity?city=Nairobi&country=Kenya&method=2`)
.then(res => res.json())
.then(data => {

let timings = data.data.timings;

let prayers = {
Fajr: timings.Fajr,
Dhuhr: timings.Dhuhr,
Asr: timings.Asr,
Maghrib: timings.Maghrib,
Isha: timings.Isha
};

function getNextPrayer(){
let current = new Date();
let todayDate = current.toISOString().split("T")[0];

for(let name in prayers){
let time = prayers[name].split(" ")[0];
let prayerTime = new Date(todayDate + "T" + time);

if(prayerTime > current){
return {name, prayerTime};
}
}

let fajrTime = prayers.Fajr.split(" ")[0];
let tomorrow = new Date(current);
tomorrow.setDate(tomorrow.getDate()+1);
let tDate = tomorrow.toISOString().split("T")[0];
return {name:"Fajr", prayerTime:new Date(tDate+"T"+fajrTime)};
}

function updateCountdown(){
let next = getNextPrayer();
let nowTime = new Date();
let diff = next.prayerTime - nowTime;

let hours = Math.floor(diff / (1000*60*60));
let minutes = Math.floor((diff % (1000*60*60))/(1000*60));
let seconds = Math.floor((diff % (1000*60))/1000);

document.getElementById("nextPrayer").innerHTML =
"Next Prayer: <b>"+ next.name +"</b> at "+ next.prayerTime.toLocaleTimeString();

document.getElementById("countdown").innerHTML =
hours+"h "+minutes+"m "+seconds+"s";

}

setInterval(updateCountdown,1000);
updateCountdown();

})
.catch(()=>{
document.getElementById("nextPrayer").innerHTML="Unable to load prayer times.";
});

});
