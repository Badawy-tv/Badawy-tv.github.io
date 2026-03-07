const months = [
["Muharram","محرم",30],
["Safar","صفر",29],
["Rabi al-Awwal","ربيع الأول",30],
["Rabi al-Thani","ربيع الآخر",29],
["Jumada al-Awwal","جمادى الأولى",30],
["Jumada al-Thani","جمادى الآخرة",29],
["Rajab","رجب",30],
["Sha'ban","شعبان",29],
["Ramadan","رمضان",30],
["Shawwal","شوال",29],
["Dhul Qa'dah","ذو القعدة",30],
["Dhul Hijjah","ذو الحجة",29]
];

const today = new Date();
const hijri = new Intl.DateTimeFormat('en-TN-u-ca-islamic',{
day:'numeric',
month:'long',
year:'numeric'
}).format(today);

document.getElementById("currentHijri").innerHTML =
"<strong>Today:</strong> "+hijri;

const tbody = document.getElementById("hijriMonths");

months.forEach((m,index)=>{

const row=document.createElement("tr");

row.innerHTML=
"<td>"+m[0]+"</td>"+
"<td>"+m[1]+"</td>"+
"<td>"+m[2]+"</td>";

tbody.appendChild(row);

});
