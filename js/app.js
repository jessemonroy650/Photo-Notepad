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
    onDOMContentLoaded : function () {
        //console.log("app.onDOMContentLoaded()");
        document.getElementById('version').innerHTML = app.version;
        document.getElementById('debug').innerHTML   = 'app.onDOMContentLoaded()';
    },
    //
    onDeviceReady : function () {
        // console.log("app.onDeviceReady()");
        // - https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
        app.isCordovaApp = (typeof window.cordova !== "undefined");
        document.getElementById('recordSummary').innerHTML = "Device Ready.";
        document.getElementById('debug').innerHTML  = 'app.onDeviceReady()';
    }

};
