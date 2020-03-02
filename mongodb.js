const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-app';

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if(error){
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    // db.collection('users').deleteMany({
    //     age: 27
    // })
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    db.collection('tasks').deleteOne({
        _id: new ObjectID('5e5b0624e4194127b8543f4a')
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
});
