import React from "react";
import "./WebsiteImageListStyle.css";
import DeleteItemAdmin from '../../../deleteItemAdmin';
import { useNavigate } from 'react-router-dom';



const WebsiteImageList = () => {
    const navigate = useNavigate();

    const handleDeleteImage = async ()=>{
        var confirm = window.confirm('Are you sure to delete this image?');
        if(confirm){
            try{
                var responseOk = await DeleteItemAdmin.deleteWebsiteImage(12);
                if(responseOk){
                    alert('Delete image successful!');
                    navigate('/website-image-admin');
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
    <div className="list">
      <div className="list__imgContainer">
        <img
          src="https://via.placeholder.com/50"
          alt="Joe Belfiore"
          className="list__image"
        />
      </div>
      <div className="list__details">
        <h3 className="list__title">Joe Belfiore</h3>
        <p className="list__date">In a world far away</p>
      </div>
      <div className="list__actions">
        <button className="list__button edit-button">
            <a href="/website-image-admin-edit/{id}" style={{'color': 'white'}}>Edit</a>
        </button>
        <button 
            className="list__button delete-button"
            onClick={handleDeleteImage}>
            Delete
        </button>
      </div>
    </div>
  );
};

export default WebsiteImageList;
