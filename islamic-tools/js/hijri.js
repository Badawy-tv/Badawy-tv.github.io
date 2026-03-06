async function hijri(){

const r=await fetch("https://api.aladhan.com/v1/gToH")

const d=await r.json()

const h=d.data.hijri

document.getElementById("hijri").innerText=
h.day+" "+h.month.en+" "+h.year+" AH"

}

hijri()
