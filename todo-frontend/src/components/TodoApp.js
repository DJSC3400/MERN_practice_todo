import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function TodoApp() {
    const { user, logout } = useAuth();
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const res = await api.get('/todos');
        setTodos(res.data);
    };

    const addTodo = async () => {
        if (!text.trim()) return;
        await api.post('/todos', { text });
        setText('');
        fetchTodos();
    };

    const toggleTodo = async (id) => {
        await api.put(`/todos/${id}`);
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        await api.delete(`/todos/${id}`);
        fetchTodos();
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
            {/* Header with username and logout */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 20px' }}>
                <span style={{ marginRight: '12px' }}>👋 {user?.username}</span>
                <button onClick={logout}>Log Out</button>
            </div>

            <h2>To-Do App (MongoDB)</h2>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Enter task"
            />
            <button onClick={addTodo}>Add</button>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map(todo => (
                    <li key={todo._id} style={{ margin: '8px 0' }}>
                        <span
                            onClick={() => toggleTodo(todo._id)}
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                cursor: 'pointer',
                                marginRight: '10px'
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