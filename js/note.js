//
//  Need update() - 2018-11-14
//
var note = {
    version     : '0.8.9',
    keys        : [],
    showForward : true,

    //
    isStorageAvailable : function () {
        return crud.isStorageAvailable();
    },
    //
    _forwardSort : function (a, b) { return a - b },
    _reverseSort : function (a, b) { return b - a },
    _getKeys :  function () {
        var      len = crud.len();
        var sortFunc = (note.showForward) ? note._forwardSort : note._reverseSort;

        console.log('_getKeys(), len: ' + len);
        $('#debug').text('_getKeys(), len: ' + len);

        note.keys = [];
        for ( var i = 0; i < len; ++i ) {
            note.keys.push(crud.key( i ));
        }
        // numerical sort function
        note.keys.sort( function (a, b) { return sortFunc(a, b); } );
    },
    //
    //   Toggle the cameraButton/photoNote interface
    //
    photoNoteInterface : function (mode) {
        // toggle the interface
        if (mode == 'cameraButton') {
            $('#cameraButtonWrapper').removeClass('hidden');
            $('#notesWrapper').addClass('hidden');
            $('#photoWrapper').addClass('hidden');
        } else if (mode == 'photoNote') {
            $('#cameraButtonWrapper').addClass('hidden');
            $('#notesWrapper').removeClass('hidden');
            $('#photoWrapper').removeClass('hidden');
            $('#noteNote').focus();
        }
    },
    //
    handleInput : function (eventContext) {
        var epoch        = Date.now();
        // `key` was an object. Needed to convert to number.
        var calendarDate = (new Date( Number(epoch) )).toLocaleString();
        var theNote      = $('#noteNote').val();
        var theImg       = $('#theImage').attr('src');

        // backfill the "img" field while we debug
        if (app.debug > 4) {
            theImg = (theImg) ? theImg : 'img/icon.png';
        }

        console.log('epoch: ' + epoch);
        //$('#debug').text('epoch: ' + epoch);
        console.log('calendarDate/len: ' + calendarDate + '/' + calendarDate.length);
        //$('#debug').text('calendarDate: ' + calendarDate);
        console.log('note: ' + theNote);
        //$('#debug').text('note: ' + theNote);
        console.log('img: ' + theImg);
        $('#debug').text('img: ' + theImg);

        if ((theImg) && (theNote)) {
            $('#noteNote').val('');
            crud.create(epoch, {'note':theNote, 'calendarDate':calendarDate, 'img':theImg });
        } else {
            // RRR
            alert("no Image or no Note, when saving.");
        }
        //
        //  T O G G L E   the interface
        //
        note.photoNoteInterface('cameraButton');
        //
        //  D I S P L A Y  all the images we have so far.
        //
        note.allSorted();
        note.summaryOfList();
    },
    //
    get : function (id) {
        return crud.read(id);
    },
    //
    //
    // RRR - Not Used at this time
    //
    updateRecord : function () {},
    //
    deleteRecord : function (messageId, key, img, postFunction) {
        response = confirm('Delete record #' + key + ' and ' + img + '?');
        console.log("The response to note.deleteRecord() was '" + response + "'");
        $('#appMessage').text('Delete response was: ' + response);
        if (response == true) {
            file.delete(img, {msgSpan:'appMessage'});
            crud.delete(key);
            $('#appMessage').text("Deleted #" + key);
            postFunction();
        } else {
            $('#appMessage').text("User canceled delete.");
        }
    },
    //
    //
    //
    numOfRecords : function () {
        return crud.len();
    },
    //
    getKeys : function () {
        note._getKeys();
        $('#listOfKeys').html(note.keys.toString());
    },
    //
    summaryOfList : function () {
        var theList = "";
        var theData  = {};

        note.keys.forEach( function( key ) {
            theData = JSON.parse( crud.read( key ) );
            // `key` was an object. Needed to convert to number.
            theDate = (new Date( Number(key) )).toLocaleString();
            //console.log( theDate );

            theList = "<div class='record clearfix'>" +
                          "<img id=" + key +
                               " class=' floatLeft width25percent thumbnail' src=" + theData.img + ">" +
                          "<span class=' truncate summaryNote' >" + theData.note + "</span>" +
                          "<span class=' truncate calendarDate' >" + theDate + "</span>" +
                      "</div>" +
                      theList;
            console.log(key,  crud.read(key));
        })
        console.log('note.summaryOfList()');
        $('#listSummary').html(theList);
    },
    //
    allSorted : function () {
        var allNotes = "";
        var theData  = {};
        var calDate  = "";

        note._getKeys();

        note.keys.forEach( function( key ) {
            theData = JSON.parse( crud.read( key ) );

            // `key` was an object. Needed to convert to number.
            theDate = (new Date( Number(key) )).toLocaleString();
            //console.log( theDate );

            allNotes = "<div class='thickBorderList '>" +
                           "<div class='' >" + 
                               "<img id=imgShare" + key +
                                   " class='thinBorder width24px clearfix shareicon' src=" + 'img/email-icon.png' + ">" +
                               "<img id=imgDelete" + key +
                                   " class='thinBorder width24px clearfix deleteicon' style='margin:0 20%;' src=" + 'img/delete.png' + ">" +
                               "<img id=" + key +
                                   " class='thinBorder width25percent clearfix thumbnail' src=" + theData.img + ">" +
                           "</div>" +
                           "<div class='thinBorder textPad dbKey'>" + theDate + "</div>" +
                           "<div class='thinBorder textPad'>" + theData.note + "</div>" +
                       "</div>" +
                       allNotes;
            console.log(key,  crud.read(key));
        });
        console.log('note.allSorted()');
        $('#listAllSorted').html(allNotes);
    },
    //
    clear : function () {
        console.log('clear()');
        $('#debug').text('clear()');

        // toggle the interface
        $('#listSortedKeys').html('');
        $('#listOfKeys').html('');
        $('#listSummary').html('');
        $('#listAllSorted').html('');

        note.keys = [];
        return crud.deleteDB();
    }
};
