const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

// Todo.deleteMany({}).then(result => console.log(result));

// Todo.findByIdAndDelete
// Todo.findOneAndDelete

Todo.findByIdAndDelete('5f43d811b4d44c5473a5329a').then(todo => console.log(todo))