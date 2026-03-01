document.addEventListener("DOMContentLoaded", function() {

const today = new Date();

const hijriFormatterFull = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const hijriMonthFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  month: 'long',
  year: 'numeric'
});

let monthTitle = hijriMonthFormatter.format(today);

let table = "<h3 style='color:gold;margin-bottom:15px;'>" + monthTitle + "</h3>";
table += "<table style='width:100%;border-collapse:collapse;text-align:center;background:#111;color:white;border:2px solid gold;'>";

table += "<tr style='background:#000;color:gold;'>";
table += "<th style='border:1px solid gold;padding:8px;'>Day</th>";
table += "<th style='border:1px solid gold;padding:8px;'>Hijri Date</th>";
table += "<th style='border:1px solid gold;padding:8px;'>Gregorian</th>";
table += "</tr>";

for(let i=1;i<=30;i++){

  let gDate = new Date(today.getFullYear(), today.getMonth(), i);
  let hijriDate = hijriFormatterFull.format(gDate);
  let isToday = (gDate.getDate() === today.getDate());

  table += "<tr style='background:" + (isToday ? "#0a7c3a" : "#1a1a1a") + ";'>";

  table += "<td style='border:1px solid gold;padding:8px;'>" + i + "</td>";
  table += "<td style='border:1px solid gold;padding:8px;'>" + hijriDate + "</td>";
  table += "<td style='border:1px solid gold;padding:8px;'>" + gDate.toDateString() + "</td>";

  table += "</tr>";
}

table += "</table>";

document.getElementById("hijriCalendar").innerHTML = table;

});
