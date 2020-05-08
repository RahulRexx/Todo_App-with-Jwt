const {MongoClient,ObjectID} = require('mongodb');

var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("TodoApp");
    dbo.collection("Users").find({name : 'Sourav'}).count((err, result) => {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});