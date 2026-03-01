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

let html = "<table style='width:100%;border-collapse:collapse;background:#111;color:white;'>";

html += "<tr style='background:black;color:gold;'>";
html += "<th>Hijri</th><th>Fajr</th><th>Dhuhr</th><th>Asr</th><th>Maghrib</th><th>Isha</th>";
html += "</tr>";

data.forEach(day => {

let gDay = parseInt(day.date.gregorian.day);
let highlight = gDay === today ? "background:#0a7c3a;font-weight:bold;" : "";

html += `<tr style="${highlight}">`;
html += `<td>${day.date.hijri.day}</td>`;
html += `<td>${day.timings.Fajr.split(" ")[0]}</td>`;
html += `<td>${day.timings.Dhuhr.split(" ")[0]}</td>`;
html += `<td>${day.timings.Asr.split(" ")[0]}</td>`;
html += `<td>${day.timings.Maghrib.split(" ")[0]}</td>`;
html += `<td>${day.timings.Isha.split(" ")[0]}</td>`;
html += "</tr>";

});

html += "</table>";

document.getElementById("hijriCalendar").innerHTML = html;

})
.catch(error=>{
document.getElementById("hijriCalendar").innerHTML = "Unable to load Islamic calendar.";
});

});
