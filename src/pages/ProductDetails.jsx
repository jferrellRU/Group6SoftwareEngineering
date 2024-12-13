import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";

const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const userId = "64b6f73df1a2c5f8f87c9b4e"; // Replace with the logged-in user's ID from your auth system
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // State for reviews
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

    const fetchReviews = async () => {
      try {
        // Fetch reviews for the product
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

      {/* Add Review Component */}
      <AddReview productId={id} userId={userId} />

      {/* Display Reviews */}
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