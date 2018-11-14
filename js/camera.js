//
//    
//
var cameraPlugin = {
    version : '0.9.2',
    quality : 50,
    sourceType : '',        /* Camera.PictureSourceType.CAMERA,   // PHOTOLIBRARY // This is for testing */
    encodingType : '',      /* Camera.EncodingType.JPEG,          // PNG is the default */
    destinationType : '',   /* Camera.DestinationType.FILE_URI,   // DATA_URL     // (base64)  */
    mediaType : '',         /* Camera.MediaType.PICTURE, */
    /* Ids of workspace */
    statusSpan  : '',
    /* the method we send the picture to */
    callback : null,    

    isCameraAvailable :  function () {
        return (typeof navigator.camera  !== "undefined");
    },
    init : function (opt) {
        console.log("cameraPlugin.init()");

        //
        if (opt.status) {
            cameraPlugin.statusSpan = opt.status;
            document.getElementById(cameraPlugin.statusSpan).textContent = 'cameraPlugin.init() called.'
        }
    },
    options : function (opt) {
        if (cameraPlugin.statusSpan) {
            document.getElementById(cameraPlugin.statusSpan).textContent = 'cameraPlugin.options() called.'
        }
        if (opt) {
            if (opt.quality) {
                cameraPlugin.quality  = opt.quality;
            }
            //
            if (opt.source) {
                cameraPlugin.sourceType   = opt.source;
            }
            //
            if (opt.encoding) {
                cameraPlugin.encoding     = opt.encoding;
            }
            //
            if (opt.callback) {
                cameraPlugin.callback     = opt.callback;
            }
        }
        //
        cameraPlugin.sourceType      = Camera.PictureSourceType.CAMERA;
        cameraPlugin.encodingType    = Camera.EncodingType.JPEG;
        cameraPlugin.destinationType = Camera.DestinationType.FILE_URI;
        cameraPlugin.mediaType       = Camera.MediaType.PICTURE;
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
        alert('Camera failed because: ' + message);
    }
};

