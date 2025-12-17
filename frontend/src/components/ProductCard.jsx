import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currency.js';

export default function ProductCard({ product }) {
  return (
    <CardInner product={product} />
  );
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function ensureCartId() {
  let id = localStorage.getItem('cartId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('cartId', id);
  }
  return id;
}

function CardInner({ product }) {
  const navigate = useNavigate();

  const goToDetails = () => navigate(`/product/${product.id}`);

  const addToCart = async (e) => {
    e.stopPropagation();
    try {
      const cartId = ensureCartId();
      await fetch(`${API_BASE}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, productId: product.id, quantity: 1 })
      });
      alert('Added to cart!');
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="card clickable" onClick={goToDetails} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') goToDetails(); }}>
      <img src={product.image_url} alt={product.name} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-text">{product.description?.slice(0, 80) || ''}</p>
        <div className="card-footer">
          <span className="price">{formatCurrency(product.price)}</span>
          <button className="btn btn-primary" onClick={addToCart} aria-label={`Add ${product.name} to cart`}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
