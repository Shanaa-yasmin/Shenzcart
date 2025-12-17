import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/currency.js';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function Cart() {
  const [cart, setCart] = useState({ items: {} });
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const cartId = localStorage.getItem('cartId');

  useEffect(() => {
    if (!cartId) {
      setLoading(false);
      return;
    }

    Promise.all([
      fetch(`${API_BASE}/api/cart?cartId=${cartId}`).then(r => r.json()),
      fetch(`${API_BASE}/api/products`).then(r => r.json())
    ])
    .then(([cartData, productsData]) => {
      setCart(cartData);
      const productsMap = {};
      productsData.forEach(p => productsMap[p.id] = p);
      setProducts(productsMap);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [cartId]);

  const removeItem = async (productId) => {
    await fetch(`${API_BASE}/api/cart/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId, productId })
    });
    setCart(prev => {
      const newItems = { ...prev.items };
      delete newItems[productId];
      return { items: newItems };
    });
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    
    try {
      await fetch(`${API_BASE}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, productId, quantity: newQuantity - (cart.items[productId] || 0) })
      });
      
      setCart(prev => ({
        items: { ...prev.items, [productId]: newQuantity }
      }));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const cartItems = Object.entries(cart.items || {});
  const total = cartItems.reduce((sum, [productId, qty]) => {
    const product = products[productId];
    return sum + (product ? Number(product.price) * qty : 0);
  }, 0);

  if (loading) return <div className="container page">Loading...</div>;

  return (
    <div className="container page">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(([productId, qty]) => {
              const product = products[productId];
              if (!product) return null;
              return (
                <div key={productId} className="cart-item">
                  <img src={product.image_url} alt={product.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <p className="product-description-small">{product.description}</p>
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn-small" 
                        onClick={() => updateQuantity(productId, qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-display-small">{qty}</span>
                      <button 
                        className="qty-btn-small" 
                        onClick={() => updateQuantity(productId, qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <div className="item-total">{formatCurrency(Number(product.price) * qty)}</div>
                    <button 
                      className="btn-trash" 
                      onClick={() => removeItem(productId)}
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="total">Total: {formatCurrency(total)}</div>
            <Link to="/checkout" className="btn btn-primary btn-block">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
}
