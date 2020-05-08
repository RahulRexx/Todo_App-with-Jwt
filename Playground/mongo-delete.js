const {MongoClient,ObjectID} = require('mongodb');

var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("TodoApp");
    // dbo.collection("Users").deleteOne({name : 'Rahul'},(err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });


    //  dbo.collection("Users").deleteMany({name : 'Sourav'},(err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });

    //  dbo.collection("Users").findOneAndDelete({name : 'Rishu'},(err, result) => {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
     dbo.collection("Users").findOneAndDelete({name : 'Sourav'}).then((result) => {
        console.log(result);
        db.close();
    },(err) => {
        throw err;
        // console.log(err)
    });
});