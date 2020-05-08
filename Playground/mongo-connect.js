const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/", {useUnifiedTopology: true}, (err, client) => {
    if(err)
    {
         throw err;
    }
        console.log('Successfully connected to the DB'); 
        var db = client.db('TodoApp');
        const myobj = {
            name : 'Rishu', 
            age : 21,
            location : 'Dhanbad'
        };
        db.collection('Users').insertOne(myobj,(err,result) => {
        if(err)
        {
            throw err;
        }
            console.log(result.ops[0]._id.getTimestamp());  
            client.close(); // it should be closed here only other wise it will throw an error
    });
    
   
});


