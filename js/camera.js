//
//    
//
var cameraPlugin = {
    version : '0.9.3',
    cameraOptions : {
        quality : 50,
        destinationType : {},   /* FILE_URI _or_ DATA_URL, // (base64) */
        sourceType : {},        /*  PHOTOLIBRARY _or_ CAMERA // This is for testing */
        mediaType : {},
        encodingType : {}       /* JPEG _or_ PNG is the default */
    },
    callback : null,    

    isCameraAvailable :  function () {
        return (typeof navigator.camera  !== "undefined");
    },
    //
    init : function (opt) {
        if (cameraPlugin.isCameraAvailable() == true) {
            cameraPlugin.cameraOptions.destinationType = Camera.DestinationType.FILE_URI;       // DATA_URL, // (base64)
            cameraPlugin.cameraOptions.sourceType      = Camera.PictureSourceType.PHOTOLIBRARY; //  CAMERA // This is for testing
            cameraPlugin.cameraOptions.mediaType       = Camera.MediaType.PICTURE;
            cameraPlugin.cameraOptions.encodingType    = Camera.EncodingType.JPEG;              // PNG is the default
        }
        if (opt) {
            if (opt.quality) {
                cameraPlugin.cameraOptions.quality      = opt.quality;
            }
            if (opt.source) {
                cameraPlugin.cameraOptions.sourceType   = opt.source;
            }
            if (opt.encoding) {
                cameraPlugin.cameraOptions.encodingType = opt.encoding;
            }
            if (opt.callback) {
                cameraPlugin.cameraOptions.callback     = opt.callback;
            }
            if (opt.saveToPhotoAlbum) {
                cameraPlugin.cameraOptions.saveToPhotoAlbum = opt.saveToPhotoAlbum;
            }
        }
    },
    //
    getPicture : function (callback) {
        var theCallback = cameraPlugin.onSuccess;
        if (callback) { theCallback = callback; }
        //
        navigator.camera.getPicture(theCallback, cameraPlugin.onFail, 
             {quality: 50, 
              destinationType: Camera.DestinationType.FILE_URI,
              encodingType: Camera.EncodingType.JPEG,
              saveToPhotoAlbum: true}
             );
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
        alert('cameraPlugin Failed because: ' + message);
    }
};

