import { useState } from 'react';

const useDownload = () => {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async (url, filename) => {
    try {
      setIsDownloading(true);
      setProgress(0);

      const response = await fetch(url);
      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        loaded += value.length;
        
        if (total) {
          setProgress(Math.round((loaded / total) * 100));
        }
      }

      const blob = new Blob(chunks);
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setProgress(100);
    } catch (error) {
      console.error('Erro ao baixar arquivo:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    downloadFile,
    progress,
    isDownloading
  };
};

export default useDownload; 