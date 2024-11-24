// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const TodoModel = require('./Models/Todo');

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Route to fetch todos
app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Route to add a new todo
app.post('/add', (req, res) => {
    const tast = req.body.tast;
    TodoModel.create({ tast: tast })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Route to delete a todo by id
app.delete('/delete/:id', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id)
        .then(result => res.json({ message: 'Task deleted' }))
        .catch(err => res.json(err));
});

// Route to update a todo by id
app.put('/update/:id', (req, res) => {
    const updatedTask = req.body.tast;
    TodoModel.findByIdAndUpdate(req.params.id, { tast: updatedTask }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
