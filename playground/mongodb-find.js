// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useUnifiedTopology: true }, (err, db) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB server. Reason: ${err}`)
    };
    console.log('Connected to MongoDB server');

    db.collection('Todos').find({ _id: new ObjectID('5f2ad58dd3fbcacf81096f1c') }).toArray()
        .then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
        })
        .catch(err => console.log(err))

    db.collection('Todos').find().count()
        .then((count) => {
            console.log(`Todos count: ${count}`);
        })
        .catch(err => console.log(err))

    db.collection('Users').find({ name: 'Vincent Iroleh' }).toArray()
        .then((user) => {
            console.log(JSON.stringify(user, undefined, 2));
        })
        .catch(err => console.log(err))
    db.close();
});