document.addEventListener("DOMContentLoaded", function() {

const today = new Date();

const hijriMonthFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  month: 'long',
  year: 'numeric'
});

const hijriDayFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  day: 'numeric'
});

let table = "<h3 style='color:gold;margin-bottom:15px;'>" + hijriMonthFormatter.format(today) + "</h3>";

table += "<table style='width:100%;border-collapse:collapse;text-align:center;background:#111;color:white;'>";
table += "<tr style='background:#000;color:gold;'><th>Hijri Day</th></tr>";

for(let i=1;i<=30;i++){
  let gDate = new Date(today.getFullYear(), today.getMonth(), i);
  let hijriDay = hijriDayFormatter.format(gDate);
  let isToday = (gDate.getDate() === today.getDate());

  table += "<tr style='background:" + (isToday ? "#0a7c3a" : "#1a1a1a") + ";'>";
  table += "<td style='padding:8px;'>" + hijriDay + "</td>";
  table += "</tr>";
}

table += "</table>";

document.getElementById("hijriCalendar").innerHTML = table;

});
