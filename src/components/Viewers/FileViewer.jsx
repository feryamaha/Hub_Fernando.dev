import React from 'react';
import { Document, Page } from 'react-pdf';

const FileViewer = ({ file, onDownload }) => {
  return (
    <div className="bg-finder-window p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-finder-text">
          {file.name}
        </h2>
        <button
          onClick={onDownload}
          className="px-4 py-2 bg-finder-accent text-finder-text rounded-lg hover:bg-finder-accent/80 transition-colors"
        >
          Download
        </button>
      </div>
      
      <div className="bg-finder-hover rounded-lg p-4">
        {file.type === 'pdf' && (
          <Document file={file.url}>
            <Page pageNumber={1} />
          </Document>
        )}
        
        {file.type === 'image' && (
          <img
            src={file.url}
            alt={file.name}
            className="max-w-full h-auto rounded-lg"
          />
        )}
        
        {file.type === 'text' && (
          <pre className="text-finder-text whitespace-pre-wrap">
            {file.content}
          </pre>
        )}
      </div>
    </div>
  );
};

export default FileViewer; 