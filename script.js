window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("js", new Date());
gtag("config", "G-FS9CWPJWZS");
function toggleMenu(){
const menu=document.getElementById("sideMenu");
menu.classList.toggle("active");
}
window.addEventListener("scroll",function(){
const menu=document.getElementById("sideMenu");
if(menu.classList.contains("active")){
menu.classList.remove("active");
}
});
document.getElementById("articleSearch").addEventListener("keyup", function(){
let filter=this.value.toLowerCase();
let articles=document.querySelectorAll(".article");
articles.forEach(a=>{
a.style.display=a.innerText.toLowerCase().includes(filter)?"block":"none";
});
});
const nav=document.getElementById("mobileNav");
document.getElementById("menuToggle").onclick=function(){
nav.classList.toggle("showNav");
};

if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("/service-worker.js")

    .then(() => console.log("Service Worker Registered"));

}


// Security Protection
document.addEventListener('contextmenu', e => e.preventDefault());
setInterval(function(){debugger;},100);
