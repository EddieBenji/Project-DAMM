/**
 * Created by lalo on 19/10/15.
 */

function captureImageSuccess1(mediaFiles) {
    var smallImage = document.getElementById("principal-img");
    smallImage.src = mediaFiles[0].fullPath;
}

function captureImageSuccess2(mediaFiles) {
    var smallImage = document.getElementById("principal-img");
    smallImage.src = "data:image/jpeg;base64," + mediaFiles;
}

function captureImage() {

    navigator.device.capture.captureImage(captureImageSuccess1, captureError,
        {limit: 1});
}

function capturePhoto() {
    navigator.device.capture.getPicture(captureImageSuccess2, captureError,
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

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById("principal-img");
    //smallImage.style.display = 'block';
    //smallImage.src = "data:image/jpeg;base63," + imageData;
    smallImage.src = imageData;
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