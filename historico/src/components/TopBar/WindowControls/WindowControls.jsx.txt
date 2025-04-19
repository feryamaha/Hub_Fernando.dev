import React from 'react';

const WindowControls = () => {
  return (
    <div className="flex items-center px-2 space-x-2">
      <button 
        className="w-3 h-3 rounded-full bg-finder-control-close hover:bg-finder-control-close-hover transition-colors"
      />
      <button 
        className="w-3 h-3 rounded-full bg-finder-control-minimize hover:bg-finder-control-minimize-hover transition-colors"
      />
      <button 
        className="w-3 h-3 rounded-full bg-finder-control-maximize hover:bg-finder-control-maximize-hover transition-colors"
      />
    </div>
  );
};

export default WindowControls; 