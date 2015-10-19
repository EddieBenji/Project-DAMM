/**
 * Created by lalo on 19/10/15.
 */


function captureImageSuccess(mediaFiles) {
    // var i, len;
    // var formatSuccess = function (mediaFile) {
    //     document.getElementById('format-data').innerHTML =
    //             "Height: <strong>" + mediaFile.height + "</strong><br/>" +
    //             "Width: <strong>" + mediaFile.width + "</strong><br/>";
    // };
    // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
    //     document.getElementById('capture-result').innerHTML = "<strong>" + (i + 1) + "file(s) </strong>";
    //    mediaFiles[i].getFormatData(formatSuccess, formatError);
    // }
}

function captureImage() {
    //document.getElementById('format-data').innerHTML = "";
    //document.getElementById('capture-result').innerHTML = "";
    navigator.device.capture.captureImage(captureImageSuccess, captureError,
        {limit: 1});
}

function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Error!');
    document.getElementById('capture-result').innerHTML =
        "<strong>Error</strong>";
}
function formatError(error) {
    alert("Error getting file format data: " + error.code);
}

var pictureSource;
var destinarionType;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById("img0");
    smallImage.style.display = 'block';
    smallImage.src = "data:image/jpeg;base63," + imageData;
}
function onFail(message) {
    alert("Fallo al inicializar la camara " + message);
}
function getPhoto(source) {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });

}