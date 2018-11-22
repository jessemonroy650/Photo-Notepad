//
//
//
var shareSetup = {
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
            app.emailBlob.body    = app.emailBoilerplate.body + "\n\nNOTE: " + theData.note + "\nTimestamp: " + theDate;
            app.emailBlob.attachments = [theImg];
            console.log(app.emailBlob.body);
            shareEmail.init('appMessage', app.emailBlob);
            // use a short timeout, otherwise text does not display
            setTimeout(shareEmail.sendEmail, 200);
        });
        console.log('shareSetup.email()');
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
            console.log('shareSetup.delete: ', theDataStr);
            note.deleteRecord('appMessage', imgId, theImg, postFunc);
        });
        console.log('shareSetup.delete()');
    }
};
