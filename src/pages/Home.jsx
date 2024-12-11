import React, { useEffect, useState } from "react";
import '../styles/Home.css';
import Header from "../components/Header";

const Home = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header>
        {/* Simulate dynamic header injection by rendering a Header component */}
        <Header />
      </header>

      {/* Featured Products Section */}
      <section id="products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product">
                <a href={`/productDetails/${product._id}`}>
                </a>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 Online Retail Store. All rights reserved.</p>
      </footer>
    </div>
  );
};


export default Home;