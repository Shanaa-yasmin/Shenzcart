import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient.js';
import LocationSelector from './LocationSelector.jsx';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/products" className="brand">ShenzCart</Link>
        
        <LocationSelector />
        
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn" aria-label="Search">
            🔍
          </button>
        </form>
        
        <nav className="nav">
          <Link to="/products" className={location.pathname.startsWith('/products') ? 'active' : ''}>Products</Link>
          <Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>Orders</Link>
          <Link to="/cart" className={location.pathname === '/cart' ? 'active' : ''} aria-label="Cart">🛒</Link>
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                <span className="user-name">Hi, {user.user_metadata?.full_name || user.email}</span>
              </Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </div>
          ) : (
            <div className="user-menu">
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
