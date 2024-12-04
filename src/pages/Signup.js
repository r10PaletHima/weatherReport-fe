import React from 'react';
import AuthForm from '../components/AuthForm';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsSignedUp }) => {
    const navigate = useNavigate();

    const handleSignup = async (data) => {
        try {
            await signup(data);
            setIsSignedUp(true); // Update signup status
            navigate('/login'); // Redirect to login
        } catch (err) {
            alert('Signup failed: ' + err.response.data.message);
        }
    };

    return <AuthForm onSubmit={handleSignup} isSignup={true} />;
};

export default Signup;
