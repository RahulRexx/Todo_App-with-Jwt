require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const lodash = require('lodash');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/users.js');
const {authenticate} =  require('./middleware/authenticate.js');

var app = express();

app.use(bodyParser.json());

// Todos
app.post('/todos',authenticate,(req,res) => {
    console.log('Hitted');
    // res.send(res.body);
    var val = new Todo({
        text : req.body.text,
        _creator : req.user._id
    });

    val.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos',authenticate,(req,res) => {
   Todo.find({_creator : req.user._id}).then( (doc) => 
   {
       res.send(doc);
   },(err) => {
    res.send(err);
   });
});

app.get('/todos/:id',authenticate,(req,res) => {
    var id =req.params.id;
    if(!ObjectID.isValid(id))
    {
        res.status(404).send("Error in id");
    }
    Todo.findOne({
        _creator : req.user._id,
        _id : id
    }).then( (todo) => {
        if(!todo)
        {
             res.status(404).send("In error");
        }
       res.send({todo});
    }).catch((e) => {
        res.status(400).send("catch error");
    });
});

app.delete('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id))
    {
        res.status(404).send();
    }
    Todo.findOneAndRemove({
        _creator : req.user._id,
        _id : id
    }).then( (result) => 
    {
        if(!result)
        {
            res.status(404).send();
        }
        res.send(result);
    }).catch((err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id',authenticate,(req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id))
    {
        res.status(404).send();
    }
    var bodyval = lodash.pick(req.body, ['text','completed']);
    

    if(bodyval.completed === true)
    {
        bodyval.completed = true;
        bodyval.completedAt = new Date();
    } 
    else{
        bodyval.completed = false;
        bodyval.completedAt = null;
    }
    console.log(bodyval);
    Todo.findOneAndUpdate({ _creator : req.user._id , _id : id }, {$set : bodyval } , { new : true} ).then( (todo) => {
        if(!todo)
        {
            res.status(404).send();
        }
        console.log(todo);
        res.send(todo);
    }).catch( (err) => {
        res.send(400).send();
    });
    
});


// Users

app.post('/users',(req,res) => {
    console.log('Post user Hitted');
    var userval = new User({
        email : req.body.email,
        password : req.body.password
    });
    // console.log(userval);

    userval.save().then(() => {
        return userval.generateAuthToken();
        // res.send(user);
    }).then((token) => {
        res.header('x-auth',token).send(userval);
    }).catch((err) => {
        console.log("Error Occured while saving");
        res.status(400).send(err);
    });
})

app.get('/users' , (req,res) => {
    User.find().then( (users) => {
        // console.log('User Hitted');
        if(!users)
        {
            res.send("Users Not exist");
        }
        res.send(users);
    }).catch( (err) => {
        res.send('Error Occured');
    });
});

app.delete('/users', (req,res) => {
    User.remove().then((users) => {
        res.send('All Removed');
    }).catch((err) => {
        res.send('cannot remove All values');
    });
});

// private route// do this for everyone or make it a middle ware and make the things easier
// app.get('/users/me',(req,res) => {
//     var token = req.header('x-auth');

//     User.findByToken(token).then ( (user) => {
//         if(!user)
//         {
//             return new Promise((resolve,reject) => {
//                 reject();
//             });
//             // or just use -- res.status(401).send(); or use Promise .reject() , all have got the same meaning
//         }
//         res.send(user);
//     }).catch( (err) => {
//         res.status(401).send();
//     });
// });

// adding middleware instead of above commented codes

// var authenticate = (req,res,next) => {
//     var token = req.header('x-auth');

//         User.findByToken(token).then ( (user) => {
//             if(!user)
//             {
//                 return new Promise((resolve,reject) => {
//                     reject();
//                 });
//                 // or just use -- res.status(401).send(); or use Promise .reject() , all have got the same meaning
//             }
//             req.user = user;
//             req.token = token;
//             next();
//         }).catch( (err) => {
//             res.status(401).send();
//         });
// };

app.get('/users/me',authenticate,(req,res) => {
    res.send(req.user);
});
 // user/login route
app.post('/users/login' ,(req,res) => {
   var body = lodash.pick(req.body ,['email','password']);
    // console.log(body);
    User.findByCredentials(body.email,body.password).then( (user)=> {
        
        return user.generateAuthToken().then( (token) => {
            res.header('x-auth',token).send(user);
        });

    }).catch((err) => {
        res.status(400).send("Wrong Credentials");

    });
    
});

app.delete('/users/me/token',authenticate,(req,res) => {
        req.user.removeToken(req.token).then( ( ) => {
            res.send('Successfully removed');
        }).catch((err) => {
            res.status(400).send('Not removed');
        });
});

app.listen(3000,() => {
    console.log('Server Started');
});


module.exports = {
    app : app
};


