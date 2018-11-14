//
//    
//
var cameraPlugin = {
    version : '0.9.2',
    quality : 50,
    destinationType : {},   // FILE_URI _or_ DATA_URL, // (base64)
    sourceType : {},        //  PHOTOLIBRARY _or_ CAMERA // This is for testing
    mediaType : {},
    encodingType :  {},     // JPEG _or_ PNG is the default
    callback : null,    

    isCameraAvailable :  function () {
        return (typeof navigator.camera  !== "undefined");
    },
    init : function (opt) {
        if (opt) {
            if (opt.quality) {
                cameraPlugin.quality  = opt.quality;
            }
            if (opt.source) {
                cameraPlugin.source   = opt.source;
            }
            if (opt.encoding) {
                cameraPlugin.encoding = opt.encoding;
            }
            if (opt.callback) {
                cameraPlugin.callback = opt.callback;
            }
        }
        if (isCameraAvailable() == true) {
            cameraPlugin.destinationType = Camera.DestinationType.FILE_URI;        // DATA_URL, // (base64)
            cameraPlugin.sourceType      = Camera.PictureSourceType.PHOTOLIBRARY;  //  CAMERA // This is for testing
            cameraPlugin.mediaType       = Camera.MediaType.PICTURE;
            cameraPlugin.encodingType    = Camera.EncodingType.JPEG;               // PNG is the default
        }
    },
    //
    getPicture : function () {
        navigator.camera.getPicture(cameraPlugin.onSuccess, cameraPlugin.onFail, 
            {quality: cameraPlugin.quality, 
             destinationType: cameraPlugin.destinationType,
             sourceType: cameraPlugin.sourceType,
             encodingType: cameraPlugin.encodingType  // Added to be explict, even though this is the `default`
            });
    },
    //
    // When using `data:`, it is required that `data:` be included in the `Content-Security-Policy`
    // NOTE: This method can be overridden in the the main app.
    onSuccess : function (imageData) {
        if (cameraPlugin.callback) {
            cameraPlugin.callback(imageData);
        }
    },
    //
    onFail : function (message) {
        alert('Failed because: ' + message);
    }
};

