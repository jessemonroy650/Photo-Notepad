//
//
//
var tabSelector = {
    version : '1.0.0',

    hook : function () {
        document.getElementById('tab1').addEventListener(app.targetEvent, function (evt) {
            console.log(evt.target.id);

            document.getElementById('tab2Data').classList.add('hidden');
            document.getElementById('tab1Data').classList.remove('hidden');
        });
        document.getElementById('tab2').addEventListener(app.targetEvent, function (evt) {
            console.log(evt.target.id);

            document.getElementById('tab1Data').classList.add('hidden');
            document.getElementById('tab2Data').classList.remove('hidden');
        });
    }
}