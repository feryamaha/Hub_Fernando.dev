"use client";

import FavoritesSection from "./favorites-section";
import ThemeSection from "./theme-section";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <FavoritesSection />
      <ThemeSection />
    </div>
  );
};

export default Sidebar;
