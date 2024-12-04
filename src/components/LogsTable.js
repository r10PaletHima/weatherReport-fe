import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; // MUI DataGrid
import { fetchLogs } from "../services/api";

// Enhance the styling of the table and individual elements
const styles = {
  paper: {
    padding: "20px",
    marginTop: "20px",
    backgroundColor: "#f0f7ff", // Light blue for weather theme
    borderRadius: "10px",
  },
  tableContainer: {
    marginTop: "20px",
    backgroundColor: "#ffffff", // White background for better contrast
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  headerCell: {
    backgroundColor: "#1976d2", // Blue header for contrast
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },
  tableCell: {
    fontSize: "14px",
    padding: "10px",
  },
  locationText: {
    fontStyle: "italic",
    color: "#555",
  },
  title: {
    color: "#1976d2", // Blue color for main titles
    fontWeight: "bold",
  },
  userDetail: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
};

const LogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await fetchLogs();
        setUserInfo(response.data.user);
        setLogs(response.data.logs);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserLogs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredLogs = logs.filter((log) =>
    log.log_query.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper style={styles.paper}>
      <Typography variant="h4" style={styles.title}>
        Weather Log Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper style={styles.paper}>
            <Typography variant="h6" style={styles.title}>
              User Information
            </Typography>
            {userInfo ? (
              <>
                <Typography variant="body1" style={styles.userDetail}>
                  <strong>Name:</strong> {userInfo.first_name}{" "}
                  {userInfo.last_name}
                </Typography>
                <Typography variant="body1" style={styles.userDetail}>
                  <strong>Email:</strong> {userInfo.email}
                </Typography>
                <Typography variant="body1" style={styles.userDetail}>
                  <strong>Phone:</strong> {userInfo.phone_number}
                </Typography>
              </>
            ) : (
              <Typography variant="body1">
                Loading user information...
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Paper style={styles.tableContainer}>
            <Typography variant="h6" style={styles.title}>
              User Access Logs
            </Typography>

            <TextField
              label="Search Query"
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={styles.headerCell}>Log ID</TableCell>
                    <TableCell style={styles.headerCell}>Query</TableCell>
                    <TableCell style={styles.headerCell}>Timestamp</TableCell>
                    <TableCell style={styles.headerCell}>Location</TableCell>
                    <TableCell style={styles.headerCell}>
                      User Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((log) => (
                      <TableRow key={log.log_id}>
                        <TableCell style={styles.tableCell}>
                          {log.log_id}
                        </TableCell>
                        <TableCell style={styles.tableCell}>
                          {log.log_query || "Invalid Query"}
                        </TableCell>
                        <TableCell style={styles.tableCell}>
                          {new Date(log.log_timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell style={styles.tableCell}>
                          {log.location ? (
                            <Typography
                              variant="body2"
                              style={styles.locationText}
                            >
                              {log.location} (Lat: {log.latitude}, Lon:{" "}
                              {log.longitude})
                            </Typography>
                          ) : (
                            <Typography
                              variant="body2"
                              style={styles.locationText}
                            >
                              No location provided
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell style={styles.tableCell}>
                          {userInfo ? (
                            <Typography variant="body2">
                              {userInfo.first_name} {userInfo.last_name}
                            </Typography>
                          ) : (
                            <Typography variant="body2">
                              Loading user details...
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} style={styles.tableCell}>
                        No logs available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LogsTable;
