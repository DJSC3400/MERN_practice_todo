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
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <h2>Log In</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
                <button onClick={handleSubmit}>Log In</button>
                <p>
                    No account?{' '}
                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onSwitch}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}