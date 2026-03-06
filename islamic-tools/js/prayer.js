async function loadPrayerTimes(){

const res = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Mombasa&country=Kenya&method=2")

const data = await res.json()

const t = data.data.timings

const prayers = [
["Fajr",t.Fajr],
["Dhuhr",t.Dhuhr],
["Asr",t.Asr],
["Maghrib",t.Maghrib],
["Isha",t.Isha]
]

const now = new Date()

let next = null

for(let p of prayers){

const [name,time] = p

const [h,m] = time.split(":")

const pt = new Date()

pt.setHours(h)
pt.setMinutes(m)
pt.setSeconds(0)

if(pt>now){
next=[name,pt]
break
}

}

if(next){

document.getElementById("nextPrayer").innerText=next[0]

function update(){

const diff=next[1]-new Date()

const h=Math.floor(diff/3600000)
const m=Math.floor((diff%3600000)/60000)
const s=Math.floor((diff%60000)/1000)

document.getElementById("countdown").innerText=
h+"h "+m+"m "+s+"s"

}

setInterval(update,1000)

}

}

loadPrayerTimes()
