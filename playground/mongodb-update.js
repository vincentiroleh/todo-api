// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useUnifiedTopology: true }, (err, db) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB server. Reason: ${err}`)
    };
    console.log('Connected to MongoDB server');

    db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('5f2ade7e5a4873c396465131') }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((res) => console.log(res.value))
        .catch(err => console.log(err))


    db.collection('Users').findOneAndUpdate({ _id: new ObjectID('5f2ad0c4d61afdca12bc2560') }, {
        $set: {
            name: 'Anita Finebone',            
        },
        $inc: {
            age: 1
        }
        
    }, {
        returnOriginal: false
    }).then((res) => console.log(res.value))
        .catch(err => console.log(err))

    db.close();
});