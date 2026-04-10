const express = require('express');
const Todo = require('../models/Todo');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes below require a valid JWT
router.use(authMiddleware);

// Create Todo
router.post('/', async (req, res) => {
    try {
        const todo = new Todo({ text: req.body.text, user: req.userId });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all Todos for the logged-in user
router.get('/', async (req, res) => {
    const todos = await Todo.find({ user: req.userId });
    res.json(todos);
});

// Toggle complete
router.put('/:id', async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) return res.status(404).json({ error: 'Not found' });

    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
});

// Delete Todo
router.delete('/:id', async (req, res) => {
    const result = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.sendStatus(204);
});

module.exports = router;