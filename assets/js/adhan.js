
let lastAdhan = "";

function checkAdhan(){

const prayers = document.querySelectorAll("#prayer-times div");

const now = new Date();

const current = now.getHours()+":"+now.getMinutes().toString().padStart(2,"0");

prayers.forEach(p=>{

const time = p.dataset.time;

if(time === current && lastAdhan !== time){

lastAdhan = time;

alert("🕌 It is time for prayer");

}

});

}

setInterval(checkAdhan,60000);

