import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        setIsLoggedIn(false); // Update login state
    };

    return (
        <Router>
            <Routes>
                {/* Default Route: Login */}
                <Route
                    path="/"
                    element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/dashboard" />}
                />

                {/* Dashboard Route with Logout Functionality */}
                <Route
                    path="/dashboard"
                    element={
                        isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
