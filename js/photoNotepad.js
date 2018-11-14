//
// Photo Notepad
//	Date: 2018-11-01
//
var pnpApp = {
    version : 0.4,
    /* Ids of workspace */
    statusSpan  : '',
    originalImage : '',
    tempCanvas  : '',
    note        : '',
    /* storage for this object */
    base64Image : {},
    lastRecord  : {},

    init : function (initObj) {
        console.log("pnpApp.init()");

        if (initObj) {
            this.statusSpan    = initObj.status;
            this.originalImage = initObj.tmpImage;
            this.tempCanvas    = initObj.tmpCanvas;
            this.note          = initObj.note;
        }
    },
    //
    cameraCallback (imageURL) {
        var image = $('#' + pnpApp.originalImage);
        image.attr('src', imageURL);
        $('#' + pnpApp.statusSpan).text("Got Image.");

        // get epoch  -  milliseconds since midnight Jan 1, 1970
        // RRR
        var epoch        = Date.now();
        var calendarDate = (Date(epoch)).toLocaleString();

        // create base64 thumbnail w/parms
        var ratio        = 0.0625;                    // alternative resizing method
        var imgQ         = 0.7;                       // JPEG 'Q' factor
        var ws_width     = window.screen.width/4;
        pnpApp.base64Image  = resizeBase64.image(pnpApp.originalImage,
                                                 pnpApp.tempCanvas,
                                                 {'width': ws_width},
                                                 imgQ);
        // RETURNS
        // {'img': , 'ratio': , 'height': ,'width': , 'Q': };
        // img    - the new base64 Image
        // ratio  - image reduction ratio used _or_ multipler used to get new image size
        // height - new height
        // width  - new width
        // 'Q'    - the 'Q' used with the JPG (for debugging)

        // create localStorage record
        pnpApp.lastRecord = {};                   // clear out the assocative array
        pnpApp.lastRecord.date  = calendarDate;   // Human readable
        pnpApp.lastRecord.epoch = epoch;          // for indexing 
        pnpApp.lastRecord.image = imageURL;       // THE IMAGE
        // RRR
        pnpApp.lastRecord.note  = "";             // RRR
        // Thumbnail
        pnpApp.lastRecord.base64thumbnail = {} ;
        pnpApp.lastRecord.base64thumbnail.height = pnpApp.base64Image.height;  // height
        pnpApp.lastRecord.base64thumbnail.width  = pnpApp.base64Image.width;   // width
        pnpApp.lastRecord.base64thumbnail.img    = pnpApp.base64Image.img;     // thumbnail

        //
        // update display
        pnpApp.record2Screen(pnpApp.lastRecord, pnpApp.lastRecord.base64thumbnail);

        // SHOW THE NOTES FORM
        console.log("cameraCallback done");
    },
    //
    saveRecord : function () {
        // get user note
        pnpApp.lastRecord.note  = $('#noteNote').val();

        // save record
        localStore.put(JSON.stringify(pnpApp.lastRecord.epoch), JSON.stringify(pnpApp.lastRecord));

        // clean up the display
    },
    //
    record2Screen : function (record, img) {
        if (record) {
            // record to the screen
            $('#note'  + record.epoch).text(record.note);
            $('#date'  + record.epoch).text(record.date);
            // hidden fields
            $('#epoch' + record.epoch).text(record.epoch);
            $('#image' + record.epoch).text(record.image);  // This is the original image
        }
        // This is the base64 (string) image
        if (img) {
            // image to screen and size it
            $('#base64thumb' + record.epoch).attr("height", img.height);
            $('#base64thumb' + record.epoch).attr("width", img.width);
            $('#base64thumb' + record.epoch).attr("src", record.image); // img.img); 
        }
    },
    //
    updateRecordSummary : function () {
        $('#' + pnpApp.statusSpan).html("Num of Photo Notes: " + localStore.len() );  
    }

};