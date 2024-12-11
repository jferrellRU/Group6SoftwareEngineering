import React, { useState } from 'react';
import addproduct from '../styles/addproduct.css';

const App = () => {
    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productPrice: '',
        stockQuantity: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64 = await convertToBase64(file);
            setImageFile(base64);
        } catch (error) {
            setMessage('Error processing image. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            // Debug log to see form data
            console.log('Form Data:', {
                name: formData.productName,
                description: formData.productDescription,
                price: formData.productPrice,
                stockQuantity: formData.stockQuantity
            });
    
            // Validate form data first
            if (!formData.productName || !formData.productDescription || !formData.productPrice) {
                throw new Error('Please fill in all required fields');
            }
    
            // Upload image first if exists
            let imageId = null;
            if (imageFile) {
                console.log("Uploading image...");
                const imageResponse = await fetch('/images', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        image: imageFile
                    })
                });
    
                if (!imageResponse.ok) {
                    const errorData = await imageResponse.json();
                    throw new Error(`Image upload failed: ${errorData.message}`);
                }
    
                const imageData = await imageResponse.json();
                console.log('Image Response:', imageData); // Debug log
    
                if (!imageData.image) {
                    throw new Error('No image data received from server');
                }
                imageId = imageData.image._id;
            }
    
            // Create the product data object
            const productData = {
                name: formData.productName.trim(),
                description: formData.productDescription.trim(),
                price: Number(formData.productPrice),  // Explicit conversion
                stockQuantity: parseInt(formData.stockQuantity) || 0,
                ...(imageId && { image: imageId })
            };
    
            console.log('Product Data to be sent:', productData); // Debug log
    
            const productResponse = await fetch('/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
    
            console.log('Response status:', productResponse.status); // Debug log
    
            if (!productResponse.ok) {
                const errorData = await productResponse.json();
                console.log('Error response:', errorData); // Debug log
                throw new Error(errorData.message || 'Failed to create product');
            }
    
            const result = await productResponse.json();
            console.log('Server response:', result);
    
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
            console.error('Detailed error:', error);
            setMessage(`Failed to add product: ${error.message}`);
        } finally {
            setIsLoading(false);
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
                
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding Product...' : 'Add Product'}
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