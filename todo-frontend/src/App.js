import React, { useState, useEffect } from 'react';
import axios from 'axios';
function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const API_URL = 'http://localhost:5000/todos';
    useEffect(() => {
        fetchTodos();
    }, []);
    const fetchTodos = async () => {
        const res = await axios.get(API_URL);
        setTodos(res.data);
    };
    const addTodo = async () => {
        if (!text) return;
        await axios.post(API_URL, { text });
        setText('');
        fetchTodos();
    };
    const toggleTodo = async (id) => {
        await axios.put(`${API_URL}/${id}`);
        fetchTodos();
    };
    const deleteTodo = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchTodos();
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>To-Do App (MongoDB)</h2>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter task"
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        <span
                            onClick={() => toggleTodo(todo._id)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer'
                            }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;
