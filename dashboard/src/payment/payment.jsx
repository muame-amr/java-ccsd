import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import './payment.css';
import GetData from '../data/getData';


const Payment = () => {
    const { productSlug } = useParams();
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('jwtToken');
    const username = localStorage.getItem('userName');
    const [products, setProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState(null);
    const API_BASE_URL = 'http://localhost:8082';

    useEffect(() => {
        // Fetch all products from the API
        fetch(`${API_BASE_URL}/api/products`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                // Filter product based on postSlug
                const product = data.find((item) => item.postSlug === productSlug);
                if (product) {
                    setFilteredProduct(product);
                    setAmount(product.price); // Assuming the product has a price field
                }
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, [productSlug, token]);

    

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const productData = await GetData.getProduct(productSlug);
    //             console.log(productData)
    //             setProduct(productData);
    //             setAmount(productData.price); // Assuming the product data has a price field
    //         } catch (error) {
    //             console.error('Error fetching product data:', error);
    //         }
    //     };

    //     fetchProduct();
    // }, [productSlug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle payment submission logic here
        console.log('Payment submitted', { amount, cardNumber, expiryDate, cvv });
        navigate("/");
    };

    return (        
        <div className="payment-container">
            {filteredProduct ? (
                <div className="product-details">
                   
                </div>
            ) : (
                <p>Loading product details...</p>
            )}

            {filteredProduct && (
                <div className="product-details">
                    <img src={`data:image/jpg;base64,${filteredProduct.imageStore}`} 
                        alt={filteredProduct.title}                      
                        className="img-fluid"
                        style={{
                        width: "300px",
                        height: "300px",
                        // objectFit: "cover",
                        borderRadius: "8px",
                        marginBottom: "10px",
                    }}/>
                    <h3>{filteredProduct.title}</h3>
                    <p>RM {filteredProduct.tag}</p>
                </div>
            )}
            <h2>Payment Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                    />
                </div>
               
                    <button type="submit">Submit Payment</button>
              
            </form>
        </div>
    );
};

export default Payment;