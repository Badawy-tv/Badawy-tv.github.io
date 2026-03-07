document.addEventListener("DOMContentLoaded", function(){

const months=[
"Muharram","Safar","Rabi al-Awwal","Rabi al-Thani",
"Jumada al-Awwal","Jumada al-Thani",
"Rajab","Sha'ban","Ramadan",
"Shawwal","Dhul Qa'dah","Dhul Hijjah"
];

const today=new Date();

const hijri=new Intl.DateTimeFormat('en-TN-u-ca-islamic',{
day:'numeric',
month:'long',
year:'numeric'
}).formatToParts(today);

let hDay=hijri.find(p=>p.type==="day").value;
let hMonth=hijri.find(p=>p.type==="month").value;
let hYear=hijri.find(p=>p.type==="year").value;

const monthIndex=months.findIndex(m=>m.toLowerCase().includes(hMonth.toLowerCase()));

document.getElementById("hijri-month").textContent=months[monthIndex]+" "+hYear;

let table="";
let day=1;

for(let r=0;r<5;r++){
table+="<tr>";
for(let c=0;c<7;c++){

if(day<=30){

if(day==hDay){
table+=`<td style="background:#caa84c;color:white;font-weight:bold">${day}</td>`;
}else{
table+=`<td>${day}</td>`;
}

day++;

}else{
table+="<td></td>";
}

}
table+="</tr>";
}

document.getElementById("hijri-days").innerHTML=table;

});
