//saveItemAdmin.js

import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082';

// firstName, lastName, phoneNumber, username, dob, address, role, email, password, profpic --mine

//email, password, firstName, lastName, phone, address, role, userName, dob, image --sir
// firstName, lastName, phone, userName, dob, address, role, email, password, image --tally 

const SaveItemsAdmin = {
  async addTeamSave(email, password, firstName, lastName, phone, address, role, userName, dob, image) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      // formData.append('first_name', firstName);
      // formData.append('last_name', lastName);
      // formData.append('phone', phone);
      // formData.append('username', userName);
      // formData.append('dob', dob);
      // formData.append('address', address);
      // formData.append('role', role);
      // formData.append('email', email);
      // formData.append('password', password);
      
      // if (image) {
      //   formData.append('image', image); // Assuming 'image' is the key on the server to handle file uploads
      // }

      formData.append('firstName', firstName); 
      formData.append('lastName', lastName);
      formData.append('phoneNumber', phone);
      formData.append('username', userName);
      formData.append('dob', dob);
      formData.append('address', address);
      formData.append('role', role);
      formData.append('email', email);
      formData.append('password', password);

      if (image) {
        formData.append('profPic', image); // Match the backend field name
      }


      const response = await axios.post(
        `${API_BASE_URL}/api/users`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw error;
    }
  },


                        //place, postShortDescription, tag, title, postSlug, content, status, date, image
  async addProductAdmin( postShortDescription, tag, title, postSlug, content, status, date, image, place) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('author', username);
      formData.append('postShortDescription', postShortDescription);
      formData.append('tag', tag);
      formData.append('place', place);
      formData.append('title', title);
      formData.append('postSlug', postSlug);
      formData.append('content', content);
      formData.append('status', status);
      formData.append('date', date);

      if (image) {
        formData.append('image', image); // Assuming 'image' is the key on the server to handle file uploads
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw error;
    }
  },
  async addGalleryAdmin( place, postShortDescription, tag, title, postSlug, content, status, date, image) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('author', username);
      formData.append('postShortDescription', postShortDescription);
      formData.append('tag', tag);
      formData.append('place', place);
      formData.append('title', title);
      formData.append('postSlug', postSlug);
      formData.append('content', content);
      formData.append('status', status);
      formData.append('date', date);

      if (image) {
        formData.append('image', image); // Assuming 'image' is the key on the server to handle file uploads
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/Gallery`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw error;
    }
  },
  async addWebsiteImageAdmin( place, postShortDescription, tag, title, postSlug, content, status, date, image) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('author', username);
      formData.append('postShortDescription', postShortDescription);
      formData.append('tag', tag);
      formData.append('place', place);
      formData.append('title', title);
      formData.append('postSlug', postSlug);
      formData.append('content', content);
      formData.append('status', status);
      formData.append('date', date);

      if (image) {
        formData.append('image', image); // Assuming 'image' is the key on the server to handle file uploads
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/WebsiteImage`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);  
      }
      throw error;
    }
  },
  async addWebsiteTextAdmin( postShortDescription, tag, title, postSlug, content, status, date, image, place) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('author', username);
      formData.append('postShortDescription', postShortDescription);
      formData.append('tag', tag);
      formData.append('place', place);
      formData.append('title', title);
      formData.append('postSlug', postSlug);
      formData.append('content', content);
      formData.append('status', status);
      formData.append('date', date);

      if (image) {
        formData.append('image', image); // Assuming 'image' is the key on the server to handle file uploads
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/website-texts`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      throw error;
    }
  },

  
};

export default SaveItemsAdmin;
