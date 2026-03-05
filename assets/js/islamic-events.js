
function updateIslamicEvents(){

const events = [
{ name: "Ramadan", date: "2026-02-17" },
{ name: "Eid al-Fitr", date: "2026-03-19" },
{ name: "Eid al-Adha", date: "2026-05-27" }
];

let container = document.getElementById("islamic-events");

if(!container) return;

container.innerHTML="";

events.forEach(e=>{

const today = new Date();

const eventDate = new Date(e.date);

const diff = Math.ceil((eventDate - today)/(1000*60*60*24));

const div = document.createElement("div");

div.innerHTML = `<strong>${e.name}</strong> — ${diff} days remaining`;

container.appendChild(div);

});

}

updateIslamicEvents();

