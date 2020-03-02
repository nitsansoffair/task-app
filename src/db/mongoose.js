const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const User = new mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    }
});

const me = new User({
    name: '   Andrew  ',
    email: 'EMAIL@MEAD.IO   '
});

me.save()
    .then(() => {
        console.log(me);
    })
    .catch(err => {
        console.log(err);
    });

// const Task = new mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });
//
// const task = new Task({
//     description: 'description',
//     completed: false
// });
//
// task.save()
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
