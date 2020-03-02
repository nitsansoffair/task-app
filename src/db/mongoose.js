const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const User = new mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const me = new User({
    name: 'Andrew',
    age: 'Mike'
});

me.save()
    .then(() => {
        console.log(me);
    })
    .catch(err => {
        console.log(err);
    });
