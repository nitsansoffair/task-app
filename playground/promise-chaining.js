require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5e5d4e1750edd93a90259b2e', { age: 1 })
    .then(user => {
        console.log(user);
        return User.countDocuments({ age: 1 })
    })
    .then(count => {
        console.log(count);
    })
    .catch(err => {
        console.log(err);
    });
