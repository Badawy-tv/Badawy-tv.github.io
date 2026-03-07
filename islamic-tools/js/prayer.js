async function loadPrayerTimes(){

try{

const city="Nairobi";
const country="Kenya";

document.getElementById("location").innerHTML =
"<b>Location:</b> "+city+", "+country;

const response = await fetch(
"https://api.aladhan.com/v1/timingsByCity?city="+city+"&country="+country+"&method=2"
);

const data = await response.json();

const t = data.data.timings;

document.getElementById("fajr").innerText=t.Fajr;
document.getElementById("sunrise").innerText=t.Sunrise;
document.getElementById("dhuhr").innerText=t.Dhuhr;
document.getElementById("asr").innerText=t.Asr;
document.getElementById("maghrib").innerText=t.Maghrib;
document.getElementById("isha").innerText=t.Isha;

}catch(e){

console.log("Prayer API error",e);

document.querySelectorAll("#prayerTable td").forEach(td=>{
if(td.innerText==="") td.innerText="--";
});

}

}

loadPrayerTimes();
