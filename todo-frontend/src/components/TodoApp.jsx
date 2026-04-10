import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Stars, GridFloor } from './Login';

export default function TodoApp() {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => { fetchTodos(); }, []);

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

  const pending = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  return (
    <div className="min-h-screen bg-[#1a0033] px-4 py-8 relative overflow-hidden">
      <Stars />
      <GridFloor />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm tracking-widest uppercase text-purple-300/60">
            👾 {user?.username}
          </span>
          <button onClick={logout}
            className="text-xs tracking-widest uppercase border border-pink-500/40
                       text-pink-400/80 px-3 py-1.5 rounded hover:bg-pink-500/10 transition">
            LOG OUT
          </button>
        </div>

        <h1 className="mb-0 text-6xl tracking-widest text-center font-retro chrome-text">
          RETRO TASKS
        </h1>
        <p className="mb-6 text-3xl text-center font-neon neon-yellow">
          Tonight's Agenda
        </p>

        {/* Add todo */}
        <div className="flex gap-2 mb-8">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 mb-0 retro-input"
          />
          <button onClick={addTodo} className="retro-btn-sm">ADD</button>
        </div>

        {/* Pending todos */}
        {pending.length > 0 && (
          <>
            <p className="mb-2 retro-label">— Pending —</p>
            {pending.map((todo) => (
              <TodoRow key={todo._id} todo={todo}
                onToggle={() => toggleTodo(todo._id)}
                onDelete={() => deleteTodo(todo._id)} />
            ))}
          </>
        )}

        {/* Completed todos */}
        {done.length > 0 && (
          <>
            <p className="mt-6 mb-2 retro-label">— Completed —</p>
            {done.map((todo) => (
              <TodoRow key={todo._id} todo={todo} completed
                onToggle={() => toggleTodo(todo._id)}
                onDelete={() => deleteTodo(todo._id)} />
            ))}
          </>
        )}

        {todos.length === 0 && (
          <p className="mt-12 text-sm tracking-widest text-center uppercase text-purple-400/40">
            No tasks yet. Add one above.
          </p>
        )}
      </div>
    </div>
  );
}

function TodoRow({ todo, completed, onToggle, onDelete }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg px-4 py-3 mb-2 border transition
      ${completed
        ? 'bg-[#0d001a]/60 border-purple-900/20'
        : 'bg-[#2a005a]/40 border-purple-500/30 hover:border-purple-400/50'}`}>
      <button onClick={onToggle}
        className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition
          ${completed
            ? 'bg-purple-600/60 border-purple-400/40'
            : 'border-purple-400/50 hover:border-yellow-400/60'}`}>
        {completed && <span className="text-xs text-purple-200">✓</span>}
      </button>
      <span onClick={onToggle}
        className={`flex-1 text-sm cursor-pointer tracking-wide transition
          ${completed ? 'line-through text-purple-400/40' : 'text-purple-100'}`}>
        {todo.text}
      </span>
      <button onClick={onDelete}
        className="px-2 py-1 text-xs tracking-widest uppercase transition border rounded border-pink-500/30 text-pink-400/60 hover:bg-pink-500/10">
        del
      </button>
    </div>
  );
}