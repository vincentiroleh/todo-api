const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

const id = '5f34490379235b4791b7137b11';

if (!ObjectId.isValid(id)) {
    console.log('ID not valid')

}

Todo.find({ _id: id }).then((todos) => {
    if (todos.length === 0) return console.log('Id not found');
    console.log('Todos', todos)
});

Todo.findOne({ _id: id }).then((todo) => {
    if (!todo) return console.log('Id not found');
    console.log('Todo', todo)
});

Todo.findById(id).then((todo) => {
    if (!todo) return console.log('Id not found');
    console.log('Todo By ID', todo)
}).catch(err => console.log(err.message))