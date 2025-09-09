import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";

export function useCompression() {
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  const compressImage = useCallback(async (file, options = { maxSizeMB: 1, maxWidthOrHeight: 800 }) => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();

      reader.onload = () => {
        setCompressedImage(reader.result);
        setLoading(false);
      };

      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Compression failed:", err);
      setError(err.message || "Compression error");
      setLoading(false);
    }
  }, []);

  return { compressedImage, loading, error, compressImage };
}