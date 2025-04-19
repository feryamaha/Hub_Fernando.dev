import React from 'react';

const WindowControls = () => {
  const handleClose = () => {
    window.close();
  };

  const handleMinimize = () => {
    document.body.classList.toggle('window-minimized');
  };

  const handleMaximize = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <div className="flex items-center space-x-2 px-4 py-2" role="group" aria-label="Window controls">
      <button
        className="window-control window-control-close"
        onClick={handleClose}
        aria-label="Close window"
        title="Close"
      />
      <button
        className="window-control window-control-minimize"
        onClick={handleMinimize}
        aria-label="Minimize window"
        title="Minimize"
      />
      <button
        className="window-control window-control-maximize"
        onClick={handleMaximize}
        aria-label="Maximize window"
        title="Maximize"
      />
    </div>
  );
};

export default WindowControls; 