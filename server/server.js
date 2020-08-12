const express = require('express');
const bodyParser = require('body-parser');

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
})


app.listen(3000, () => console.log('Started on port 3000'));

module.exports = { app };