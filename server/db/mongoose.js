var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// 'mongodb://localhost:27017/TodoApp'
mongoose.connect(process.env.MONGODB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {
    mongoose : mongoose
};
