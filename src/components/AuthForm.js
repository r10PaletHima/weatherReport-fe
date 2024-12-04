import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AuthForm = ({ onSubmit, isSignup }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: '0 auto' }}
        >
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Log In'}</Typography>
            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained">
                {isSignup ? 'Sign Up' : 'Log In'}
            </Button>
        </Box>
    );
};

export default AuthForm;
