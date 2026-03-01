const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();

fetch("https://api.aladhan.com/v1/calendarByCity?city=Nairobi&country=Kenya&method=2&month=" + month + "&year=" + year)
.then(function(res){ return res.json(); })
.then(function(data){

let days = data.data;
let today = now.getDate();

let table = "<table style='width:100%;border-collapse:collapse;text-align:center;'>";

table += "<tr style='background:#111;color:gold;'><th>Hijri</th><th>Fajr</th><th>Dhuhr</th><th>Asr</th><th>Maghrib</th><th>Isha</th></tr>";

for(let i=0;i<days.length;i++){

let day = days[i];
let isToday = (parseInt(day.date.gregorian.day) === today);

table += "<tr style='background:" + (isToday ? "#0a7c3a" : "#1a1a1a") + ";'>";
table += "<td>" + day.date.hijri.day + " " + day.date.hijri.month.en + "</td>";
table += "<td>" + day.timings.Fajr.split(" ")[0] + "</td>";
table += "<td>" + day.timings.Dhuhr.split(" ")[0] + "</td>";
table += "<td>" + day.timings.Asr.split(" ")[0] + "</td>";
table += "<td>" + day.timings.Maghrib.split(" ")[0] + "</td>";
table += "<td>" + day.timings.Isha.split(" ")[0] + "</td>";
table += "</tr>";
}

table += "</table>";

document.getElementById("hijriCalendar").innerHTML = table;

})
.catch(function(){
document.getElementById("hijriCalendar").innerHTML = "Unable to load Islamic calendar.";
});
