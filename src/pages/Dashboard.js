import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchWeather, fetchLogs } from "../services/api";
import LogsTable from "../components/LogsTable";

const Dashboard = ({ onLogout }) => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Clear token and update login state
    navigate("/"); // Navigate to login page
  };

  const handleSearch = async () => {
    try {
      const response = await fetchWeather(`city=${query}`);
      setWeather(response.data);
    } catch (err) {
      alert("Error fetching weather: " + err.message);
    }
  };

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await fetchLogs();
        setLogs(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserLogs();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weather Dashboard
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Search City"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      {weather && (
        <Typography variant="body1" sx={{ mb: 4 }}>
          Weather in {weather.location.name}: {weather.current.temperature}°C
        </Typography>
      )}
      <LogsTable logs={logs} />
    </Box>
  );
};

export default Dashboard;
