import React, { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082';

export const Gallery = () => {
  const token = localStorage.getItem('jwtToken');
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    // Fetch all gallery from the API
    axios.get(`${API_BASE_URL}/api/Gallery`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setGallery(response.data);
      })
      .catch(error => console.error('Error fetching gallery', error));
  }, [token]);

  if (!gallery.length) {
    return <div>Loading...</div>; // Loading State
  }

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
            "Browse our gallery to see our IT services"
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {gallery.length > 0 ? (
              gallery.map((d, i) => (
                <div key={`${d.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                  {d.image && (
                    <img
                      src={`data:image/jpg;base64,${d.image}`}
                      alt={d.title}
                      className="img-fluid"
                      style={{ width: '300px', height: '250px' }}
                    />
                  )}
                  <h3>{d.title}</h3>
                  <p>Date: <span>{d.date}</span></p>
                  <p>Status: <span>{d.status}</span></p>
                  <p className="tag">Tag: <span>{d.tag}</span></p>
                </div>
              ))
            ) : (
              <p>404 not found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
