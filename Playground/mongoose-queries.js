const mongoose = require('./../server/db/mongoose.js');
const {ObjectID} = require('mongodb');
var {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/users.js');

var id = '5eb6b76d7de82452047adadafadf3bb1';

// if(!ObjectID.isValid(id))
// {
//     console.log('Invalid id');
// }

console.log(ObjectID.isValid(id));

Todo.find({
    _id : id }).then((todos) => {
        console.log(todos);
    }).catch((err) => {
        console.log(err);
    });

Todo.findById(id).then((todos) => {
    console.log(todos);
});

Todo.findOne({ _id : id }).then((todos) => {
        console.log(todos);
    });