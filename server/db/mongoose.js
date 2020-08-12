const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true, useUnifiedTopology: true },);
mongoose.set('useCreateIndex', true)

module.exports = {
    mongoose
};