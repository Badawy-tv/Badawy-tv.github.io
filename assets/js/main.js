document.addEventListener("DOMContentLoaded", function(){
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if(hamburger){
hamburger.onclick = function(){
navMenu.classList.toggle("active");
}
}
});

document.addEventListener("DOMContentLoaded", function(){

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if(hamburger){
hamburger.addEventListener("click", function(){
navMenu.classList.toggle("active");
});
}

});

