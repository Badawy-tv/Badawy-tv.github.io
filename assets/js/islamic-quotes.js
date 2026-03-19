
const quotes = [

"Indeed, Allah is with the patient. — Quran 2:153",

"And whoever relies upon Allah – then He is sufficient for him. — Quran 65:3",

"So remember Me; I will remember you. — Quran 2:152",

"The best among you are those who learn the Quran and teach it. — Prophet Muhammad ﷺ",

"Allah does not burden a soul beyond that it can bear. — Quran 2:286"

];

function showQuote(){

const random = Math.floor(Math.random()*quotes.length);

document.getElementById("islamic-quote").innerText = quotes[random];

}

showQuote();

