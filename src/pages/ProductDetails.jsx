import React, { useEffect, useState } from 'react';

const ProductDetails = () => {
    const [productData, setProductData] = useState(null);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        // Fetch header
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-container').innerHTML = data;
            });

        // Fetch product details by ID (using URL params)
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        fetch(`/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                setProductData(product);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                document.getElementById('product-container').innerHTML = '<p>Product not found.</p>';
            });
    }, []);


    return (
        <div>
            <div id="header-container"></div>

            <section id="product-details">
                <h2>Product Details</h2>
                <div id="product-container">
                    {productData ? (
                        <>
                            <h3>{productData.name}</h3>
                            <img src={productData.imageURL} style={{ width: '400px', height: 'auto' }} alt={productData.name} />
                            <p>{productData.description}</p>
                            <p>Price: ${productData.price}</p>
                            <p>Available stock: {productData.stockQuantity}</p>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

            </section>

            <footer>
                <p>&copy; 2024 Online Retail Store. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ProductDetails;
