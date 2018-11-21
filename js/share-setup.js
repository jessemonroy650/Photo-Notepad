//
//
//
var iconSetup = {
    //
    // setupEmailShare
    //
    email : function () {
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
            theData = JSON.parse( note.get( imgId ) );
            theDate = (new Date( Number(imgId) )).toLocaleString();

            app.emailBlob.subject = app.emailBoilerplate.subject;
            app.emailBlob.body    = app.emailBoilerplate.body + "\nNOTE:" + theData.note + "\nTimestamp:" + theDate;
            app.emailBlob.attachments = [theImg];
            console.log(app.emailBlob.body);
            shareEmail.init('appMessage', app.emailBlob);
            // use a short timeout, otherwise text does not display
            setTimeout(shareEmail.sendEmail, 200);
        });
        console.log('iconSetup.email()');
    },
    //
    // setup item delete
    //
    delete : function (postFunc) {
        //
        // Email Share icon - RRR Using `epoch` is a hack.
        $('.deleteicon').on(app.targetEvent, function (evt) {
            var imgId ='', theImg = '', theDataStr ='', theData = {}, response = false;

            document.getElementById('debug').innerHTML       = '.deleteicon';
            document.getElementById('appMessage').innerHTML = 'Setting up delete ...';

            console.log('.deleteicon ' + JSON.stringify(evt) + " target: " + evt.target.id);
            imgId = evt.target.id.slice(9,);
            //
            // IMAGE ID
            //
            console.log('imgId: ' + imgId);
            theImg = document.getElementById(imgId).src;
            console.log('img: ' + theImg);
            //
            // SETUP Delete
            //
            theDataStr = note.get( imgId );
            theData    = JSON.parse( theDataStr );
            theDate    = (new Date( Number(imgId) )).toLocaleString();
            console.log('iconSetup.delete: ', theDataStr);
            response   = note.deleteRecord('appMessage', imgId);
            // This function does clean up the caller has asked for - after the record has been deleted.
            if (response == true) {
                console.log('calling postFunc()');
                postFunc();
            }
        });
        console.log('iconSetup.delete()');
    }
};
