import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Stars, GridFloor } from './Login'; // re-export Stars & GridFloor from Login.js

export default function Register({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    try {
      const res = await api.post('/auth/register', form);
      login(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0033] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <Stars />
      <GridFloor />

      <div className="relative z-10 w-full max-w-sm">
        <h1 className="text-6xl tracking-widest text-center font-retro chrome-text">
          JOIN THE NIGHT
        </h1>
        <p className="mb-8 text-4xl text-center font-neon neon-yellow">
          Create account
        </p>

        {error && (
          <p className="mb-4 text-sm tracking-widest text-center text-pink-400 uppercase">
            {error}
          </p>
        )}

        <div className="retro-card">
          <label className="retro-label">Username</label>
          <input name="username" placeholder="nightrider_88" value={form.username}
            onChange={handleChange} className="retro-input" />
          <label className="retro-label">Email</label>
          <input name="email" type="email" placeholder="your@email.com" value={form.email}
            onChange={handleChange} className="retro-input" />
          <label className="retro-label">Password</label>
          <input name="password" type="password" placeholder="••••••••" value={form.password}
            onChange={handleChange} className="retro-input"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} />
          <button onClick={handleSubmit} className="mt-2 retro-btn">
            CREATE ACCOUNT
          </button>
          <p className="mt-4 text-sm tracking-wide text-center text-purple-300/60">
            Already a member?{' '}
            <span onClick={onSwitch} className="cursor-pointer neon-yellow-text">
              Log in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}