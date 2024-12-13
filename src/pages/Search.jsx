import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchProducts = () => {
  const [products, setProducts] = useState([]); // Search results
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Handle search input and fetch products from the backend
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setProducts([]); // Reset products if the search query is empty
      return;
    }

    setLoading(true);
    setError(null); // Reset error state

    // Call the backend search API
    fetch(`/products/search?query=${encodeURIComponent(searchQuery)}`)
      console.log(`/products/search?query=${encodeURIComponent(searchQuery)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data); // Update search results
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div>
      {/* Header Section */}
      <header>
        <div id="header-container">
          <h1>Product Search</h1>
        </div>
      </header>

      {/* Search Bar Section */}
      <section id="search">
        <input
          type="text"
          id="searchBar"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" onClick={handleSearch}>
          Search
        </button>
      </section>

      {/* Search Results Section */}
      <section id="products">
        <h2>Search Results</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product">
                <Link to={`/product-details/${product._id}`}>
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found for "{searchQuery}".</p>
        )}
      </section>

      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 Online Retail Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SearchProducts;