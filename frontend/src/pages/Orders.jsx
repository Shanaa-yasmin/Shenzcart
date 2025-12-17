import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.js';
import { formatCurrency } from '../utils/currency.js';
import './Orders.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const location = useLocation();

  const fetchOrders = useCallback(async (userId, forceRefresh = false) => {
    try {
      setLoading(true);
      const url = new URL(`${API_BASE}/api/orders`);
      url.searchParams.append('userId', userId);
      if (forceRefresh) {
        url.searchParams.append('_', new Date().getTime());
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data);
        setError('');
      } else {
        throw new Error(data.error || 'Failed to fetch orders');
      }
      return data;
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'Failed to fetch orders. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          const searchParams = new URLSearchParams(location.search);
          await fetchOrders(user.id, searchParams.has('refresh'));
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in getUser:', error);
        setError('Failed to load user data. Please try again.');
        setLoading(false);
      }
    };

    getUser();
  }, [location.search, fetchOrders]);


  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel order');
      }

      // Refresh orders after successful cancellation
      if (user) {
        await fetchOrders(user.id);
      }
      
      alert('Order cancelled successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert(error.message || 'Failed to cancel order');
    }
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDeliveryDate = (dateString) => {
    if (!dateString) return 'Calculating...';
    
    const options = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    };
    
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  };

  const renderTabs = () => (
    <div className="tabs">
      <button className="tab active">
        My Orders
      </button>
    </div>
  );

  const renderOrders = () => (
    <div className="orders">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <div className="order-info">
              <h3>Order #{order.id.slice(-8)}</h3>
              <p className="order-date">{formatDate(order.created_at)}</p>
            </div>
            <div className="order-status">
              <div className="order-status-row">
                <div>
                  <span className={`status-badge ${order.status === 'confirmed' ? 'confirmed' : 'cancelled'}`}>
                    {order.status}
                  </span>
                  {order.status === 'confirmed' && order.delivery_date && (
                    <div className="delivery-date">
                      <span className="delivery-label">Expected delivery:</span>
                      <span className="delivery-value">{formatDeliveryDate(order.delivery_date)}</span>
                    </div>
                  )}
                </div>
                <div className="order-total">{formatCurrency(order.total_amount)}</div>
              </div>
              {order.status === 'confirmed' && (
                <div className="order-actions">
                  <button 
                    onClick={() => handleCancelOrder(order.id)}
                    className="cancel-button"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="order-items">
            {order.order_items?.map((item, index) => (
              <div key={index} className="order-item">
                <img 
                  src={item.products?.image_url} 
                  alt={item.products?.name} 
                  className="order-item-img"
                />
                <div className="order-item-info">
                  <h4>{item.products?.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">{formatCurrency(item.products?.price)} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return <div className="container page">Loading your orders...</div>;
  if (error) return <div className="container page error">{error}</div>;

  return (
    <div className="container page">
      <div className="orders-header">
        <h1>Orders</h1>
        {renderTabs()}
      </div>

      {!user ? (
        <div className="empty-orders">
          <h3>Please log in to view your orders</h3>
          <p>Sign in to see your order history and track your purchases.</p>
          <a href="/login" className="btn btn-primary">Sign In</a>
          <a href="/products" className="btn btn-secondary" style={{marginLeft: '1rem'}}>Continue Shopping</a>
        </div>
      ) : (
        renderOrders()
      )}
    </div>
  );
}
