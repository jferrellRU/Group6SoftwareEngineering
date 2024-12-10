import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        stockQuantity: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const base64 = await convertToBase64(file);
        setImageFile(base64);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!imageFile) {
            setMessage("Please upload an image before submitting!");
            return;
        }
    
        try {
            // Upload the image
            const imageResponse = await axios.post('/images', {
                image: imageFile
            });

            if (!imageResponse.data.image) {
                throw new Error('No image data received from server');
            }

            // Create the product data object with the correct field names
            const productData = {
                name: formData.productName,
                description: formData.productDescription,
                price: parseFloat(formData.productPrice),
                stockQuantity: parseInt(formData.stockQuantity) || 0,
                image: imageResponse.data.image._id
            };

            console.log('Submitting product data:', productData);

            const productResponse = await axios.post('/products', productData);
            console.log('Server response:', productResponse.data);
    
            setMessage('Product added successfully!');
            
            // Clear form
            setFormData({
                productName: '',
                productDescription: '',
                productPrice: '',
                stockQuantity: ''
            });
            setImageFile(null);
            
            // Reset file input
            const fileInput = document.getElementById('productImageFile');
            if (fileInput) fileInput.value = '';
            
        } catch (error) {
            console.error('Error submitting data:', error);
            const errorMessage = error.response?.data?.message || error.message;
            setMessage(`Failed to add product: ${errorMessage}`);
        }
    };

    return (
        <div className="product-form-container">
            <h1 className="form-title">Add New Product</h1>
            {message && (
                <div className={`message ${
                    message.includes('Failed') || message.includes('Please upload') 
                        ? 'message-error' 
                        : 'message-success'
                }`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        placeholder="Enter product name"
                    />
                </div>
                
                <div>
                    <label htmlFor="productDescription">Product Description</label>
                    <textarea
                        id="productDescription"
                        value={formData.productDescription}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        placeholder="Enter product description"
                    ></textarea>
                </div>
                
                <div>
                    <label htmlFor="productPrice">Product Price ($)</label>
                    <input
                        type="number"
                        id="productPrice"
                        step="0.01"
                        value={formData.productPrice}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        placeholder="0.00"
                    />
                </div>
                
                <div>
                    <label htmlFor="stockQuantity">Stock Quantity</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="0"
                    />
                </div>
                
                <div>
                    <label htmlFor="productImageFile">Product Image</label>
                    <input
                        type="file"
                        id="productImageFile"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="form-control"
                    />
                </div>
                
                {imageFile && (
                    <img
                        src={imageFile}
                        alt="Uploaded Preview"
                        className="image-preview"
                    />
                )}
                
                <button type="submit" className="submit-button">
                    Add Product
                </button>
            </form>
        </div>
    );
};

// Helper function to convert file to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export default App;