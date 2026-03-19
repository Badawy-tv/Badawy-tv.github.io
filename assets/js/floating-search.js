document.addEventListener("DOMContentLoaded", () => {

const btn = document.createElement("button");
btn.id = "floating-search-btn";
btn.innerHTML = "🔍";
document.body.appendChild(btn);

const panel = document.createElement("div");
panel.id = "floating-search-panel";

panel.innerHTML = `
<input type="text" id="floating-search-input" placeholder="Search BADAWY TV...">
<div id="floating-search-results"></div>
`;

document.body.appendChild(panel);

const input = panel.querySelector("#floating-search-input");
const results = panel.querySelector("#floating-search-results");

btn.onclick = () => {
panel.style.display = panel.style.display === "block" ? "none" : "block";
input.focus();
};

fetch("/assets/data/search.json")
.then(res => res.json())
.then(data => {

input.addEventListener("keyup", () => {

let query = input.value.toLowerCase();
results.innerHTML = "";

data.forEach(page => {

if(page.title.toLowerCase().includes(query)){

let a = document.createElement("a");
a.href = page.url;
a.textContent = page.title;

results.appendChild(a);

}

});

});

});

});
