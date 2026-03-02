document.addEventListener("DOMContentLoaded", function(){

const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();

fetch(`https://api.aladhan.com/v1/calendarByCity?city=Nairobi&country=Kenya&method=2&month=${month}&year=${year}`)
.then(response => response.json())
.then(result => {

if(!result || !result.data){
document.getElementById("hijriCalendar").innerHTML = "Calendar failed to load.";
return;
}

let today = now.getDate();
let data = result.data;

let html = "<table style='width:100%;border-collapse:collapse;background:#111;color:white;border:1px solid gold;'>";

html += "<tr style='background:black;color:gold;'>";
html += "<th style='border:1px solid gold;padding:6px;'>Hijri</th>";
html += "<th style='border:1px solid gold;padding:6px;'>Fajr</th>";
html += "<th style='border:1px solid gold;padding:6px;'>Dhuhr</th>";
html += "<th style='border:1px solid gold;padding:6px;'>Asr</th>";
html += "<th style='border:1px solid gold;padding:6px;'>Maghrib</th>";
html += "<th style='border:1px solid gold;padding:6px;'>Isha</th>";
html += "</tr>";

data.forEach(day => {

let gDay = parseInt(day.date.gregorian.day);
let highlight = gDay === today ? "background:#0a7c3a;font-weight:bold;" : "";

html += `<tr style="${highlight}">`;
html += `<td style='border:1px solid gold;padding:6px;'>${day.date.hijri.day}</td>`;
html += `<td style='border:1px solid gold;padding:6px;'>${day.timings.Fajr.split(" ")[0]}</td>`;
html += `<td style='border:1px solid gold;padding:6px;'>${day.timings.Dhuhr.split(" ")[0]}</td>`;
html += `<td style='border:1px solid gold;padding:6px;'>${day.timings.Asr.split(" ")[0]}</td>`;
html += `<td style='border:1px solid gold;padding:6px;'>${day.timings.Maghrib.split(" ")[0]}</td>`;
html += `<td style='border:1px solid gold;padding:6px;'>${day.timings.Isha.split(" ")[0]}</td>`;
html += "</tr>";

});

html += "</table>";

document.getElementById("hijriCalendar").innerHTML = html;

})
.catch(()=>{
document.getElementById("hijriCalendar").innerHTML = "Unable to load Islamic calendar.";
});

});
