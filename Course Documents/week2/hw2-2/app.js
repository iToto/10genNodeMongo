var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/m101', function(err, db) {
    if(err) throw err;

    var query   = {};
    var options = {};
    var sort    = {"State":1,"Temperature":-1}
    var cursor  = db.collection('hw2_1').find(query,options).sort();

    cursor.each(function(err, doc) {
        if(err) throw err;

        if (!doc) {
            console.dir("No document found");
            return db.close();
        }

        // TODO: Find Highest Temp for State
        console.dir(doc);

        return db.close();
    });
});
