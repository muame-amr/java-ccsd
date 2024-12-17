import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { tokens } from "../../../base/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import Header from "../../../components/Header";
import React, { useState, useEffect } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';

const TeamAdmin = () => {
    const API_BASE_URL = 'http://localhost:8082';
    const token = localStorage.getItem('jwtToken');
    const username = localStorage.getItem('userName');
    const [teamDetails, setTeamDetails] = useState([]);

    axios.defaults.withCredentials = true;

    useEffect(() => {
      // Fetch all products from the API
      fetch(`${API_BASE_URL}/api/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => response.json())
      .then(data => {
        setTeamDetails(data);
      })
      .catch(error => console.error('Error fetching products:', error));
    }, []);


    const handleDelete = (userId) => {
        // Make the DELETE request to the backend API
        axios.delete(`${API_BASE_URL}/api/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include JWT token if needed for authorization
            },
        })
        .then((response) => {
            // Handle success response
            console.log("User deleted:", response.data);
            // Update the state to remove the deleted user from the teamDetails
            setTeamDetails((prevDetails) => prevDetails.filter(user => user.userId !== userId));
        })
        .catch((error) => {
            // Handle error
            console.error("Error deleting user:", error);
        });
    };


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "userId", headerName: "ID" },
        { field: "name", headerName: "NAME", flex: 1, cellClassName: "name-column--cell" },
        { field: "phone", headerName: "PHONE#", flex: 1 },
        { field: "email", headerName: "EMAIL", flex: 1 },
        { field: "role", headerName: "ROLE", flex: 1 },
        {
            // field: "delete",
            // headerName: "DELETE",
            flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box
                        width="40%"
                        m="0 auto"
                        p="5px"
                        justifyContent="center"
                        alignItems="center"
                        // backgroundColor={row.access === "admin" ? colors.greenAccent[600] : colors.greenAccent[700]}
                        // borderRadius="4px"
                    >
                            {/* delete func here onclick */}


                        {/* <DeleteOutlinedIcon onClick={() => handleDelete(row.id)}/> 
                        <Typography variant="body1" color={colors.grey[100]} sx={{ ml: "5px" }}>
                            Delete
                        </Typography> */}
                    </Box>
                );
            },
        },
    ];

    // Map the teamDetails to match the DataGrid row structure
    const rows = teamDetails.map((user) => {
        // Ensure `userId` is set as a unique id
        const userId = user.userId || `user-${Math.random()}`; // Fallback if userId is undefined
        const name = user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : "Unknown Name"; // Handle undefined names

        return {
            id: userId, // Ensure each row has a unique `id`
            name: name, // Concatenate first and last name, fallback to "Unknown Name"
            phone: user.phoneNumber || "N/A", // Fallback if phone number is missing
            email: user.email || "N/A", // Fallback if email is missing
            role: user.role || "N/A", // Fallback if role is missing
        };
    });

    return (
        <Box>
            <Header title="Team" subtitle="Managing the Team" />
            <Box>
                <DataGrid
                    rows={rows} // Use the mapped rows here
                    columns={columns}
                    pageSize={12}
                />
            </Box>
            <Link to="/AddTeam" style={{ textDecoration: 'none' }}>
                <Grid container justifyContent="flex-end">
                    <Box sx={{ m: 2 }}>
                        <Button
                            startIcon={<PersonAddAltOutlinedIcon />}
                            justifyContent="center"
                            variant="contained"
                            size="large"
                            color="success"
                        >
                            Add Team Member
                        </Button>
                    </Box>
                </Grid>
            </Link>
        </Box>
    );
};

export default TeamAdmin;
