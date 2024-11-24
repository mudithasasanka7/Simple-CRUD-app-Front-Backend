const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    tast: String, 
});

module.exports = mongoose.model('Todo', TodoSchema, 'todos');
