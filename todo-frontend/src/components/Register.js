import React, { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

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
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <h2>Create Account</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <input name="username" placeholder="Username" value={form.username} onChange={handleChange} />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <button onClick={handleSubmit}>Register</button>
                <p>
                    Already have an account?{' '}
                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onSwitch}>
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}