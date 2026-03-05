async function loadPrayerTimes() {

const url = "https://api.aladhan.com/v1/timingsByCity?city=Mombasa&country=Kenya&method=2";

try {

const response = await fetch(url);
const data = await response.json();

const times = data.data.timings;

document.getElementById("prayer-times").innerHTML = `
<div class="prayer-grid">

<div class="prayer-card">
<h4>Fajr</h4>
<p>${times.Fajr}</p>
</div>

<div class="prayer-card">
<h4>Dhuhr</h4>
<p>${times.Dhuhr}</p>
</div>

<div class="prayer-card">
<h4>Asr</h4>
<p>${times.Asr}</p>
</div>

<div class="prayer-card">
<h4>Maghrib</h4>
<p>${times.Maghrib}</p>
</div>

<div class="prayer-card">
<h4>Isha</h4>
<p>${times.Isha}</p>
</div>

</div>
`;

} catch (error) {

document.getElementById("prayer-times").innerHTML =
"<p>Unable to load prayer times.</p>";

}

}

loadPrayerTimes();
