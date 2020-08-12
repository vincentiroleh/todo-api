const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.status(200).json({ doc })
    }).catch(err => res.status(400).json({ error: err.message }))
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.json({
            status: 200,
            todos,
        })
    }).catch(err => res.status(400).json({ err }))
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'ID not valid',
        })
    }
    Todo.findById(id).then((todo) => {
        if (!todo) return res.status(404).json({ message: 'Todo ID not found' })
        res.json({
            status: 200,
            todo,
        })
    }).catch(err => res.status(400).json({ err }))
})

app.listen(3000, () => console.log('Started on port 3000'));

module.exports = { app };