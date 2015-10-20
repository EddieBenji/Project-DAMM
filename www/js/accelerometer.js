/**
 * Created by lalo on 14/10/15.
 */

//function onLoad() {
//    document.addEventListener("deviceready", onDeviceReady, false);
//}
//function onDeviceReady() {
//    startWatch();
//}


var watchID = null, data;

function startAccelerometer() {
    var options = {
        frequency: 500
    };
    data = document.getElementById("data");
    data.style.display = "block";

    watchID = navigator.accelerometer.watchAcceleration(onSuccessAccelerometer, onErrorAccelerometer, options);
}

var previousPosition_y = 0,
    currentPosition_y = 0,
    previousPosition_x = 0,
    currentPosition_x = 0,
    differential = 1.2,
    threshold = 1.5; // 1.5 funciona más o menos.

var has_moved_on_x = false,
    has_moved_on_y = false;

var steps = 0, elements;

function onSuccessAccelerometer(acceleration) {
    elements = document.getElementById('accelerometer');

    currentPosition_y = acceleration.y;
    currentPosition_x = acceleration.x;

    if (currentPosition_x != (previousPosition_x + differential) ||
        currentPosition_x != (previousPosition_x - differential))
        has_moved_on_x = true;

    if (has_moved_on_x)
        if (currentPosition_y != previousPosition_y + differential ||
            currentPosition_y != previousPosition_y - differential)
            has_moved_on_y = true;


    if (has_moved_on_x && has_moved_on_y &&
        Math.abs(currentPosition_x - previousPosition_x) > threshold &&
        Math.abs(currentPosition_y - previousPosition_y) > threshold) {
        steps++;
        elements.innerHTML = steps;

        has_moved_on_x = false;
        has_moved_on_y = false;
    }
    previousPosition_x = currentPosition_x;
    previousPosition_y = currentPosition_y;

    //operation = Math.pow(acceleration.x, 2) + Math.pow(acceleration.y, 2) +
    //Math.pow(acceleration.z, 2);
    // var length = operation / Math.pow(9.80665, 2);//Math.sqrt(operation);

}


function onErrorAccelerometer() {
    alert('¡Error!');
}

function stopWatchAccelerometer() {
    if (watchID != null) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;

        reset_variables_and_fields();
    }
}

function reset_variables_and_fields() {


    data.style.display = "none";
    elements.innerHTML = " ";
    alert("Se contaron:  " + steps + " pasos");

    has_moved_on_x = false;
    has_moved_on_y = false;

    previousPosition_x = 0;
    previousPosition_y = 0;

    currentPosition_x = 0;
    currentPosition_y = 0;

    steps = 0;
}

