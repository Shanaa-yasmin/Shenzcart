import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.js';
import { formatCurrency } from '../utils/currency.js';
import './Checkout.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: {} });
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'card', or 'upi'
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);
  const [showUpiForm, setShowUpiForm] = useState(false);

  const cartId = localStorage.getItem('cartId');

  useEffect(() => {
    if (!cartId) {
      navigate('/cart');
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
  }, [cartId, navigate]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setShowCardForm(method === 'card');
    setShowUpiForm(method === 'upi');
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCardDetails = () => {
    // Basic validation - in a real app, use a proper validation library
    if (!cardDetails.number || cardDetails.replace(/\s/g, '').length < 15) {
      return 'Please enter a valid card number';
    }
    if (!cardDetails.expiry || !/\d{2}\/\d{2}/.test(cardDetails.expiry)) {
      return 'Please enter a valid expiry date (MM/YY)';
    }
    if (!cardDetails.cvc || cardDetails.cvc.length < 3) {
      return 'Please enter a valid CVC';
    }
    if (!cardDetails.name) {
      return 'Please enter the name on card';
    }
    return null;
  };

  const validateUpiId = () => {
    // UPI ID validation - basic pattern matching
    const upiPattern = /^[a-zA-Z0-9\.\-_]{2,49}@[a-zA-Z]{2,}$/;
    if (!upiId) {
      return 'Please enter your UPI ID';
    }
    if (!upiPattern.test(upiId)) {
      return 'Please enter a valid UPI ID (e.g., name@upi)';
    }
    return null;
  };

  const processPayment = async () => {
    if (paymentMethod === 'card') {
      const validationError = validateCardDetails();
      if (validationError) {
        alert(validationError);
        return false;
      }
      
      // In a real app, you would integrate with a payment processor here
      // This is just a simulation
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulate successful payment 90% of the time
          const success = Math.random() < 0.9;
          if (!success) {
            alert('Payment failed. Please try again or use a different payment method.');
          }
          resolve(success);
        }, 1500);
      });
    } else if (paymentMethod === 'upi') {
      const validationError = validateUpiId();
      if (validationError) {
        alert(validationError);
        return false;
      }
      
      // Simulate UPI payment processing
      return new Promise((resolve) => {
        // In a real app, you would integrate with a UPI payment gateway here
        // This is just a simulation
        setTimeout(() => {
          // Simulate successful payment 95% of the time (UPI payments are generally reliable)
          const success = Math.random() < 0.95;
          if (!success) {
            alert('UPI payment failed. Please try again or use a different payment method.');
          } else {
            alert(`Payment request sent to ${upiId}. Please complete the payment in your UPI app.`);
          }
          resolve(success);
        }, 2000);
      });
    }
    // For COD, no payment processing needed
    return true;
  };

  const confirmOrder = async () => {
    setProcessing(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please log in to place an order');
        navigate('/login');
        return;
      }

      // Process payment
      const paymentSuccess = await processPayment();
      if (!paymentSuccess) {
        setProcessing(false);
        return;
      }

      // Create order with payment method
      const orderData = {
        userId: user.id,
        items: cart.items,
        total: total,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid'
      };

      const response = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      // Clear the cart
      await fetch(`${API_BASE}/api/cart/clear`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId })
      });
      
      // Clear the cart from local storage to force a refresh
      localStorage.removeItem('cartId');
      
      // Navigate to orders with a timestamp to force a refresh
      navigate('/orders?refresh=' + new Date().getTime());
    } catch (e) {
      console.error('Order error:', e);
      alert(`Error processing order: ${e.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const cartItems = Object.entries(cart.items || {});
  const total = cartItems.reduce((sum, [productId, qty]) => {
    const product = products[productId];
    return sum + (product ? Number(product.price) * qty : 0);
  }, 0);

  if (loading) return <div className="container page">Loading...</div>;
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container page checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="payment-method">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => handlePaymentMethodChange('cod')}
                />
                <span>Cash on Delivery</span>
              </label>
              
              <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'card'}
                  onChange={() => handlePaymentMethodChange('card')}
                />
                <span>Credit/Debit Card</span>
              </label>
              
              <label className={`payment-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'upi'}
                  onChange={() => handlePaymentMethodChange('upi')}
                />
                <span>UPI Payment</span>
              </label>
            </div>

            {showCardForm && (
              <div className="card-details">
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="number"
                    value={cardDetails.number}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry (MM/YY)</label>
                    <input
                      type="text"
                      name="expiry"
                      value={cardDetails.expiry}
                      onChange={handleCardInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      value={cardDetails.cvc}
                      onChange={handleCardInputChange}
                      placeholder="CVC"
                      maxLength="4"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Name on Card</label>
                  <input
                    type="text"
                    name="name"
                    value={cardDetails.name}
                    onChange={handleCardInputChange}
                    placeholder="Full Name"
                  />
                </div>
              </div>
            )}

            {showUpiForm && (
              <div className="upi-details">
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                  />
                  <p className="hint-text">e.g., yourname@upi, phonenumber@ybl, etc.</p>
                </div>
                <div className="upiapps">
                  <p className="upi-apps-label">Popular UPI Apps:</p>
                  <div className="upi-apps">
                    <div className="upi-app">
                      <img src="https://www.gstatic.com/tez/tez-og-image.png" alt="Google Pay" />
                      <span>Google Pay</span>
                    </div>
                    <div className="upi-app">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" alt="PhonePe" />
                      <span>PhonePe</span>
                    </div>
                    <div className="upi-app">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Paytm_Logo_2022.svg/1200px-Paytm_Logo_2022.svg.png" alt="Paytm" />
                      <span>Paytm</span>
                    </div>
                    <div className="upi-app">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Bhim_logo.svg/1200px-Bhim_logo.png" alt="BHIM" />
                      <span>BHIM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="order-total">
            <h3>Order Total</h3>
            <div className="total-amount">{formatCurrency(total)}</div>
            {paymentMethod === 'cod' && (
              <div className="cod-notice">
                Pay with cash upon delivery
              </div>
            )}
          </div>
          {cartItems.map(([productId, qty]) => {
            const product = products[productId];
            if (!product) return null;
            return (
              <div key={productId} className="checkout-item">
                <span>{product.name} × {qty}</span>
                <span>{formatCurrency(Number(product.price) * qty)}</span>
              </div>
            );
          })}
          <div className="checkout-total">
            <strong>Total: {formatCurrency(total)}</strong>
          </div>
        </div>
        <div className="checkout-actions">
          <button 
            className="btn btn-primary" 
            onClick={confirmOrder}
            disabled={processing}
          >
            {processing 
              ? 'Processing...' 
              : paymentMethod === 'cod' 
                ? 'Place Order (Cash on Delivery)'
                : 'Pay & Place Order'}
          </button>
          <button 
            className="btn btn-secondary btn-block" 
            onClick={() => navigate('/cart')}
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
