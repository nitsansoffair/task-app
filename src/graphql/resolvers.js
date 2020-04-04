const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Task = require('../models/task');

module.exports = {
    createUser: async function({ userInput }, req){
        const errors = [];

        if(!validator.isEmail(userInput.email)){
            errors.push({
                message: 'Email is invalid.'
            });
        }

        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, { min: 7 })){
            errors.push({
                message: 'Password is invalid.'
            });
        }

        if(errors.length > 0){
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;

            throw error;
        }

        const existingUser = await User.findOne({ email: userInput.email });

        if(existingUser){
            const error = new Error ('User exists already!');
            throw error;
        }

        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: userInput.password
        });
        const createdUser = await user.save();

        return {
            ...createdUser._doc,
            _id: createdUser._id.toString()
        };
    },
    login: async function ({ email, password }) {
        const user = await User.findOne({ email });

        if(!user){
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if(!isEqual){
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }

        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email,

        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return {
            token,
            userId: user._id.toString()
        };
    },
    createTask: async function ({ taskInputData }, req) {
        const errors = [];

        if (validator.isEmpty(taskInputData.description)){
            errors.push({
                message: 'Description is invalid.'
            });
        }

        if(errors.length > 0){
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;

            throw error;
        }

        const user = await User.findOne({ email: 'test@test.net' });

        const task = new Task({
            description: taskInputData.description,
            completed: taskInputData.complete,
            owner: user._id.toString()
        });

        const createdTask = await task.save();

        return {
            ...createdTask._doc,
            _id: createdTask._id.toString(),
            createdAt: createdTask.createdAt.toISOString(),
            updatedAt: createdTask.updatedAt.toISOString()
        };
    }
};
