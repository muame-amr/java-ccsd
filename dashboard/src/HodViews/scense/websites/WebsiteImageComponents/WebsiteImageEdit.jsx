import React, { useState, useEffect, useRef, Component } from 'react';
import { Box, useTheme, Button, DialogActions, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, Modal } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import { tokens } from "../../../../base/theme";
import Header from "../../../../components/Header";
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import SaveItemsAdmin from '../../../saveItemAdmin';
import UpdateItemAdmin from '../../../updateItemAdmin';

import Select from '@mui/material/Select';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

const WebsiteImageEdit = () => {
    const { imgId } = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);

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
        if (selectedImage) {
            const reader = new FileReader();

            // Generate Base64 string
            reader.onload = () => {
                var result = reader.result;
                setImageBase64(result); // Base64 string is stored here
                setImage(result.split(',')[1]);
                
            };
            // Read the file as a Data URL (Base64)
            reader.readAsDataURL(selectedImage);
        }
        console.log(selectedImage);
        //setImage(selectedImage);
        
    };

    const handleAddBlog = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
      
        try {

          const success = await UpdateItemAdmin.updateWebsiteImageAdmin(imgId, place, postShortDescription, tag, title, postSlug, content, status, date, image);
          
          if (success) {
            window.location.href="/website-image-admin"
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

    useEffect(() =>{
        console.log("Started");
        console.log(imgId);
        console.log();
        const fetchData = async() =>{
            try{
               const response =  await UpdateItemAdmin.getImageById(imgId);
               console.log(response);
               if(response){
                    setImageBase64('data:image/png;base64,'+response.image);
                    setImage(response.image);
                    setCategories(response.category);
                    setPostShortDescription(response.postShortDescription);
                    setTag(response.tag);
                    setTitle(response.title);
                    setPostSlug(response.postSlug);
                    setStatus(response.status);
                    setDate(response.date);
                    setPlace(response.place);
               }
            }catch(error){
                // Handle network or other errors
                console.error("Saving Error:", error);
                alert("An error occurred while saving.");
            }
        };
        fetchData();
    }, []); //on component mounted

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
        <Header title="Edit Image" subtitle="Please Fill All the Fields" />
            
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleAddBlog}>
                <TextField
                onChange={(e) => setTitle(e.target.value)}
                label="Enter Image Title"
                id="title"
                sx={{ m: 1, width: '30.5%' }}
                variant="filled"
                value={title}
                />
                <FormControl sx={{ m: 1, width: '30.5%' }} variant="filled">
                    <FilledInput
                    onChange={(e) => setDate(e.target.value)}
                        id='date'
                        type='date'
                        value={date}
                                            
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
                    value={tag}
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
        <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img
                src={imageBase64}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
            />
        </Box>
    </Box>
  );
};

export default WebsiteImageEdit;