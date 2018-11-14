//
//
// default configuration
var appConfig = {
    imageSide:'left',
    recordHighlighted: null
};
//
//    T H E   A P P
//
var app = {
    version : '0.8',
    targetEvent    : 'click',
    isCordovaApp       : false,
    isStorageAvailable : false,
    isCameraAvailable  : false,


    //
    //  Initialize our screen, and all libraries we used.
    //
    init : function () {
        console.log("app.init()");
        FastClick.attach(document.body);
        $('#version').text(app.version);
        //
        // check for available storage
        //
        app.isStorageAvailable = localStore.isStorageAvailable('localStorage');
        if (app.isStorageAvailable) {
            $('#imgLocalStore').removeClass('hidden').addClass('expose');
            pnpApp.init({status : 'recordSummary',
                         tmpImage : 'originalImage',
                         tmpCanvas : 'tempCanvas',
                         note : 'noteNote'});
            pnpApp.updateRecordSummary();
        } else {
            $('#imgLocalStore').removeClass('expose').addClass('hidden');
        }
        cameraPlugin.init({'status':'debug'});
    },
    //
    //  "hook" deals with the interactive screen, buttons and the such.
    //  https://developer.mozilla.org/en-US/docs/Web/Events/click#Properties
    //   
    hook : function () {
        console.log("app.hook()");
        //  https://developer.mozilla.org/en-US/docs/Web/API/Storage
		$('#app_icon').click(function(){
            console.log('id:', this.id, " parent: ", this.parentElement.id );
            $('#debug').text('#app_icon');
            if (app.isCameraAvailable == true) {
                $('#recordSummary').html("Getting Camera ... ");
                // use a short timeout, text does not display
                //setTimeout(cameraPlugin.getPicture, 200);
            } else { 
                $('#recordSummary').html("No Camera.");
            }
		});
		//
		$('#menubar').click(function(x){
            console.log('id:', this.id, " parent: ", this.parentElement.id );
            $('#debug').text('#menubar');
		});
        //
		$('#imgCamera').click(function(x){
            console.log('id:', this.id, " parent: ", this.parentElement.id );
            $('#debug').text('#imgCamera');
		});
        //
        //
		$('#imgLocalStore').click(function(x){
            console.log('id:', this.id, " parent: ", this.parentElement.id );
            $('#debug').text('#imgLocalStore');
		});
        //
		$('#saveButton').click(function(x){
            console.log('id:', this.id, " parent: ", this.parentElement.id );
            $('#debug').text('#saveButton');
		});
        //
		$('.thumbnail').click(function(x) {
            $('#debug').text('.thumbnail');
            // console.log('.thumbnail  id:', this.id, JSON.stringify(x), this.parentElement.id );
            //             my_id, attribute `me` = epoch (DB column field), attribute `me` = javascript array index
            console.log("id: ", this.id,
                        " me: ", $('#' + this.id).attr('me'), 
                        " parent: ", $('#' + this.id).parent().attr('me') );
        });

    },
    //
    onDOMContentLoaded : function () {
        console.log("app.onDOMContentLoaded()");
        app.init();    // Initialize all the modules
        app.hook();    // Hook the touch screen (mouse/keyboard)
    },
    //
    onDeviceReady : function () {
        console.log("app.onDeviceReady()");
		$('#status').text("Device Ready.");
        // - https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
        app.isCordovaApp = (typeof window.cordova !== "undefined");
        //
        // check for camera
        //
        app.isCameraAvailable = cameraPlugin.isCameraAvailable();
        // expose or hide the "camera.png" icon 
        if (app.isCameraAvailable) {
            document.getElementById('imgCamera').className = 'expose';
            cameraPlugin.options({'callback': pnpApp.cameraCallback });
        } else {
            document.getElementById('imgCamera').className = 'hidden';
        }
    }

};
