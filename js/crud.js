//
//
//
var crud = {
    version : '0.9.0',

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
    // return : undefined
    delete : function (key) {
        return localStore.remove(key);
    },
    //
    //    In databases that are key-based and can use an 'index' also, the returns the key base on the index.
    //
    key : function (i) {
        return localStore.key( i );
    },
    //
    //
    //
    isStorageAvailable : function ()  {
        return localStore.isStorageAvailable('localStorage');
    },
    //
    len : function () {
        return localStore.len();
    },
    // return: undefined
    deleteDB : function () {
        return localStore.clear();
    }

};