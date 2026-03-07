
async function loadPrayerTimes(){

if(!navigator.geolocation){
document.getElementById("prayer-table").innerHTML="Location not supported";
return;
}

navigator.geolocation.getCurrentPosition(async function(pos){

const lat=pos.coords.latitude;
const lon=pos.coords.longitude;

const url=`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

const res=await fetch(url);
const data=await res.json();

const t=data.data.timings;

const prayers={
Fajr:t.Fajr,
Dhuhr:t.Dhuhr,
Asr:t.Asr,
Maghrib:t.Maghrib,
Isha:t.Isha
};

let html="";

for(const p in prayers){

html+=`
<tr>
<td>${p}</td>
<td>${prayers[p]}</td>
</tr>
`;

}

document.getElementById("prayer-table").innerHTML=html;

});

}

document.addEventListener("DOMContentLoaded",loadPrayerTimes);

