const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

function toRad(deg){ return deg * Math.PI / 180; }
function toDeg(rad){ return rad * 180 / Math.PI; }

function calculateBearing(lat, lon){
  const y = Math.sin(toRad(KAABA_LON - lon)) * Math.cos(toRad(KAABA_LAT));
  const x =
    Math.cos(toRad(lat)) * Math.sin(toRad(KAABA_LAT)) -
    Math.sin(toRad(lat)) *
    Math.cos(toRad(KAABA_LAT)) *
    Math.cos(toRad(KAABA_LON - lon));
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function startQibla(){
  if(!navigator.geolocation){ return; }

  navigator.geolocation.getCurrentPosition(function(position){
    const bearing = calculateBearing(
      position.coords.latitude,
      position.coords.longitude
    );

    const info = document.getElementById("qibla-info");
    if(info){
      info.innerText = "Qibla Direction: " + bearing.toFixed(2) + "°";
    }
  });
}

document.addEventListener("DOMContentLoaded", startQibla);
