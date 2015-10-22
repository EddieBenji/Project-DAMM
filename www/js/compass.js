/**
 * Created by lalo on 19/10/15.
 */
var gWatchID = null;
var pictureSource;
var destinationType;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

    //iniciamos variables de cámara
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;

    //Mostramos la última imagen que se puso, si es que hay alguna:
    if (window.localStorage.getItem("photo"))
        document.getElementById("principal-img").src = localStorage.getItem("photo");

    //Iniciamos la brújula:
    startWatch();
}

function startWatch() {
    var options = {frequency: 100};
    if (!gWatchID)
        gWatchID = navigator.compass.watchHeading(onSuccess, onError, options);

}
function stopWatch() {
    if (gWatchID) {
        navigator.compass.clearWatch(gWatchID);
        gWatchID = null;
    }
}


function onSuccess(heading) {
    var element = document.getElementById('heading');

    if (heading.magneticHeading == 0) {
        element.innerHTML = '<h1>' + Math.round(heading.magneticHeading) + '° N</h1>';
    }
    if (heading.magneticHeading == 90) {
        element.innerHTML = '<h1>' + Math.round(heading.magneticHeading) + '° E</h1>';
    }
    if (heading.magneticHeading == 180) {
        element.innerHTML = '<h1>' + Math.round(heading.magneticHeading) + '° S</h1>';
    }
    if (heading.magneticHeading == 270) {
        element.innerHTML = '<h1>' + Math.round(heading.magneticHeading) + '° O</h1>';
    }

    if (heading.magneticHeading > 0 && heading.magneticHeading < 90) {
        element.innerHTML = '<h1 class="NE"> ' + Math.round(heading.magneticHeading) + '° NE</h1>';
    }

    if (heading.magneticHeading > 90 && heading.magneticHeading < 180) {
        element.innerHTML = '<h1 class="SE">' + Math.round(heading.magneticHeading) + '° SE</h1>';
    }
    if (heading.magneticHeading > 180 && heading.magneticHeading < 270) {
        element.innerHTML = '<h1 class="SO">' + Math.round(heading.magneticHeading) + '° SO</h1>';
    }
    if (heading.magneticHeading > 270 && heading.magneticHeading < 360) {
        element.innerHTML = '<h1 class="NO">' + Math.round(heading.magneticHeading) + '° NO</h1>';
    }
    var value = (heading.magneticHeading) * -1;


    document.getElementById("compass-img").style.transform = "rotate(" + value + "deg)";
}
function onError(compassError) {
    alert('Compass error: ' + compassError.code);
}