import { useState, useEffect } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { supabase } from '../lib/supabaseClient';

export default function LocationSelector() {
  const { location, updateLocation, hasLocation } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [showAreaSelection, setShowAreaSelection] = useState(false);

  useEffect(() => {
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const validatePincode = (code) => {
    // Indian pincode validation (6 digits)
    return /^[1-9][0-9]{5}$/.test(code);
  };

  const fetchLocationFromPincode = async (pincode) => {
    try {
      setLoading(true);
      setError('');
      
      // Using India Post API for pincode lookup
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
        const postOffices = data[0].PostOffice;
        
        // If multiple post offices, show selection
        if (postOffices.length > 1) {
          setAvailableAreas(postOffices);
          setShowAreaSelection(true);
          setError('');
        } else {
          // Single post office, use it directly
          const postOffice = postOffices[0];
          const locationData = {
            pincode: pincode,
            area: postOffice.Name, // Specific post office/locality name
            city: postOffice.District, // District name
            state: postOffice.State,
            block: postOffice.Block,
            division: postOffice.Division,
            branchType: postOffice.BranchType,
            source: 'pincode'
          };
          updateLocation(locationData);
          setIsOpen(false);
          setPincode('');
          setShowAreaSelection(false);
        }
      } else {
        setError('Invalid pincode or location not found');
      }
    } catch (err) {
      setError('Failed to fetch location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    if (!validatePincode(pincode)) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }
    fetchLocationFromPincode(pincode);
  };

  const selectArea = (postOffice) => {
    const locationData = {
      pincode: pincode,
      area: postOffice.Name,
      city: postOffice.District,
      state: postOffice.State,
      block: postOffice.Block,
      division: postOffice.Division,
      branchType: postOffice.BranchType,
      source: 'pincode'
    };
    updateLocation(locationData);
    setIsOpen(false);
    setPincode('');
    setShowAreaSelection(false);
    setAvailableAreas([]);
  };

  const handleSignInLocation = async () => {
    setLoading(true);
    setError('');

    // Allow geolocation for guests as well; don't force sign-in
    try {
      if (!navigator.geolocation) {
        setError('Geolocation not supported by your browser. Please use pincode.');
        setLoading(false);
        return;
      }

      // If Permissions API is available, check permission status first for a friendlier UX
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const perm = await navigator.permissions.query({ name: 'geolocation' });
          if (perm.state === 'denied') {
            setError('Location permission denied. Please enable location permissions or use pincode.');
            setLoading(false);
            return;
          }
        } catch (permErr) {
          // ignore permission check failures and continue to request position
        }
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            // Use a reverse geocoding API and defensively parse results
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();

            const city = data.city || data.locality || data.principalSubdivision || '';
            const state = data.principalSubdivision || data.countryName || '';
            const postcode = data.postcode || data.postal || data.postalCode || '';
            // try multiple fallbacks for a meaningful area/locality
            const area = (data.localityInfo && data.localityInfo.administrative && (
              data.localityInfo.administrative[3]?.name || data.localityInfo.administrative[2]?.name
            )) || data.locality || data.city || '';

            const locationData = {
              city: city,
              state: state,
              pincode: postcode,
              area: area,
              coordinates: { latitude, longitude },
              source: 'geolocation'
            };

            updateLocation(locationData);
            setIsOpen(false);
          } catch (err) {
            console.error('Reverse geocode failed', err);
            setError('Failed to determine location from coordinates. Please try again or use pincode.');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.warn('Geolocation error', err);
          if (err.code === 1) {
            setError('Location access denied. Please enable location permissions or use pincode.');
          } else if (err.code === 2) {
            setError('Location unavailable. Try again or use pincode.');
          } else if (err.code === 3) {
            setError('Location request timed out. Try again or use pincode.');
          } else {
            setError('Unable to retrieve location. Please use pincode.');
          }
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } catch (err) {
      console.error('Unexpected geolocation error', err);
      setError('Failed to get location. Please use pincode.');
      setLoading(false);
    }
  };

  return (
    <div className="location-selector">
      <button 
        className="location-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select delivery location"
      >
        <span className="location-icon">📍</span>
        <div className="location-text">
          {hasLocation ? (
            <>
              <span className="location-label">Deliver to</span>
              <span className="location-value">
                {location.area || location.city}, {location.state} {location.pincode}
              </span>
            </>
          ) : (
            <>
              <span className="location-label">Select Location</span>
              <span className="location-value">Choose delivery area</span>
            </>
          )}
        </div>
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="location-dropdown">
          <div className="location-dropdown-content">
            <h3>Select Your Location</h3>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="location-options">
              {!showAreaSelection ? (
                <>
                  <button 
                    className="location-option-btn"
                    onClick={handleSignInLocation}
                    disabled={loading}
                  >
                    <span className="option-icon">🎯</span>
                    <div className="option-text">
                      <strong>Use Current Location</strong>
                      <small>{user ? 'Get location automatically' : 'Sign in to use current location'}</small>
                    </div>
                  </button>

                  <div className="divider">OR</div>

                  <form onSubmit={handlePincodeSubmit} className="pincode-form">
                    <div className="form-group">
                      <label htmlFor="pincode">Enter Pincode</label>
                      <input
                        type="text"
                        id="pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g., 110001"
                        maxLength="6"
                        disabled={loading}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading || !pincode}
                    >
                      {loading ? 'Finding...' : 'Find Location'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="area-selection">
                  <h4>Select Your Area</h4>
                  <p className="area-selection-subtitle">Multiple areas found for pincode {pincode}. Please select the most specific one:</p>
                  <div className="area-list">
                    {availableAreas.map((postOffice, index) => (
                      <button
                        key={index}
                        className="area-option-btn"
                        onClick={() => selectArea(postOffice)}
                      >
                        <div className="area-info">
                          <strong>{postOffice.Name}</strong>
                          <small>{postOffice.BranchType} • {postOffice.District}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => {
                      setShowAreaSelection(false);
                      setAvailableAreas([]);
                    }}
                  >
                    Back to Pincode Entry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
