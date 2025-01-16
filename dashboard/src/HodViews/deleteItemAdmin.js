import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082';

const DeleteItemAdmin = {
    
    async deleteWebsiteImage(id){
        const token = await localStorage.getItem('jwtToken');
        const username = await localStorage.getItem('userName');
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/api/WebsiteImage/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            if(response.status === 200){
                return true;
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
    }
}

export default DeleteItemAdmin;