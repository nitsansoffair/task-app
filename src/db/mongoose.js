const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// const User = new mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// });
//
// const me = new User({
//     name: 'Andrew',
//     age: 'Mike'
// });
//
// me.save()
//     .then(() => {
//         console.log(me);
//     })
//     .catch(err => {
//         console.log(err);
//     });

const Task = new mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const task = new Task({
    description: 'description',
    completed: false
});

task.save()
    .then(res => console.log(res))
    .catch(err => console.log(err));
