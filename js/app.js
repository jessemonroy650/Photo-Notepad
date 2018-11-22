//
//
var app = {
    version     : '0.9.3',
    release     : true,
    debug       : 4,
    targetEvent : 'click',
    isStorageAvailable : false,
    isCordova          : false,
    isCameraAvailable  : false,
    //
    emailBoilerplate : {subject: 'PhotoNotepad Image and Note',
                        body:    'The image is in the attachment.\n\n',
                       },
    emailBlob   : {to:      'jesse650@gmail.com',
                   subject: 'Test of HTML email & files (img+text)',
                   body:    'The images are in the attachments.',
                   isHtml:  true,
                   attachments: [
                       'file://img/apple.png'
                   ]
                  },


    cameraCallback (imgURL) {
        $('#debug').html(imgURL);
        $('#theImage').attr('src', imgURL);
        //
        // toggle the interface
        //
        note.photoNoteInterface('photoNote');
    },
    //
    handleTab1 : function () {
        note.allSorted()
        //
        shareSetup.email();
        // This handles the deletion of records & reset the interface after the record is deleted.
        shareSetup.delete(app.handleTab1);
    },
    //
    handleTab2 : function () {
        note.summaryOfList()
        // At this point there is no icons for email or delete in the summaryList
        //shareSetup.email();
        //shareSetup.delete(app.handleTab2);
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
            $('#appMessage').html("Number of notes: " + note.numOfRecords());
        });

        //
        //  Database
        $('#allButton').on(app.targetEvent, function () { 
            console.log('#allButton');
            note.allSorted();
            // setup email hotspots
            //app.setupEmailShare();
            shareSetup.email();

        });

        $('#summaryButton').on(app.targetEvent,  function () {
            console.log('#summaryButton');
            note.summaryOfList();
            // setup email hotspots
            //app.setupEmailShare();
            shareSetup.email();
        });

        // save the new `Photo Note`
        $('#saveButton').on(app.targetEvent, function() {
            note.handleInput();
            $('#appMessage').html("Number of notes: " + note.numOfRecords());
        });
        // clear the database
        $('#clearButton').on(app.targetEvent, function() { note.clear() });
        // get the database keys
        $('#keysButton').on(app.targetEvent, note.getKeys);


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
                app.cameraCallback('img/apple.png');
            }
        });
        //
        // EMail
        $('#emailButton').on(app.targetEvent, function () {

            console.log('#emailButton');
            document.getElementById('debug').innerHTML       = '#shareButton';
            document.getElementById('appMessage').innerHTML = 'Getting email app ...';
            // use a short timeout, otherwise text does not display
            setTimeout(shareEmail.sendEmail, 200);

        });
    },
    //
    onConfig : function () {
        var x = window.location.pathname.lastIndexOf('/');
        var s = window.location.pathname.slice(x+1);
        var a = s.search(/config|help/)
        console.log(window.location);
        $('#message').text(x + ' - str:' + s + ' - answer:' + (a != -1));
        //
        configValidate.fillFormFields();
        //
        $('#saveConfig').on(app.targetEvent, configValidate.onSave);
    },
    //
    onConfigDevRdy : function () {
        console.log(window.location);
        $('#message').text(window.location);
    },
    //
    onDOMContentLoaded : function () {
        //alert("onDOMContentLoads next");
        //
        FastClick.attach(document.body);
        app.targetEvent                           = 'click';
        app.isCordova                             = (typeof window.cordova !== "undefined");
        app.isStorageAvailable                    = note.isStorageAvailable();
        //
        document.getElementById('appIcon').src    = 'img/bellpepper.png';
        document.getElementById('test').innerHTML = 'app.onDOMContentLoaded';
        document.getElementById('isCordova').innerHTML = app.isCordova;
        document.getElementById('isCordova').style.backgroundColor   = '#aaccff'; // blueish color
        document.getElementById('version').innerHTML = app.version;
        //
        document.getElementById('isStorageAvailable').innerHTML = app.isStorageAvailable;
        if (app.isStorageAvailable) {
            document.getElementById('imgLocalStore').classList.remove('hidden');
            $('#appMessage').html("Number of notes: " + note.numOfRecords());
        } else {
            document.getElementById('imgLocalStore').classList.add('hidden');
        }
        //
        note.photoNoteInterface('cameraButton');
        //
        if (app.release == true) {
            document.getElementById('debug').classList.add('hidden');
            document.getElementById('debug2').classList.add('hidden');
        }
        //
        app.hook();
        tabSelector.hook(app.targetEvent,  app.handleTab1, app.handleTab2);
        //
        //  D I S P L A Y  all the images we have so far.
        //
        tabSelector.dispatch(1);
        shareEmail.init('appMessage', app.emailBlob);
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
        } else {
            document.getElementById('imgCamera').classList.add('hidden');
        }
        //
        cordova.plugins.email.isAvailable(function (isAvailable) {
            document.getElementById('mailPlugin').innerHTML = shareEmail.isEmailAvailable = isAvailable;
        });
        // DECIDED NOT TO HAVE AN EXIT BUTTON
        // document.getElementById('exitButton').classList.remove("hidden");

        //
        tabSelector.hook(app.targetEvent, app.handleTab1, app.handleTab2);
        //
        //  D I S P L A Y  all the images we have so far.
        //
        tabSelector.dispatch(1);
    }
};
