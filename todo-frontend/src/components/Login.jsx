import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0033] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <Stars />
      <GridFloor />

      <div className="relative z-10 w-full max-w-sm">
        <h1 className="text-6xl tracking-widest text-center font-retro chrome-text">
          RETRO TASKS
        </h1>
        <p className="mb-8 text-4xl text-center font-neon neon-yellow">
          Welcome back
        </p>

        {error && (
          <p className="mb-4 text-sm tracking-widest text-center text-pink-400 uppercase">
            {error}
          </p>
        )}

        <div className="retro-card">
          <label className="retro-label">Email</label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className="retro-input"
          />
          <label className="retro-label">Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="retro-input"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button onClick={handleSubmit} className="mt-2 retro-btn">
            LOG IN
          </button>
          <p className="mt-4 text-sm tracking-wide text-center text-purple-300/60">
            No account?{' '}
            <span onClick={onSwitch} className="cursor-pointer neon-yellow-text">
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Stars() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(1px 1px at 10% 8%, white, transparent),
          radial-gradient(1.5px 1.5px at 25% 15%, white, transparent),
          radial-gradient(1px 1px at 40% 5%, white, transparent),
          radial-gradient(2px 2px at 60% 20%, white, transparent),
          radial-gradient(1px 1px at 75% 10%, white, transparent),
          radial-gradient(1.5px 1.5px at 90% 25%, white, transparent),
          radial-gradient(1px 1px at 15% 40%, white, transparent),
          radial-gradient(1px 1px at 50% 35%, rgba(255,220,255,0.8), transparent),
          radial-gradient(2px 2px at 85% 30%, white, transparent),
          radial-gradient(1px 1px at 5% 55%, white, transparent)
        `,
      }}
    />
  );
}

export function GridFloor() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
      style={{
        background: `
          repeating-linear-gradient(0deg, rgba(200,0,255,0.25) 0px, rgba(200,0,255,0.25) 1px, transparent 1px, transparent 28px),
          repeating-linear-gradient(90deg, rgba(200,0,255,0.25) 0px, rgba(200,0,255,0.25) 1px, transparent 1px, transparent 40px)
        `,
        transform: 'perspective(200px) rotateX(40deg)',
        transformOrigin: 'bottom center',
      }}
    />
  );
}