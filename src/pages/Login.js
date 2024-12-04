import React from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            const response = await login(data);
            localStorage.setItem('token', response.data.token); // Save token for API requests
            setIsLoggedIn(true); // Update login status
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            alert('Login failed: ' + err.response.data.message);
        }
    };

    return <AuthForm onSubmit={handleLogin} isSignup={false} />;
};

export default Login;
