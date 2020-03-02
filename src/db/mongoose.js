const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tasks-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const Task = new mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});
