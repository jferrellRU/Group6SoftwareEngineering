import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details by ID
    fetch(`/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Product not found.");
      });
  }, [id]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : product ? (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;