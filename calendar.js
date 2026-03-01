document.addEventListener("DOMContentLoaded", function() {

const today = new Date();
const hijriToday = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(today);

const monthFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  month: 'long',
  year: 'numeric'
});

const dayFormatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
  day: 'numeric'
});

let table = "<h3 style='color:gold;margin-bottom:15px;'>" + monthFormatter.format(today) + "</h3>";
table += "<table style='width:100%;border-collapse:collapse;text-align:center;background:#111;color:white;'>";
table += "<tr style='background:#000;color:gold;'><th>Day</th></tr>";

for(let i=1;i<=30;i++){
  let testDate = new Date(today.getFullYear(), today.getMonth(), i);
  let hijriDay = dayFormatter.format(testDate);

  let isToday = (testDate.getDate() === today.getDate());

  table += "<tr style='background:" + (isToday ? "#0a7c3a" : "#1a1a1a") + ";'>";
  table += "<td>" + hijriDay + "</td>";
  table += "</tr>";
}

table += "</table>";

document.getElementById("hijriCalendar").innerHTML = table;

});
