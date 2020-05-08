const {MongoClient,ObjectID} = require('mongodb');

var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("TodoApp");
    dbo.collection('Todos').drop().then((res) => {
        console.log('Sucess');
        db.close();
    },(err) => {
        throw err;
    });
    // db.close();
    
});