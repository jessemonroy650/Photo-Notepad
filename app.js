//
//    Cordova is ready
//
//  NOTE: The initialTimeOut is to wait for the GPS to get a decent reading.
//  NOTE: This need to be in the same scope as the EventListener. 
//      It canNOT go in a seperate file.
var dummyLoader = function() {
		Location.getLocation();
};
//
var app = {
    version : '0.8',
    targetEvent    : 'click',
    isCordovaApp   : 'false',
    isStorageAvailable : false,

    //
    //  Initialize our screen, and all libraries we used.
    //
    init : function () {
        $('#version').text(app.version);
        FastClick.attach(document.body);
        //
        // check for available storage
        //
        app.isStorageAvailable = localStore.isStorageAvailable('localStorage');
        if (app.isStorageAvailable) {
            $('#imgLocalStore').removeClass('hidden').addClass('expose');
        } else {
            $('#imgLocalStore').removeClass('expose').addClass('hidden');
        }
    },
    //
    //  "hook" deals with the interactive screen, buttons and the such.
    //   
    hook : function () {
        //  https://developer.mozilla.org/en-US/docs/Web/API/Storage
		$('#app_icon').click(function(){
		});
		//
		$('#menubar').click(function(){
		});
    },
    //
    onDOMContentLoaded : function () {
        app.init();
        app.hook();

        var x = document.getElementById('originalImage');

        x.addEventListener('load', function () {
            var ratio        = 0.0625;
            var imgQ         = 0.7;
            //var ws_width     = window.screen.width - 10;
            var ws_width     = window.screen.width/4;
            var base64Image  = resizeBase64.image("originalImage",
                                                  "canvasImage",
                                                  {'width': ws_width},
                                                  imgQ);
            if (base64Image) {
                $('#recordSpec').html("length: " + base64Image.img.length + "<br>" +
                                  "width: " + base64Image.width + "/ height: " + base64Image.height + "<br>" +
                                  "ratio: " + base64Image.ratio + "/ Q: " + base64Image.Q);
            }
        });

        x.src = demoRecord[0].image;

        $('#status').html("appConfig.imageSide: " + appConfig.imageSide + "<br>" +
                          "appConfig.numberOfImages: " + appConfig.numberOfImages + "<br>" +
                          "appConfig.recordHighlighted: " + appConfig.recordHighlighted);
        $('#database').html("database # records: " + demoRecord.length + "<br>" +
                            "<b>demoRecord[0].note:</b> " + demoRecord[0].note + "<br>" +
                            "<b>demoRecord[0].date:</b> " + demoRecord[0].date + "<br>" +
                            "<b>demoRecord[0].image:</b> " + demoRecord[0].image + "<br>" +
                            "<b>demoRecord[0].base64thumb:</b> " + demoRecord[0].base64thumb);
    },
    //
    onDeviceReady : function () {
        console.log("app.onDeviceReady()");
		//window.setTimeout(dummyLoader, initialTimeOut);
		$('#status').text("Device Ready.");
        // - https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
        app.isCordovaApp = (typeof window.cordova !== "undefined");
        if (app.isCordovaApp) {
        }
    }

};
