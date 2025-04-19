import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, to, onClick, isDownloadable = false }) => {
  const content = (
    <>
      {Icon && <Icon />}
      <span className="text-finder truncate">{label}</span>
      {isDownloadable && (
        <svg 
          className="w-4 h-4 ml-auto text-finder-text-secondary" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="sidebar-item">
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="sidebar-item w-full text-left">
      {content}
    </button>
  );
};

export default SidebarItem; 