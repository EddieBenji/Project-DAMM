/**
 * Created by lalo on 19/10/15.
 */

function captureImageSuccess(mediaFiles) {
    var smallImage = document.getElementById("principal-img");
    window.localStorage.setItem("photo", mediaFiles[0].fullPath);
    smallImage.src = mediaFiles[0].fullPath;
}

function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Error!');
    document.getElementById('capture-result').
        innerHTML = "<strong>Error</strong>";
}
function captureImage() {

    navigator.device.capture.captureImage(captureImageSuccess, captureError,
        {
            limit: 1
        }
    );
}

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById("principal-img");
    var path_image = decodeURIComponent(imageData);
    if(path_image.indexOf("providers") > -1) {
        path_image = "content://media/external/images/media/"+path_image.split(":")[2];
    }
    window.localStorage.setItem("photo", path_image);
    smallImage.src = imageData;
}
function onFail(message) {
    alert("Fallo al inicializar la camara " + message);
}
function getPhoto(source) {
    navigator.camera.getPicture(onPhotoDataSuccess,
        onFail,
        {
            quality: 50,
            destinationType: destinationType.FILE_URI,
            sourceType: source,
            saveToPhotoAlbum: true
        }
    );

}

//
//function captureImageSuccess2(mediaFiles) {
//    var smallImage = document.getElementById("principal-img");
//    smallImage.src = "data:image/jpeg;base64," + mediaFiles;
//}


//function capturePhoto() {
//    navigator.device.capture.getPicture(captureImageSuccess2, captureError,
//        {limit: 1});
//}

//function formatError(error) {
//    alert("Error getting file format data: " + error.code);
//}
