
function filterLectures(){
let input=document.getElementById("searchLectures").value.toLowerCase()
let cards=document.querySelectorAll(".lecture-card")

cards.forEach(card=>{
let text=card.innerText.toLowerCase()
card.style.display=text.includes(input)?"block":"none"
})
}

