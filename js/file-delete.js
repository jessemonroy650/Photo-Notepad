//
// SOURCE: https://ourcodeworld.com/articles/read/28/how-to-delete-file-with-cordova
//
var file = {
    messageSpan : '',
    postFunction : function () {},
    //
    init : function (messageSpan, postFunc) {
        file.messageSpan  = messageSpan;
        if (postFunc) {
            file.postFunction = postFunc;
        }
    },
    //
    delete : function (filename, init) {
        var path       = "file:///storage/emulated/0"; //var filename = "myfile.txt";
        //
        if (init) {
            file.init(init.msgSpan);
        }
        //
        window.resolveLocalFileSystemURL(path, function(dir) {
            dir.getFile(filename, {create:false}, function(fileEntry) {
                fileEntry.remove(function(){
                    // The file has been removed succesfully
                    document.getElementById(file.messageSpan).textContent = 'File deleted.';
                },function(error){
                    // Error deleting the file
                    document.getElementById(file.messageSpan).textContent = 'Error deleting file.';
                },function(){
                    // The file doesn't exist
                    document.getElementById(file.messageSpan).textContent = 'File does not exist.';
                });
            });
        });
    }
};