const bcrypt = require('bcryptjs');
const validator = require('validator');

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

        await user.generateAuthToken();

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

        const token = await user.generateAuthToken();

        return {
            token,
            userId: user._id.toString()
        };
    },
    createTask: async function (data, req) {
        const { taskInputData } = data;

        if(!req.isAuth){
            const error = new Error('Please authenticate.');
            error.code = 401;
            throw error;
        }

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

        const user = await User.findById(req.userId);

        const task = new Task({
            description: taskInputData.description,
            completed: taskInputData.complete,
            owner: user
        });

        const createdTask = await task.save();

        return {
            ...createdTask._doc,
            _id: createdTask._id.toString(),
            createdAt: createdTask.createdAt.toISOString(),
            updatedAt: createdTask.updatedAt.toISOString()
        };
    },
    tasks: async function({ page = 1 }, req){
        if(!req.isAuth){
            const error = new Error('Please authenticate.');
            error.code = 401;
            throw error;
        }

        const perPage = 2;

        const user = await User.findById(req.userId);
        await user.populate({
            path: 'tasks',
            options: {
                sort: "desc"
            }
        }).execPopulate();

        return {
            tasks: user.tasks.slice((page - 1) * perPage, page * perPage),
            totalTasks: perPage
        };
    }
};
