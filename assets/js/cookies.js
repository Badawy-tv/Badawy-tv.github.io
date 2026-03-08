document.addEventListener("DOMContentLoaded", function(){

const banner = document.getElementById("cookie-banner");
const accept = document.getElementById("accept-cookies");
const reject = document.getElementById("reject-cookies");
const close = document.getElementById("close-cookies");

function setConsent(value){
localStorage.setItem("cookie_consent", value);
banner.style.display = "none";
}

if(!localStorage.getItem("cookie_consent")){
banner.style.display = "block";
}

accept.onclick = () => setConsent("accepted");
reject.onclick = () => setConsent("rejected");
close.onclick = () => setConsent("dismissed");

});
