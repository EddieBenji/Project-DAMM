/**
 * Created by lalo on 19/10/15.
 */
var gWatchID = null;
var pictureSource;
var destinationType;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    startWatch();

}

function startWatch() {
    stopWatch();
    var options = {frequency: 1};
    if (!gWatchID)
        gWatchID = navigator.compass.watchHeading(onSuccess, onError, options);

}
function stopWatch() {
    if (gWatchID) {
        navigator.compass.clearWatch(watchID);
        gWatchID = null;
    }
}
function onSuccess(heading) {
    var element = document.getElementById('heading');

    if (heading.magneticHeading == 0) {
        element.innerHTML = '<h1>Heading: ' + heading.magneticHeading + ' N</h1>';
    }
    if (heading.magneticHeading == 90) {
        element.innerHTML = '<h1>Heading: ' + heading.magneticHeading + ' E</h1>';
    }
    if (heading.magneticHeading == 180) {
        element.innerHTML = '<h1>Heading: ' + heading.magneticHeading + ' S</h1>';
    }
    if (heading.magneticHeading == 270) {
        element.innerHTML = '<h1>Heading: ' + heading.magneticHeading + ' O</h1>';
    }

    if (heading.magneticHeading > 0 && heading.magneticHeading < 90) {
        element.innerHTML = '<h1 class="NE">Heading: ' + heading.magneticHeading + ' NE</h1>';
    }

    if (heading.magneticHeading > 90 && heading.magneticHeading < 180) {
        element.innerHTML = '<h1 class="SE">Heading: ' + heading.magneticHeading + ' SE</h1>';
    }
    if (heading.magneticHeading > 180 && heading.magneticHeading < 270) {
        element.innerHTML = '<h1 class="SO">Heading: ' + heading.magneticHeading + 'SO</h1>';
    }
    if (heading.magneticHeading > 270 && heading.magneticHeading < 360) {
        element.innerHTML = '<h1 class="NO">Heading: ' + heading.magneticHeading + 'NO</h1>';
    }
    var value = heading.magneticHeading * -1;
    var logo = document.getElementById("img-compass");
    logo.style.transform = "rotate(" + value + "deg)";
}
function onError(compassError) {
    alert('Compass error: ' + compassError.code);
}