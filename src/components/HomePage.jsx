import React from 'react';
import ProductList from './ProductList';
import { useCart } from '../context/CartContext';

function HomePage({ products, searchTerm }) {
  const { addToCart } = useCart();
  const searchTermLower = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTermLower)
  );

  return (
    <div className="home-page">
      <div className="page-header">
        <h2 className="page-title">All Products</h2>
        {searchTerm && (
          <p className="search-results">
            Found {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      ) : (
        <div className="no-results">
          <p>No products found.</p>
          {searchTerm && <p>Try another search term or browse a different category.</p>}
        </div>
      )}
    </div>
  );
}

export default HomePage;
