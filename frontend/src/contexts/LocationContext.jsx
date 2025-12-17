import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    // Load from localStorage on initialization
    const saved = localStorage.getItem('userLocation');
    return saved ? JSON.parse(saved) : null;
  });

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    if (newLocation) {
      localStorage.setItem('userLocation', JSON.stringify(newLocation));
    } else {
      localStorage.removeItem('userLocation');
    }
  };

  const clearLocation = () => {
    setLocation(null);
    localStorage.removeItem('userLocation');
  };

  const value = {
    location,
    updateLocation,
    clearLocation,
    hasLocation: !!location
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
