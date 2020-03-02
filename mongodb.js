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

    // db.collection('users').findOne({ _id: new ObjectID('5e5b0593e1cd14305456c730') }, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }
    //
    //     console.log(user);
    // });
    //
    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users);
    // });
    //
    // db.collection('users').find({ age: 27 }).count((error, count) => {
    //     console.log(count);
    // });

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5e5b040fa7c46441accf3f49")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // })
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
});
