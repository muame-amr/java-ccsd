//saveItemAdmin.js

import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082';

const UpdateItemAdmin = {

    async getImageById(id){
        const token = await localStorage.getItem('jwtToken');
        const username = await localStorage.getItem('userName');

        try{
            const response = await axios.get(
                `${API_BASE_URL}/api/WebsiteImage/${id}`,
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
        }catch(error){
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

  async updateWebsiteImageAdmin(id, place, postShortDescription, tag, title, postSlug, content, status, date, image) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const requestBody = {
        author: username,
        postShortDescription: postShortDescription,
        tag: tag,
        place: place,
        title: title,
        postSlug: postSlug,
        content: content,
        status: status,
        date: date,
        image: image
      };

      const response = await axios.put(
        `${API_BASE_URL}/api/WebsiteImage/${id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
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

export default UpdateItemAdmin;
