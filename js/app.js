//
//
var app = {
    version     : '0.9.0',
    release     : true,
    debug       : 4,
    targetEvent : 'click',
    isLocalStorageAvailable : false,
    isCordova               : false,
    isCameraAvailable       : false,
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
    setupEmailShare : function () {
        //
        // Email Share icon - RRR Using `epoch` is a hack.
        $('.shareicon').on(app.targetEvent, function (evt) {
            var imgId ='', theImg = '', theData = {};

            document.getElementById('debug').innerHTML       = '.shareicon';
            document.getElementById('appMessage').innerHTML = 'Getting email app ...';

            console.log('.shareicon ' + JSON.stringify(evt) + " target: " + evt.target.id);
            imgId = evt.target.id.slice(8,);
            //
            // IMAGE ID
            //
            console.log('imgId: ' + imgId);
            theImg = document.getElementById(imgId).src;
            console.log('img: ' + theImg);
            //
            // SETUP EMAIL MESSAGE
            //
            theData = JSON.parse( localStore.get( imgId ) );
            theDate = (new Date( Number(imgId) )).toLocaleString();

            app.emailBlob.subject = app.emailBoilerplate.subject;
            app.emailBlob.body    = app.emailBoilerplate.body + "\nNOTE:" + theData.note + "\nTimestamp:" + theDate;
            app.emailBlob.attachments = [theImg];
            console.log(app.emailBlob.body);
            shareEmail.init('appMessage', app.emailBlob);
            // use a short timeout, otherwise text does not display
            setTimeout(shareEmail.sendEmail, 200);
        });        
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
            $('#appMessage').html("Number of records: " + note.numOfRecords());
        });

        //
        //  Database
        $('#allButton').on(app.targetEvent, note.allSorted);
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
            $('#appMessage').html("Number of records: " + note.numOfRecords());
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
        tabSelector.hook(app.targetEvent, note.allSorted, note.summaryOfList);
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
        tabSelector.hook(app.targetEvent, note.allSorted, note.summaryOfList);
        //
        //  D I S P L A Y  all the images we have so far.
        //
        tabSelector.dispatch(1);

    }
};
