import React from 'react';

const ContentViewer = ({ children, title }) => {
  return (
    <div className="bg-finder-window p-6 rounded-lg">
      {title && (
        <h1 className="text-2xl font-semibold text-finder-text mb-4">
          {title}
        </h1>
      )}
      <div className="text-finder-text">
        {children}
      </div>
    </div>
  );
};

export default ContentViewer; 