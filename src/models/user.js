const mongoose = require('mongoose');
const validator = require('validator');

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
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.toLowerCase().indexOf('password') !== -1){
                throw new Error('Password should not contain `password`');
            }
        },
        trim: true,
        minlength: 7
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

module.exports = User;
