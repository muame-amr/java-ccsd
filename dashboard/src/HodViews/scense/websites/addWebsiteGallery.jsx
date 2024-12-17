import React, { useState, useEffect, useRef, Component } from 'react';
import { Box, useTheme, Button, DialogActions, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, Modal } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import SaveItemsAdmin from '../../saveItemAdmin';
import GetItemsAdmin from '../../getItemAdmin';
import Select from '@mui/material/Select';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

import CK from '../../../Editor/ck';


const AddWebsiteGallery = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [image, setImage] = useState(null);

    const [categories, setCategories] = useState([]); // to store the list of categories    
    const [postShortDescription, setPostShortDescription] = useState(null);
    const [tag, setTag] = useState(null);
    const [title, setTitle] = useState(null);
    const [postSlug, setPostSlug] = useState(null);
    const [status, setStatus] = useState(null);
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
    const [openAiImage, setOpenAiImage] = useState(false);
    const [place, setPlace] = useState(null);

    const functionOpenAiImage=() =>{
        setOpenAiImage(true);
    }
    const functionCloseAiImage=() =>{
        setOpenAiImage(false);
    }
    

    

    const editor = useRef(null)
    const [content, setContent] = useState(null);

    const handleChange = (event) => {
        setStatus(event.target.value);
      };
      

      const handleChangeplace = (event) => {
        setPlace(event.target.value);
      };
    

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleAddBlog = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
      
        try {
          const success = await SaveItemsAdmin.addGalleryAdmin(place, postShortDescription, tag, title, postSlug, content, status, date, image);
          
          if (success) {
            navigate("/website-components-admin");
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
        <Dialog open={openAiImage} fullWidth maxWidth="lg">
            <DialogTitle> AI Image Generator or Edit </DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>

                </Stack>
            </DialogContent>
            <DialogActions>
                <Button color='success' variant='contained'>Use Image</Button>
                <Button color='error' variant='contained' onClick={functionCloseAiImage}>Close</Button>
            </DialogActions>
        </Dialog>
        <Header title="Add Image" subtitle="Please Fill All the Fields" />
            
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleAddBlog}>
                <TextField
                onChange={(e) => setTitle(e.target.value)}
                label="Enter Image Title"
                id="title"
                sx={{ m: 1, width: '30.5%' }}
                variant="filled"
                />
                <FormControl sx={{ m: 1, width: '30.5%' }} variant="filled">
                    <FilledInput
                    onChange={(e) => setDate(e.target.value)}
                        id='date'
                        type='date'
                                            
                    >

                    </FilledInput>
                <FormHelperText id="filled-dob-helper-text">publish Date</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '15.5%' }} variant="filled">
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                        labelId="status"
                        id="status"
                        value={status}
                        label="status"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Draft</MenuItem>
                        <MenuItem value={1}>Publish</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: '60%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-address">Tags</InputLabel>
                <FilledInput
                   onChange={(e) => setTag(e.target.value)}
                    id='tag'
                    type='text'
                    endAdornment = {
                        <InputAdornment position='end'>
                            Use AI to Generate SEO Tags
                            <IconButton
                                aria-label="tag"
                                edge="end"                                        
                            >
                            <SmartToyOutlinedIcon></SmartToyOutlinedIcon>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                >
                </FilledInput>
                </FormControl>
                <FormControl sx={{ m: 1, width: '15.5%' }} variant="filled">
                    <InputLabel id="place">Text Place</InputLabel>
                    <Select
                        labelId="place"
                        id="place"
                        value={place}
                        label="place"
                        onChange={handleChangeplace}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '45%' }} variant="filled">
                    <Input
                        accept="image/*"
                        id="image-upload"
                        type="file"
                        htmlFor="image-upload"
                        onChange={handleImageChange}
                        endAdornment={
                            <InputAdornment position="end">
                                Use AI to Generate or Edit Image
                                <IconButton
                                    onClick={functionOpenAiImage}
                                    aria-label="upload image"
                                    edge="end"
                                    component="label"

                                >
                                    <SmartToyOutlinedIcon></SmartToyOutlinedIcon>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="image-upload-helper-text">Blog Header Image</FormHelperText>
                </FormControl>
      
                <Button
                type="submit"
                sx={{ m: 1, width: '46%', marginTop: '20px' }}
                color='success'
                variant="contained"
                
              >
                Save
              </Button>
    

        </Box> 
    </Box>
  );
};

export default AddWebsiteGallery;