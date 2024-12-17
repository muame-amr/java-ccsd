import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8082";

export const Features = () => {
  const token = localStorage.getItem("jwtToken");

  // State for Website Images
  const [websiteImages, setWebsiteImages] = useState([]);
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch Website Images
    const fetchWebsiteImages = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/WebsiteImage`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setWebsiteImages(response.data); // Set images data
      } catch (error) {
        console.error("Error fetching website images:", error);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };

    fetchWebsiteImages();
  }, [token]);

  // Render Loading State
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="features" className="text-center">
      <div className="container">
        {/* Section Title */}
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Features</h2>
        </div>

        {/* Display Website Images */}
        <div className="row">
          {websiteImages.length > 0 ? (
            websiteImages.map((d, i) => (
              <div key={`image-${i}`} className="col-md-4">
                {d.image && (
                  <img
                    src={`data:image/jpeg;base64,${d.image}`} // Base64 image
                    alt={d.title}
                    className="img-fluid"
                    style={{
                      width: "300px",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
                <h3>{d.title}</h3>
                <p><bold><span>{d.tag}</span></bold></p>
              </div>
            ))
          ) : (
            <p>No images found</p>
          )}
        </div>
      </div>
    </div>
  );
};
