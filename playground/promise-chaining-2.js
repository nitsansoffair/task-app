require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5e5d57f9b8c8aa178c473aa6')
    .then(res => {
        console.log(res);
        return Task.countDocuments({ completed: false })
    })
    .then(count => {
        console.log(count);
    })
    .catch(err => {
        console.log(err);
    });
