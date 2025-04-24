import React from 'react';
import FavoritesSection from './Favorites/FavoritesSection';
import LocationsSection from './Locations/LocationsSection';
import ThemeSection from './Theme/ThemeSection';

const Sidebar = () => {
  console.log('FavoritesSection:', FavoritesSection);
  console.log('LocationsSection:', LocationsSection);

  return (
    <div className="sidebar">
      <FavoritesSection />
      <LocationsSection />
      <ThemeSection />
    </div>
  );
};

export default Sidebar;
