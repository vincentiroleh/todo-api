// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useUnifiedTopology: true }, (err, db) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB server. Reason: ${err}`)
    };
    console.log('Connected to MongoDB server');

    db.collection("Todos").insertOne({
        text: "Walk the dogs",
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log(`Unable to insert todo. Reason: ${err}`)
        };
        console.log(JSON.stringify(result.ops, undefined, 2))
    });

    db.collection("Users").insertOne({
        name: "Vincent Iroleh",
        age: 25,
        location: "Aba"
    }, (err, result) => {
        if (err) return console.log(`Unable to insert todo. Reason: ${err}`);
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
    });

    db.close();
});