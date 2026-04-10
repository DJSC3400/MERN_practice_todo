const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const Todo = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(err));

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);  // All /todos routes are now protected

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);

// Create Todo
app.post('/todos', async (req, res) => {
    try {
        const todo = new Todo({ text: req.body.text });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Update Todo
app.put('/todos/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('Not found');

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

// Delete Todo
app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);