import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
} from "@mui/material";

const Signup = ({ setIsSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({
        username,
        password,
        email,
        firstName,
        lastName,
        phoneNumber,
      });
      setIsSignedUp(true); // Update signup status
      navigate("/"); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Full height for the container
        backgroundColor: "#2196f3", // Background color for the page
        padding: 2, // Add padding to the page for better spacing
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          padding: "2rem", // Padding around the card
          backgroundColor: "#ffffff", // White background for the form
          borderRadius: "8px", // Rounded corners for the form
          boxShadow: 3, // Shadow for depth
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: "2rem", color: "#2196f3" }}
        >
          Weather App Signup
        </Typography>
        <form onSubmit={handleSignup}>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              sx={{ marginBottom: "1rem" }}
            />
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              sx={{ marginBottom: "1rem" }}
            />
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              sx={{ marginBottom: "1rem" }}
            />
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              sx={{ marginBottom: "1rem" }}
            />
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              sx={{ marginBottom: "1rem" }}
            />
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ padding: "0.75rem", marginTop: "1rem" }}
          >
            Sign Up
          </Button>
        </form>

        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          <Typography variant="body2" color="textSecondary">
            Already have an account?{" "}
            <Link
              href="/login"
              variant="body2"
              sx={{ color: "#2196f3", fontWeight: "bold" }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
