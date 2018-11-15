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
    numOfRecords : function () {
        return localStore.len();
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

        console.log('epoch: ' + epoch);
        $('#debug').text('epoch: ' + epoch);

        // if (theNote.length == 0) return;

        console.log('note: ' + theNote);
        $('#debug').text('note: ' + theNote);
        $('#debug').text('img: ' + theImg);

        $('#noteNote').val('');
        note.create(epoch, {'note':theNote, 'img':theImg });
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
        console.log('summaryOfList(), len: ', len);
        $('#debug').text('summaryOfList(), len: ' + len);

        for ( var i = 0; i < len; ++i ) {
            theList = "<div class='thinBorder truncate textPad'>" + localStore.key( i ) +
                      "<span class='thinBorder truncate textPad'>" + localStore.get(localStore.key(i)) + "</span>" +
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
        console.log('all(), len: ', len);
        $('#debug').text('all(), len: ' + len);

        for ( var i = 0; i < len; ++i ) {
            allNotes = "<div class='thinBorder textPad dbKey'>" + localStore.key( i ) + "</div>" +
                       "<div class='thinBorder textPad'>" + localStore.get(localStore.key(i)) + "</div>" +
                       allNotes;
            console.log(localStore.key( i ),  localStore.get(localStore.key(i)));
        }
        $('#listAll').html(allNotes);
    },
    //
    clear : function () {
        console.log('clear()');
        $('#debug').text('clear()');

        $('#listOfKeys').html('');
        $('#listSummary').html('');
        note.keys = [];
        return localStore.clear();
    }
};
