//
//
//
var forms = {
};


var panes = {
    new : function (rootID) {

        if (typeof rootID != "number") {
            return "        <div id=record" + rootID + " me= class='record clearfix' > \
            <img  id=base64thumb me= class='canvasImage thumbnail'> \
            <span id=note                      class='summaryNote truncate' ></span> \
            <span id=date                      class='calendarDate truncate'></span> \
            <span id=epoch                     class='hidden'></span> \
            <span id=image                     class='hidden'></span> \
        </div>";
        } else {
            return null;
        }
    }
};