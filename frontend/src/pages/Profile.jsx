import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient.js';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: '',
    age: '',
    address: '',
    phoneNumber: '',
    email: ''
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);
      setProfileData({
        fullName: user.user_metadata?.full_name || '',
        age: user.user_metadata?.age || '',
        address: user.user_metadata?.address || '',
        phoneNumber: user.user_metadata?.phone_number || '',
        email: user.email || ''
      });
      setLoading(false);
    };

    getUser();
  }, []);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.fullName,
          age: profileData.age,
          address: profileData.address,
          phone_number: profileData.phoneNumber
        }
      });

      if (error) throw error;

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Update local user state
      const { data: { user: updatedUser } } = await supabase.auth.getUser();
      setUser(updatedUser);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      fullName: user.user_metadata?.full_name || '',
      age: user.user_metadata?.age || '',
      address: user.user_metadata?.address || '',
      phoneNumber: user.user_metadata?.phone_number || '',
      email: user.email || ''
    });
    setIsEditing(false);
    setError('');
  };

  if (loading) return <div className="container page">Loading profile...</div>;

  if (!user) {
    return (
      <div className="container page">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>
        <div className="empty-orders">
          <h3>Please log in to view your profile</h3>
          <p>Sign in to manage your personal information and account settings.</p>
          <a href="/login" className="btn btn-primary">Sign In</a>
          <a href="/products" className="btn btn-secondary" style={{marginLeft: '1rem'}}>Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container page">
      <div className="profile-header">
        <h1>My Profile</h1>
        {!isEditing && (
          <button 
            className="btn btn-primary" 
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2>{profileData.fullName || 'User'}</h2>
          <p className="user-email">{profileData.email}</p>
        </div>

        <div className="profile-form">
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="form-display">{profileData.fullName || 'Not provided'}</div>
                )}
              </div>

              <div className="form-group">
                <label>Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter your age"
                  />
                ) : (
                  <div className="form-display">{profileData.age || 'Not provided'}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              {isEditing ? (
                <textarea
                  value={profileData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address"
                  rows="3"
                />
              ) : (
                <div className="form-display">{profileData.address || 'Not provided'}</div>
              )}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="form-display">{profileData.phoneNumber || 'Not provided'}</div>
              )}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="form-display email-readonly">
                {profileData.email}
                <span className="readonly-note">Email cannot be changed</span>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="form-actions">
              <button 
                className="btn btn-secondary" 
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
