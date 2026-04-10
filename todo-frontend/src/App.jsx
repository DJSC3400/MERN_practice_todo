import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TodoApp from './components/TodoApp';

function AppContent() {
    const { user } = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    // Logged in → show the app
    if (user) return <TodoApp />;

    // Logged out → show login or register
    return showRegister
        ? <Register onSwitch={() => setShowRegister(false)} />
        : <Login onSwitch={() => setShowRegister(true)} />;
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}