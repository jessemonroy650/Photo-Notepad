//
//  Need update() - 2018-11-14
//
var note = {
    version : '0.8.0',
    keys    : [],

    //
    //      C  R  U  D
    //
    create : function (key, text) {
        localStore.put(key, JSON.stringify(text));
    },
    //
    read : function (key) {
        return localStore.get(key);
    },
    //
    update :  function (id, key, value) {
        var obj = {};
        obj.id    = id;
        obj.key   = key;
        obj.value = value;
        return localStore.update(obj);
    },
    //
    delete : function (key) {
        localStore.remove(key);
    },
    //
    //
    //
    numOfRecords : function () {
        return localStore.len();
    },
    //
    //
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
        }
    },
    //
    //
    // RRR - Not Used at this time
    updateRecord : function () {},
    //
    handleInput : function (eventContext) {
        var epoch   = Date.now();
        var theNote = $('#noteNote').val();
        var theImg  = $('#theImage').attr('src');

        // backfill the "img" field while we debug
        if (app.debug > 4) {
            theImg = (theImg) ? theImg : 'img/icon.png';
        }

        console.log('epoch: ' + epoch);
        $('#debug').text('epoch: ' + epoch);

        console.log('note: ' + theNote);
        $('#debug').text('note: ' + theNote);
        $('#debug').text('img: ' + theImg);

        if ((theImg) && (theNote)) {
            $('#noteNote').val('');
            note.create(epoch, {'note':theNote, 'img':theImg });
        } else {
            // RRR
            alert("no Image or no Note, when saving.");
        }
        //
        // toggle the interface
        //
        note.photoNoteInterface('cameraButton');
    },
    //
    getKeys : function () {
        var     len = localStore.len();
        var theList = "";

        console.log('getKeys(), len: ' + len);
        $('#debug').text('getKeys(), len: ' + len);

        note.keys = [];
        for ( var i = 0; i < len; ++i ) {
            note.keys.push(localStore.key( i ));
        }
        $('#listOfKeys').html(note.keys.toString());
    },
    //
    summaryOfList : function () {
        var     len = localStore.len()
        var theList = "";
        var theData  = {};

        console.log('summaryOfList(), len: ', len);
        $('#debug').text('summaryOfList(), len: ' + len);

        for ( var i = 0; i < len; ++i ) {
            theData  = JSON.parse( localStore.get( localStore.key(i) ) );
            theList = "<div class='thickBorder width100percent'>" +
                          "<div class='' >" + 
                              "<img id=" + localStore.key( i ) +
                                   " class='thinBorder width25percent clearfix thumbnail' src=" + theData.img + ">" +
                          "</div>" +
                          "<div class='thinBorder truncate textPad'>" + localStore.key( i ) +
                              "<span class='thinBorder truncate textPad'>" + theData.note + "</span>" +
                          "</div>" +
                      "</div>" +
                      theList;
            console.log(localStore.key( i ),  localStore.get(localStore.key(i)));
        }
        $('#listSummary').html(theList);
    },
    //
    //
    //
    all : function () {
        var     len = localStore.len()
        var allNotes = "";
        var theData  = {};

        console.log('all(), len: ', len);
        $('#debug').text('all(), len: ' + len);

        for ( var i = 0; i < len; ++i ) {
            theData  = JSON.parse( localStore.get( localStore.key(i) ) );
            allNotes = "<div class='thickBorder width100percent'>" +
                           "<div class='' >" + 
                               "<img id=" + localStore.key( i ) +
                                   " class='thinBorder width25percent clearfix thumbnail' src=" + theData.img + ">" +
                           "</div>" +
                           "<div class='thinBorder textPad dbKey'>" + localStore.key( i ) + "</div>" +
                           "<div class='thinBorder textPad'>" + theData.note + "</div>" +
                       "</div>" +
                       allNotes;
            console.log(localStore.key( i ),  localStore.get(localStore.key(i)));
        }
        $('#listAll').html(allNotes);
    },
    //
    clear : function () {
        console.log('clear()');
        $('#debug').text('clear()');

        // toggle the interface
        $('#listOfKeys').html('');
        $('#listSummary').html('');
        $('#listAll').html('');

        note.keys = [];
        return localStore.clear();
    }
};
