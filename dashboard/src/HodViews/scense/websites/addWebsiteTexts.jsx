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


import Select from '@mui/material/Select';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';


import CK from '../../../Editor/ck';




const AddWebsiteText = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [image, setImage] = useState(null);


    const [place, setPlace] = useState(null);
    const [categories, setCategories] = useState([]); // to store the list of categories    
    const [postShortDescription, setPostShortDescription] = useState(null);
    const [tag, setTag] = useState(null);
    const [title, setTitle] = useState(null);
    const [postSlug, setPostSlug] = useState(null);
    const [status, setStatus] = useState(null);
    const [date, setDate] = useState(null);
    const navigate = useNavigate();
    const [openAiImage, setOpenAiImage] = useState(false);

   
    const handleChangeplace = (event) => {
        setPlace(event.target.value);
      };
   
    const editor = useRef(null)
    const [content, setContent] = useState(null);

    const handleChange = (event) => {
        setStatus(event.target.value);
      };
     

    const handleImageChange = (event) => {
        // const selectedImage = event.target.files[0];
        const selectedImage = event.target.value;
        setImage(selectedImage);
    };


    const handleAddBlog = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        try {
          const success = await SaveItemsAdmin.addWebsiteTextAdmin( postShortDescription, tag, title, postSlug, content, status, date, image, place);
         
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
        {/* <Dialog open={openAiImage} fullWidth maxWidth="lg">
            <DialogTitle> AI Image Generator or Edit </DialogTitle>
            <DialogContent>
                <Stack spacing={2} margin={2}>


                </Stack>
            </DialogContent>
            <DialogActions>
                <Button color='success' variant='contained'>Use Image</Button>
                <Button color='error' variant='contained' onClick={functionCloseAiImage}>Close</Button>
            </DialogActions>
        </Dialog> */}
        <Header title="Add Website Text for About" subtitle="Please Fill All the Fields" />
           
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleAddBlog} >
        
        <FormControl sx={{ m: 1, width: '93%' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-short-description">Enter About</InputLabel>
                <FilledInput
                   onChange={(e) => setPostShortDescription(e.target.value)}
                    id='short-description'
                    type='text'
                    multiline
                    rows={3}
                    endAdornment = {
                        <InputAdornment position='end'>
                           
                            
                        </InputAdornment>
                    }
                   
                >
                </FilledInput>
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

                <FormControl sx={{ m: 1, width: '15.5%' }} variant="filled">
                    <InputLabel id="place">Text Location</InputLabel>
                    <Select
                        labelId="place"
                        id="place"
                        value={place}
                        label="place"
                        onChange={handleChangeplace}
                    >
                        <MenuItem value={0}>About</MenuItem>

                    </Select>
                </FormControl>
                

                <TextField
                onChange={(e) => setTitle(e.target.value)}
                label="Why Choose Us (Point 1)"
                id="title"
                type='text'
                multiline
                rows={3}
                sx={{ m: 1, width: '60%' }}
                variant="filled"
                />

                <TextField
                onChange={(e) => setTag(e.target.value)}
                label="Why Choose Us (Point 2)"
                id="title"
                type='text'
                multiline
                rows={3}
                sx={{ m: 1, width: '60%' }}
                variant="filled"
                />
           
                <Button
                type="submit"
                sx={{ m: 1, width: '46%' }}
                color='success'
                variant="contained"
               
              >
                Save
              </Button>

        </Box>
    </Box>
  );
};


export default AddWebsiteText;

