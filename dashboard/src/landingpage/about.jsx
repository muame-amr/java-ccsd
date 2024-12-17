import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8082";

export const About = () => {
  const token = localStorage.getItem("jwtToken");
  const username = localStorage.getItem("userName");
  const [WebsiteTexts, setPostShortDescription] = useState([]);

  useEffect(() => {
    // Fetch all text from the API
    fetch(`${API_BASE_URL}/api/website-texts`, {
      // Request headers
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPostShortDescription(data);
      })
      .catch((error) => console.error("Error fetching website texts:", error));
  }, []);

  if (!WebsiteTexts || WebsiteTexts.length === 0) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src="img/about.jpg" className="img-responsive" alt="" />
          </div>

          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              {/* Render data from API */}
              {WebsiteTexts.map((websiteText, index) => (
                <div key={`${websiteText.name}-${index}`} className="col-md-12">
                  <p>{websiteText.postShortDescription}</p>

                </div>
              ))}
              <h3>Why Choose Us?</h3>
              {WebsiteTexts.map((websiteText, index) => (
                <div key={`choose-${websiteText.name}-${index}`} className="col-md-12">
                  <p>{websiteText.title}</p>
                  <p>{websiteText.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
