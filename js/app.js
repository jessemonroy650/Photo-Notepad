//
//
var app = {
    version     : '1.0.0',
    release     : false,
    debug       : 5,
    targetEvent : 'click',
    isLocalStorageAvailable : false,
    isCordova               : false,
    isCameraAvailable       : false,

    cameraCallback (imgURL) {
        $('#debug').html(imgURL);
        $('#theImage').attr('src', imgURL);
        //
        // toggle the interface
        //
        note.photoNoteInterface('photoNote');
    },
    //
    hook : function () {
        //
        //  System
        $('#appIcon').on(app.targetEvent, function() { $('#debug').html("appIcon"); });
        $('#exitButton').on(app.targetEvent, function() { navigator.app.exitApp(); });
        $('#menubar').on(app.targetEvent, function() { $('#debug').html("menubar");  });

        $('#imgCamera').on(app.targetEvent, function() { $('#debug').html("imgCamera");  });
        $('#imgLocalStore').on(app.targetEvent, function() {
            $('#debug').html("imgLocalStore");
            $('#recordSummary').html("Number of records: " + note.numOfRecords());
        });

        //
        //  Database
        $('#allButton').on(app.targetEvent, note.all);
        $('#clearButton').on(app.targetEvent, function() { note.clear() });
        $('#keysButton').on(app.targetEvent, note.getKeys);
        $('#saveButton').on(app.targetEvent, note.handleInput);
        $('#summaryButton').on(app.targetEvent, note.summaryOfList);

        //
        // Camera
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
        document.getElementById('isCordova').style.backgroundColor   = '#aaccff'; // blueish color
        document.getElementById('version').innerHTML = app.version;
        //
        document.getElementById('isLocalStorageAvailable').innerHTML = app.isLocalStorageAvailable;
        if (app.isLocalStorageAvailable) {
            document.getElementById('imgLocalStore').classList.remove('hidden');
        } else {
            document.getElementById('imgLocalStore').classList.add('hidden');
        }
        //
        if (app.release == true) {
            document.getElementById('debug').classList.add('hidden');
            document.getElementById('debug2').classList.add('hidden');
        }
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
        //
        document.getElementById('isCameraAvailable').innerHTML       = app.isCameraAvailable;
        if (app.isCameraAvailable) {
            document.getElementById('imgCamera').classList.remove('hidden');
            note.photoNoteInterface('cameraButton');
        } else {
            document.getElementById('imgCamera').classList.add('hidden');
        }
        //
        document.getElementById('exitButton').classList.toggle("hidden", false);
    }
};
