document.addEventListener("DOMContentLoaded", function() {

const today = new Date();
const gMonth = today.getMonth() + 1;
const gYear = today.getFullYear();

fetch("https://api.aladhan.com/v1/calendarByCity?city=Nairobi&country=Kenya&method=2&month=" + gMonth + "&year=" + gYear)
.then(res => res.json())
.then(data => {

let days = data.data;
let todayDate = today.getDate();

let table = "<h3 style='color:gold;margin-bottom:15px;'>" + days[0].date.hijri.month.en + " " + days[0].date.hijri.year + "</h3>";

table += "<table style='width:100%;border-collapse:collapse;text-align:center;background:#111;color:white;border:1px solid gold;'>";

table += "<tr style='background:#000;color:gold;'>";
table += "<th style='border:1px solid gold;padding:6px;'>Hijri</th>";
table += "<th style='border:1px solid gold;padding:6px;'>Fajr</th>";
table += "<th style='border:1px solid gold;padding:6px;'>Dhuhr</th>";
table += "<th style='border:1px solid gold;padding:6px;'>Asr</th>";
table += "<th style='border:1px solid gold;padding:6px;'>Maghrib</th>";
table += "<th style='border:1px solid gold;padding:6px;'>Isha</th>";
table += "</tr>";

for(let i=0;i<days.length;i++){

let day = days[i];
let isToday = (parseInt(day.date.gregorian.day) === todayDate);

table += "<tr style='background:" + (isToday ? "#0a7c3a" : "#1a1a1a") + ";'>";

table += "<td style='border:1px solid gold;padding:6px;'>" + day.date.hijri.day + "</td>";
table += "<td style='border:1px solid gold;padding:6px;'>" + day.timings.Fajr.split(" ")[0] + "</td>";
table += "<td style='border:1px solid gold;padding:6px;'>" + day.timings.Dhuhr.split(" ")[0] + "</td>";
table += "<td style='border:1px solid gold;padding:6px;'>" + day.timings.Asr.split(" ")[0] + "</td>";
table += "<td style='border:1px solid gold;padding:6px;'>" + day.timings.Maghrib.split(" ")[0] + "</td>";
table += "<td style='border:1px solid gold;padding:6px;'>" + day.timings.Isha.split(" ")[0] + "</td>";

table += "</tr>";
}

table += "</table>";

document.getElementById("hijriCalendar").innerHTML = table;

})
.catch(()=>{
document.getElementById("hijriCalendar").innerHTML = "Unable to load Islamic calendar.";
});

});
