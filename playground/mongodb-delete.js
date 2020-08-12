// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useUnifiedTopology: true }, (err, db) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB server. Reason: ${err}`)
    };
    console.log('Connected to MongoDB server');

    db.collection('Todos').deleteMany({ text: 'Eat lunch' })
        .then((res) => {
            console.log(res.result);
        })
        .catch(err => console.log(err))

    db.collection('Todos').deleteOne({ text: 'Eat breakfast' })
        .then((res) => {
            console.log(res.result);
        })
        .catch(err => console.log(err))

    db.collection('Todos').findOneAndDelete({ completed: false })
        .then((res) => {
            console.log(res);
        })
        .catch(err => console.log(err))

    db.collection('Todos').deleteMany({ text: 'Walk the dogs' })
        .then((res) => {
            console.log(res.result);
        })
        .catch(err => console.log(err))

    db.collection('Todos').findOneAndDelete({ _id: new ObjectID('5f2add315a4873c39646512e') })
        .then((res) => {
            console.log(res);
        })
        .catch(err => console.log(err))

    db.close();
});