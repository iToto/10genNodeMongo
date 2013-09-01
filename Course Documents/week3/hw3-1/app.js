var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var sort       = [];
    var query      = {};
    var projection = {"_id":true,"scores":true};
    var options    = {
        // 'limit' : 4,
        'sort'  : sort
    };

    var students = db.collection('students');
    var cursor  = students.find(query,projection,options);

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

        var scores = doc.scores;
        console.dir(scores);
        // Find Lowest Homework Score
        var lowestHomeworkIndex = -1;
        var lowestHomeworkValue = 999;
        for (var i = 0; i < scores.length; i++) {
            if (scores[i].type == "homework" &&
                scores[i].score < lowestHomeworkValue
            ) {
                lowestHomeworkValue = scores[i].score;
                lowestHomeworkIndex = i;
            }
        }
        console.log("Lowest Homework"+lowestHomeworkValue);
        console.log("At Index:"+lowestHomeworkIndex);

        // Remove lowest homework
        removed = scores.splice(lowestHomeworkIndex,1);
        // console.dir(scores);

        // update document with new array
        query['_id']  = doc['_id'];
        doc["scores"] = scores;
        students.update(query,doc,function(err,updated){
            if (err) throw err;

            console.dir('Student ID '+doc['_id']+' updated!');
            console.dir(doc);

        });
    });
    // return db.close();
});
