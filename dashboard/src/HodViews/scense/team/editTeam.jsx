import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button, Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhotoCamera from '@mui/icons-material/PhotoCamera';  // Import the PhotoCamera icon
import { useNavigate } from 'react-router-dom';
import EditItemsAdmin from '../../editItemAdmin';
import GetItemsAdmin from '../../getItemAdmin';
import { useParams } from 'react-router-dom';


const EditTeam = () => {
    const [teamDetails, setTeamDetails] = useState({});
    const [loading, setLoading] = useState(true); // New loading state
    const { userId } = useParams();
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastname] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [role, setRole] = useState("");
    const [username, setUsername] = useState("");
    const [image, saveProfPicToStorage] = useState(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
      GetItemsAdmin.getTeamDataAdminEdit(userId)
        .then((result) => {
          const teamData = result || {};
          setFirstName(teamData.firstName);
          setEmail(teamData.email);
          setLastname(teamData.lastName);
          setEmail(teamData.email);
          setUsername(teamData.username);
          setDob(teamData.dob);
          setRole(teamData.role);
          setPhone(teamData.phoneNumber);
          setProfPic(teamData.profPic);
          setAddress(teamData.address)

          setLoading(false); // Set loading to false when data is loaded
        })
        .catch((error) => {
          console.error("Error fetching team data:", error);
        });
    }, [userId]);
  

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    
    const [showPassword, setShowPassword] = React.useState(false);
    

    
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        saveProfPicToStorage(selectedImage);
    };

    const handleEditTeam = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
      
        try {
          const success = await EditItemsAdmin.editTeamSave(userId, firstName, lastName, phoneNumber, username, dob, address, role, email, password, image-upload);
          
          if (success) {
            navigate("/api/users");
          } else {
            // Handle login failure and display an error message to the user
            alert("Error Saving data");
          }
        } catch (error) {
          // Handle network or other errors
          console.error("Saving Error:", error);
          alert("An error occurred while saving.");
        }
      }

  return (
    <Box>
    
        <Header title="Add Team Member" subtitle="Enter New Member Details" />

        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleEditTeam}>
                <TextField
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    label="Enter Your First Name"
                    id="firstName"
                    sx={{ m: 1, width: '30%' }}
                    variant="filled"
                />
                <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    label="Enter Desired User Name"
                    id="username"
                    sx={{ m: 1, width: '30%' }}
                    variant="filled"
                />
                <TextField
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    label="Enter Team Member Role"
                    id="role"
                    sx={{ m: 1, width: '30%' }}
                    variant="filled"
                />
                <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    label="Enter Your Last Name"
                    id="lastName"
                    sx={{ m: 1, width: '30%' }}
                    variant="filled"
                />
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
                <FilledInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id='email'
                    type='email'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="Envelope"
                                edge="end"                                        
                            >
                            <EmailIcon></EmailIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>

                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-phone">Phone</InputLabel>
                <FilledInput
                   onChange={(e) => setPhoneNumber(e.target.value)}
                   value={phone}
                    id='phoneNumber'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="Phone"
                                edge="end"                                        
                            >
                            <PhoneIcon></PhoneIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>

                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                <FilledInput
                   onChange={(e) => setDob(e.target.value)}
                   value={dob}
                    id='dob'
                    type='date'
                                        
                >

                </FilledInput>
                <FormHelperText id="filled-dob-helper-text">Date of Birth</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '30%' }} variant="filled">
                    <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
                    <Input
                        accept="image/*"
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="upload image"
                                    edge="end"
                                    component="label"
                                    htmlFor="image-upload"
                                >
                                    <PhotoCamera />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="image-upload-helper-text">Select an image file</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '93%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-address">Address</InputLabel>
                <FilledInput
                   onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    id='address'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label="address"
                                edge="end"                                        
                            >
                            <LocationOnIcon></LocationOnIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >

                </FilledInput>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
              >
                Save
              </Button>
                </FormControl>
        </Box> 
    </Box>
  );
};

export default EditTeam;