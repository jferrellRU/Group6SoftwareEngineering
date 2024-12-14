import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
import Header from "../components/Header";
import { UserContext } from "../UserContext";

const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const { user } = useContext(UserContext); // Access user from context
  const userId = user?._id || "64b6f73df1a2c5f8f87c9b4e"; // Use user ID if available, fallback to "Anonymous"
  const userName = user?.name || "guest";
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await fetch(`/products/${id}`);
        if (!productResponse.ok) {
          throw new Error("Failed to fetch product details");
        }
        const productData = await productResponse.json();

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
              productData.imageUrl = imageData.image;
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

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await fetch(`/reviews/product/${id}`);
        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Unable to load reviews.");
      }
    };

    fetchProductDetails();
    fetchReviews();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:8000/orders/add-product-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: userName,
          productID: product._id,
          productName: product.name,
          quantity: 1,
          total_price: product.price * 1,
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
      <header>
        <Header />
      </header>
      {error ? (
        <p>{error}</p>
      ) : product ? (
        <>
          {product.imageUrl && (
            <img
              src={product.imageUrl}
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

      <AddReview productId={id} userId={userId} />

      <h2>Customer Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="review">
            <h3>{review.userId}</h3>
            <p>Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review this product!</p>
      )}
    </div>
  );
};

export default ProductDetails;