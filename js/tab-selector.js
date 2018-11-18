//
//
//
var tabSelector = {
    version : '0.8.0',
    fillMethod1 : function() {},
    fillMethod2 : function() {},
    targetEvent : 'touchend',             /* RRR clean up *?
    lastSelected : 0,                     /* 0=NONE SELECTED, default to first tab  */

    hook : function (event, method1, method2) {
        tabSelector.targetEvent = event;
        tabSelector.fillMethod1 = method1;
        tabSelector.fillMethod2 = method2;

        document.getElementById('tab1').addEventListener(tabSelector.targetEvent, function (evt) {
            console.log(evt.target.id);
            tabSelector.lastSelected = 1;

            document.getElementById('tab2Data').classList.add('hidden');
            document.getElementById('tab1Data').classList.remove('hidden');
            tabSelector.fillMethod1();
        });
        document.getElementById('tab2').addEventListener(tabSelector.targetEvent, function (evt) {
            console.log(evt.target.id);
            tabSelector.lastSelected = 2;

            document.getElementById('tab1Data').classList.add('hidden');
            document.getElementById('tab2Data').classList.remove('hidden');
            tabSelector.fillMethod2();
        });
    },
    // RRR should be cleaner
    dispatch : function (requested) {
        tabSelector.lastSelected = (requested) ? requested : 1;

        // RRR DEFINATELY SHOULD NOT USE THIS CHEAT
        $('#tab' + tabSelector.lastSelected).trigger(tabSelector.targetEvent);
    }
}