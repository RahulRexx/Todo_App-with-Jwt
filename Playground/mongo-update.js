const {MongoClient,ObjectID} = require('mongodb');

var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("TodoApp");
    dbo.collection("Users").findOneAndUpdate({_id : new ObjectID('5eb5b172254baa344cd07f8b')},{$set : {name : "Son"}, $inc : {age : 1} },{returnOriginal : false}).then((res) => {
        console.log(res);
        db.close();
    },(err) => {
        throw err;
    });
    // db.close();
    
});