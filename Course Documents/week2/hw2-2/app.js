var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var sort    = [["State",1],["Temperature",-1]];
    var query   = {};
    var options = {
        // 'limit' : 4,
        'sort'  : sort
    };

    var weather = db.collection('hw2_1');
    var cursor  = weather.find(query,{},options);

    var currentState = "";

    cursor.each(function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.dir("No document found");
            return db.close();
        } else if(doc == null) {
            console.dir("Null document found");
            return db.close();
        }

        // Are we at a new state?
        if (currentState != doc.State) {
            currentState = doc.State;
            console.dir(doc);

            // update this document with "month_high" : true
            query['_id']      = doc['_id'];
            doc["month_high"] = true;
            // db.collections('hw2_1').update();
        }
    });
    // return db.close();
});
