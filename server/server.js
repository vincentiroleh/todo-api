require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
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
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch(err => res.status(400).send())
})

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(404).send();
    Todo.findByIdAndDelete(id).then((todo) => {
        if (!todo) return res.status(404).send();
        res.status(200).send({ todo });
    }).catch(err => res.status(400).send(err));
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectId.isValid(id)) return res.status(404).send();

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    console.log(body)

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo) return res.status(404).send();
            res.send({ todo });
        }).catch(err => res.status(400).send({ err }))

})

app.get('*', (req, res) => res.send(`Hey dev, check out the <a href="https://github.com/vincentiroleh/todo-api"> docs </a> on github`))

const port = process.env.PORT;
app.listen(port, () => console.log(`Started on port ${port}`));

module.exports = { app };