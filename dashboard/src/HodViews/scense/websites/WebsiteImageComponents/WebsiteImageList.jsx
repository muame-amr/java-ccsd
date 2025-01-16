import React, { useEffect, useState } from "react";
import "./WebsiteImageListStyle.css";
import DeleteItemAdmin from '../../../deleteItemAdmin';
import { useNavigate } from 'react-router-dom';

const WebsiteImageList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/WebsiteImage'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const handleDeleteImage = async (id)=>{
      var confirm = window.confirm('Are you sure to delete this image?');
      if(confirm){
          try{
              var responseOk = await DeleteItemAdmin.deleteWebsiteImage(id);
              if(responseOk){
                  alert('Delete image successful!');
                  window.location.reload();
              }else{
                  alert('Failed to perform operation');
              }
          }catch(error){
              alert("Failed to delete image");
          }
          
      }
      console.log(confirm);
    }


    
  return (
    <div>
      {items.map((item) => (
      <div className="list" key={ item.id }>
        <div className="list__imgContainer">
        <img
            src={`data:image/jpeg;base64,${item.image}`}
            alt={item.title}
            width="70px"
            height="70px"
            className="list__image" />
        </div>
        <div className="list__details">
          <h3 className="list__title">{ item.title }</h3>
          <p className="list__date">{ item.date }</p>
        </div>
        <div className="list__actions">
          <button className="list__button edit-button">
              <a href={`/website-image-admin-edit/${item.id}`} style={{'color': 'white'}}>Edit</a>
          </button>
          <button 
              className="list__button delete-button"
              onClick={ () => handleDeleteImage(item.id) }>
              Delete
          </button>
        </div>
      </div>
      ))}
    </div>
  );
};

export default WebsiteImageList;
