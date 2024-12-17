//getItemAdmin.js
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082';

const GetItemsAdmin = {
  async getTeamDataAdmin() {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users`,

        {
          // request headers
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
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

  async getTeamDataAdminEdit(userId) {
    const token = await localStorage.getItem('jwtToken');

    
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users${userId}`,

        {
          // request headers
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      console.log(response.data.firstName)      
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

  async getClientDataAdmin() {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('username');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users`,
        {
          // request headers
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
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

    async getTeamDataAdminEdit(userId) {
    const token = await localStorage.getItem('jwtToken');

    
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/users${userId}`,

        {
          // request headers
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      console.log(response.data.firstName)      
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



export default GetItemsAdmin;
