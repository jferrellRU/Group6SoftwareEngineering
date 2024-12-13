import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const SearchProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search function
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/products/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Debounce search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, handleSearch]);

  return (
    <div>
      <header>
        <div id="header-container">
          <h1>Product Search</h1>
        </div>
      </header>

      <section id="search">
        <input
          type="text"
          id="searchBar"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section id="products">
        <h2>Search Results</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
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
        ) : searchQuery ? (
          <p>No products found for "{searchQuery}".</p>
        ) : null}
      </section>

      <footer>
        <p>&copy; 2024 Online Retail Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SearchProducts;