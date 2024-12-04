import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup"; // Import the Signup page
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LogsTable from "./components/LogsTable";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false); // Update login state
  };

  return (
    <Router>
      <Routes>
        {/* Default Route: Login, only show if not logged in */}
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Signup Route, only show if not logged in */}
        <Route
          path="/signup"
          element={
            !isLoggedIn ? (
              <Signup setIsSignedUp={setIsLoggedIn} /> // Handle signup status
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* Dashboard Route with Logout Functionality */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Logs Route */}
        <Route
          path="/logs"
          element={isLoggedIn ? <LogsTable /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
