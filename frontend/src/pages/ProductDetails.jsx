import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currency.js';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function ensureCartId() {
  let id = localStorage.getItem('cartId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('cartId', id);
  }
  return id;
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => setProduct(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    setAdding(true);
    try {
      const cartId = ensureCartId();
      await fetch(`${API_BASE}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, productId: id, quantity: qty })
      });
      alert('Added to cart!');
    } catch (e) {
      alert('Error adding to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="container page">Loading...</div>;
  if (error) return <div className="container page error">{error}</div>;
  if (!product) return <div className="container page">Product not found</div>;

  // Get images array or fallback to single image
  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];
  const currentImage = images[selectedImage] || product.image_url;

  return (
    <div className="container page">
      <button className="btn btn-secondary" onClick={() => navigate('/products')}>← Back to Products</button>
      
      <div className="product-detail">
        {/* Image Gallery */}
        <div className="product-images">
          <div className="main-image">
            <img src={currentImage} alt={product.name} className="product-detail-img" />
          </div>
          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <div className="product-header">
            <h1>{product.name}</h1>
            {product.brand && <span className="brand">by {product.brand}</span>}
            {product.rating && (
              <div className="rating">
                <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span className="rating-text">({product.rating}) • {product.reviews_count} reviews</span>
              </div>
            )}
          </div>

          <div className="price-section">
            <div className="price-large">{formatCurrency(product.price)}</div>
            {product.stock_quantity && (
              <div className="stock-info">
                {product.stock_quantity > 0 ? (
                  <span className="in-stock">✓ In Stock ({product.stock_quantity} available)</span>
                ) : (
                  <span className="out-of-stock">✗ Out of Stock</span>
                )}
              </div>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="product-features">
              <h3>Key Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="add-to-cart-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input 
                id="quantity"
                type="number" 
                min="1" 
                max={product.stock_quantity || 99}
                value={qty} 
                onChange={(e) => setQty(Number(e.target.value))} 
                className="qty-input"
              />
            </div>
            <button 
              className="btn btn-primary btn-large" 
              onClick={addToCart} 
              disabled={adding || (product.stock_quantity && product.stock_quantity === 0)}
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>

          {product.category && (
            <div className="product-meta">
              <span><strong>Category:</strong> {product.category}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
