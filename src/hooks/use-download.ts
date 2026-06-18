"use client";

import { useState } from "react";

interface UseDownloadResult {
  downloadFile: (url: string, filename: string) => Promise<void>;
  progress: number;
  isDownloading: boolean;
}

const useDownload = (): UseDownloadResult => {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadFile = async (url: string, filename: string): Promise<void> => {
    try {
      setIsDownloading(true);
      setProgress(0);

      const response = await fetch(url);
      const contentLength = response.headers.get("content-length");
      const total = contentLength ? Number.parseInt(contentLength, 10) : 0;
      let loaded = 0;

      const reader = response.body?.getReader();
      if (!reader) throw new Error("ReadableStream não suportado");
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) {
          chunks.push(value);
          loaded += value.length;
          if (total) {
            setProgress(Math.round((loaded / total) * 100));
          }
        }
      }

      const blob = new Blob(chunks as BlobPart[]);
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setProgress(100);
    } catch (error) {
      console.error("Erro ao baixar arquivo:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadFile, progress, isDownloading };
};

export default useDownload;
