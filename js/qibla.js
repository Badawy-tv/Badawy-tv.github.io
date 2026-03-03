document.addEventListener("DOMContentLoaded", function () {

    const compass = document.getElementById("compass");

    function startCompass() {

        if (typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function") {

            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === "granted") {
                        window.addEventListener("deviceorientation", handleOrientation);
                    } else {
                        alert("Motion permission denied");
                    }
                })
                .catch(console.error);

        } else {
            window.addEventListener("deviceorientation", handleOrientation);
        }
    }

    function handleOrientation(event) {
        if (event.alpha !== null && compass) {
            const rotate = 360 - event.alpha;
            compass.style.transform = "rotate(" + rotate + "deg)";
        }
    }

    startCompass();
});
