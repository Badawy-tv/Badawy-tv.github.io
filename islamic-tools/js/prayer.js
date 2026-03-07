async function loadPrayerTimes(){

const city="Nairobi";
const country="Kenya";

document.getElementById("location").innerHTML =
"Location: "+city+", "+country;

const url =
"https://api.aladhan.com/v1/timingsByCity?city="+city+"&country="+country+"&method=2";

const res = await fetch(url);
const data = await res.json();

const t = data.data.timings;

document.getElementById("fajr").textContent=t.Fajr;
document.getElementById("sunrise").textContent=t.Sunrise;
document.getElementById("dhuhr").textContent=t.Dhuhr;
document.getElementById("asr").textContent=t.Asr;
document.getElementById("maghrib").textContent=t.Maghrib;
document.getElementById("isha").textContent=t.Isha;

}

loadPrayerTimes();
