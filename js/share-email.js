//
//
//
var shareEmail = {
    version : '0.8.6',
    isEmailAvailable : false,
    messageSpan : '',
    emailBlob   : {},

    init : function (messageSpan, blob) {
        shareEmail.messageSpan = messageSpan;
        shareEmail.emailBlob   = blob;
    },
    //
    emailDismissed : function (x) {
        if (shareEmail.messageSpan) {
            document.getElementById(shareEmail.messageSpan).innerHTML = x;
        }
    },
    //
    sendEmail : function (emailBlob) {
        if (shareEmail.isEmailAvailable) {
            emailBlob = (emailBlob) ? emailBlob : shareEmail.emailBlob;
            cordova.plugins.email.open(emailBlob, shareEmail.emailDismissed);
        } else {
            console.log('No email available.');
            if (shareEmail.messageSpan) {
                document.getElementById(shareEmail.messageSpan).innerHTML = 'No email available.';
            }
        }
    }
};
