import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.js';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    fullName: '',
    age: '',
    address: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      });
      if (error) throw error;
      navigate('/products');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          data: {
            full_name: signupData.fullName,
            age: signupData.age,
            address: signupData.address,
            phone_number: signupData.phoneNumber
          }
        }
      });
      
      if (error) throw error;
      
      if (data.user) {
        alert('Account created successfully! Please check your email to verify your account.');
        setMode('login');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateLoginData = (field, value) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const updateSignupData = (field, value) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Login Side */}
        <div className="auth-side login-side">
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Sign in to your account</p>
            
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={loginData.email} 
                onChange={(e) => updateLoginData('email', e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={loginData.password} 
                onChange={(e) => updateLoginData('password', e.target.value)} 
                required 
              />
            </div>
            
            {error && mode === 'login' && <div className="error">{error}</div>}
            
            <button type="submit" className="btn btn-primary btn-block" disabled={loading && mode === 'login'}>
              {loading && mode === 'login' ? 'Signing in...' : 'Sign In'}
            </button>
            
            <p className="auth-switch">
              Don't have an account? 
              <button type="button" className="link-btn" onClick={() => setMode('signup')}>
                Sign up here
              </button>
            </p>
          </form>
        </div>

        {/* Signup Side */}
        <div className={`auth-side signup-side ${mode === 'signup' ? 'active' : ''}`}>
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join ShenzCart today</p>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={signupData.fullName} 
                  onChange={(e) => updateSignupData('fullName', e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="number" 
                  placeholder="Age" 
                  value={signupData.age} 
                  onChange={(e) => updateSignupData('age', e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <textarea 
                placeholder="Address" 
                value={signupData.address} 
                onChange={(e) => updateSignupData('address', e.target.value)} 
                required 
                rows="2"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={signupData.email} 
                  onChange={(e) => updateSignupData('email', e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={signupData.phoneNumber} 
                  onChange={(e) => updateSignupData('phoneNumber', e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={signupData.password} 
                  onChange={(e) => updateSignupData('password', e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={signupData.confirmPassword} 
                  onChange={(e) => updateSignupData('confirmPassword', e.target.value)} 
                  required 
                />
              </div>
            </div>
            
            {error && mode === 'signup' && <div className="error">{error}</div>}
            
            <button type="submit" className="btn btn-primary btn-block" disabled={loading && mode === 'signup'}>
              {loading && mode === 'signup' ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <p className="auth-switch">
              Already have an account? 
              <button type="button" className="link-btn" onClick={() => setMode('login')}>
                Sign in here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
