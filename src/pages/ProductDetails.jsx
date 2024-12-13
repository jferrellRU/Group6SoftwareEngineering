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

  // Function to handle "Add to Cart" action
  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:8000/orders/add-product-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: "Anonymous", // Replace with actual user data if available
          productID: product._id,
          productName: product.name,
          quantity: 1, // Default quantity or user-selected quantity
          total_price: product.price * 1, // Assuming quantity = 1
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const newOrder = await response.json();
      console.log("Product added to cart:", newOrder);
      alert(`${product.name} has been added to your cart.`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

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
          <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;