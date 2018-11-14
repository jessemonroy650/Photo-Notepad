//
//
var app = {
    version     : '1.0.0',
    targetEvent : 'click',
    isLocalStorageAvailable : false,
    isCameraAvailable : false,
    isCordova   : false,

    cameraCallback (imgURL) {
        $('#debug').html(imgURL);
        $('#theImage').attr('src', imgURL);
    },
    //
    hook : function () {
        $('#allButton').on(app.targetEvent, note.all);
        $('#clearButton').on(app.targetEvent, function() { note.clear() });
        $('#exitButton').on(app.targetEvent, function() { navigator.app.exitApp(); });
        $('#keysButton').on(app.targetEvent, note.getKeys);
        $('#saveButton').on(app.targetEvent, note.handleInput);
        $('#summaryButton').on(app.targetEvent, note.summaryOfList);
        $('#cameraButton').on(app.targetEvent, function () {
            if (app.isCameraAvailable == true) {
                $('#debug').html("Getting Camera ... ");
                cameraPlugin.callback = app.cameraCallback;
                // use a short timeout, text does not display
                setTimeout(cameraPlugin.getPicture, 300);
            } else { 
                $('#debug').html("No Camera.");
            }
        });
    },
    //
    onDOMContentLoaded : function () {
        //alert("onDOMContentLoads next");
        //
        FastClick.attach(document.body);
        app.targetEvent                           = 'click';
        app.isCordova                             = (typeof window.cordova !== "undefined");
        app.isLocalStorageAvailable               = localStore.isStorageAvailable('localStorage');
        //
        document.getElementById('appIcon').src    = 'img/bellpepper.png';
        document.getElementById('test').innerHTML = 'app.onDOMContentLoaded';
        document.getElementById('isCordova').innerHTML = app.isCordova;
        document.getElementById('isCordova').style.backgroundColor = '#aaccff'; // blueish color
        document.getElementById('isLocalStorageAvailable').innerHTML = app.isLocalStorageAvailable;
        //
        document.getElementById('version').innerHTML = app.version;
        //
        app.hook();
    },
    //
    onDeviceReady : function () {
        //alert("onDeviceReady next");
        app.targetEvent                           = 'touchend';
        app.isCordova                             = (typeof window.cordova !== "undefined");
        app.isCameraAvailable                     = cameraPlugin.isCameraAvailable();
        //
        document.getElementById('appIcon').src    = 'img/app-icon.png';
        document.getElementById('test').innerHTML = 'app.onDeviceReady';
        document.getElementById('isCordova').innerHTML               = app.isCordova;
        document.getElementById('isCordova').style.backgroundColor   = '#ccffcc'; // greenish color
        document.getElementById('isCameraAvailable').innerHTML       = app.isCameraAvailable;
        //
        document.getElementById('exitButton').classList.toggle("hidden", false);
    }
};
