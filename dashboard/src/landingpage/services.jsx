import React , { useEffect, useState }from "react";


import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082';

export const Services = () => {
  const token = localStorage.getItem('jwtToken');
  const username = localStorage.getItem('userName');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the API
    fetch( `${API_BASE_URL}/api/products`,

      {
        // request headers
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }) // Your backend API URL
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  if (!products) {
    return <div>Loading...</div>;  // Loading state
  }
  
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
        </div>
        <div className="row">
           {/* //GET DATA FROM DB */}
           {/* original: props.data */}
          {products.length > 0
              //props.data
            ? products.map((product, index) => (
                <div key={`${product.name}-${index}`} className="col-md-4">
                  {" "}
                  {/* <i className={product.icon}></i> */}
                  <div className="service-desc">
                  {product.imageStore && (
                    <img
                      src={`data:image/jpeg;base64,${product.imageStore}`} // Displaying image
                      alt={product.title}
                      className="img-fluid"
                      style={{ width: '350px', height: '300px' }}
                    />

                  )}
                    <h3>{product.title}</h3>
                    <h4>RM{product.tag}</h4>
                    <p>{product.postShortDescription}</p>
                    <a href={`payment/${product.postSlug}`}>
                      <button
                        className="btn btn-custom"
                      >Buy Now
                      </button>
                    </a>
                    <div className="service-desc">
                  {/* Display Image */}
                  {/* {product.imageStore && (
                    <img
                      src={`data:image/jpeg;base64,${product.imageStore}`} // Displaying image
                      alt={product.title}
                      className="img-fluid"
                    />
                  )}
                  <h3>{product.title}</h3>
                  <h4>{product.tag}</h4>
                  <p>{product.postShortDescription}</p>
                  <p>{product.place}</p>
                  <p>{product.dateProduct}</p>
                  <p>{product.status}</p> */}
                  {/* Add any other fields you need */}
                </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div>
      </div>
    </div>
  );
};
