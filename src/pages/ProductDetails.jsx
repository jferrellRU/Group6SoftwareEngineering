import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch the product details by ID
        const productResponse = await fetch(`/products/${id}`);
        if (!productResponse.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await productResponse.json();

        // Fetch the associated image if imageID exists
        if (productData.imageID) {
          try {
            const imageResponse = await fetch(`/images/${productData.imageID}`);
            if (!imageResponse.ok) {
              console.error(
                `Failed to fetch image for product ${productData._id}:`,
                imageResponse.statusText
              );
            } else {
              const imageData = await imageResponse.json();
              productData.imageUrl = imageData.image; // Add image URL to the product object
            }
          } catch (error) {
            console.error(
              `Error fetching image for product ${productData._id}:`,
              error
            );
          }
        }

        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found.");
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : product ? (
        <>
          {product.imageUrl && (
            <img
              src={product.imageUrl} // Base64 string or full URL for the image
              alt={product.name}
              className="product-detail-image"
            />
          )}
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stockQuantity}</p>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;