import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductList from './ProductList';
import { useCart } from '../context/CartContext';

function CategoryPage({ products }) {
  const { category } = useParams();
  const normalizedCategory = category?.toLowerCase() || '';
  const { addToCart } = useCart();

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === normalizedCategory
  );

  return (
    <div className="category-page">
      <div className="page-header">
        <h2 className="page-title">{category} Products</h2>
        <p className="category-subtitle">
          Browse the best {category} items curated for you.
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-category">
          <p>😕 No products found in this category.</p>
          <Link to="/" className="back-home-link">
            ← Back to all products
          </Link>
        </div>
      ) : (
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      )}
    </div>
  );
}

export default CategoryPage;
