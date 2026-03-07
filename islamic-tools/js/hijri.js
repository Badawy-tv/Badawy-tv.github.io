async function loadHijriCalendar(){

const today = new Date();
const day = today.getDate();
const month = today.getMonth()+1;
const year = today.getFullYear();

const res = await fetch(`https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`);
const data = await res.json();

const hijriMonth = data.data.hijri.month.number;
const hijriYear = data.data.hijri.year;

const cal = await fetch(`https://api.aladhan.com/v1/hijriCalendar/${hijriYear}/${hijriMonth}`);
const calendar = await cal.json();

const table = document.getElementById("calendar");

table.innerHTML="";

calendar.data.forEach(d =>{

const row = document.createElement("tr");

const hDay = d.hijri.day;
const gDay = d.gregorian.day;

row.innerHTML = `
<td>${hDay}</td>
<td>${gDay}</td>
<td>${d.gregorian.weekday.en}</td>
`;

if(parseInt(hDay)===parseInt(data.data.hijri.day)){
row.style.background="#e6f2ff";
row.style.fontWeight="bold";
}

table.appendChild(row);

});

}

loadHijriCalendar();
