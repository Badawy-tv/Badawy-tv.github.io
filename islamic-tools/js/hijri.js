const months = [
"Muharram",
"Safar",
"Rabi al-Awwal",
"Rabi al-Thani",
"Jumada al-Awwal",
"Jumada al-Thani",
"Rajab",
"Sha'ban",
"Ramadan",
"Shawwal",
"Dhul Qa'dah",
"Dhul Hijjah"
];

const today = new Date();

const hijriFormatter = new Intl.DateTimeFormat(
'en-TN-u-ca-islamic',
{day:'numeric',month:'long',year:'numeric'}
);

const hijriToday = hijriFormatter.format(today);

document.getElementById("currentHijri").innerHTML =
"<b>Today (Hijri):</b> "+hijriToday;

const tbody=document.getElementById("hijriMonths");

months.forEach((m,i)=>{

const row=document.createElement("tr");

row.innerHTML=
"<td>"+(i+1)+"</td>"+
"<td>"+m+"</td>"+
"<td>"+(i%2==0?30:29)+"</td>";

tbody.appendChild(row);

});
