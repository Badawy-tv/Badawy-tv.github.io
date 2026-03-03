document.addEventListener("DOMContentLoaded", function () {

    const compass = document.getElementById("compass");

    const KAABA_LAT = 21.4225;
    const KAABA_LON = 39.8262;

    function toRadians(deg) {
        return deg * Math.PI / 180;
    }

    function toDegrees(rad) {
        return rad * 180 / Math.PI;
    }

    function calculateQiblaDirection(lat, lon) {
        const dLon = toRadians(KAABA_LON - lon);
        const lat1 = toRadians(lat);
        const lat2 = toRadians(KAABA_LAT);

        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) -
                  Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

        const bearing = toDegrees(Math.atan2(y, x));
        return (bearing + 360) % 360;
    }

    function startCompass(qiblaDirection) {

        function handleOrientation(event) {
            if (event.alpha !== null && compass) {
                const heading = event.alpha;
                const rotation = qiblaDirection - heading;
                compass.style.transform = "rotate(" + rotation + "deg)";
            }
        }

        if (typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function") {

            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === "granted") {
                        window.addEventListener("deviceorientation", handleOrientation);
                    }
                })
                .catch(console.error);

        } else {
            window.addEventListener("deviceorientation", handleOrientation);
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;

            const qiblaDirection = calculateQiblaDirection(userLat, userLon);
            startCompass(qiblaDirection);

        }, function() {
            alert("Location permission required for Qibla direction");
        });
    }

});
