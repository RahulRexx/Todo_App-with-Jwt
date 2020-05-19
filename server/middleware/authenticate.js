var {User} = require('../models/users');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return new Promise((resolve, reject) => {
                reject();
            });
            // or just use -- res.status(401).send(); or use Promise .reject() , all have got the same meaning
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send();
    });
};

module.exports = {
    authenticate : authenticate 
};