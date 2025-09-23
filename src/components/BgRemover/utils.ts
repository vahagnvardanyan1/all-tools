// File validation utility
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'Please select a valid image file.' };
  }

  if (file.size > 10 * 1024 * 1024) {
    return { isValid: false, error: 'File size must be less than 10MB.' };
  }

  return { isValid: true };
};

// Utility function to create image from URL
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

// Utility function to remove background using remove.bg API (client-side only)
export const removeBackground = async (imageSrc: string): Promise<Blob | null> => {
  try {
    if (typeof window === 'undefined') {
      return null;
    }

    // Convert data URL to ArrayBuffer and send as binary
    const response = await fetch(imageSrc);
    const buffer = await response.arrayBuffer();

    const apiResponse = await fetch('/api/bg-remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream' },
      body: buffer,
    });

    if (!apiResponse.ok) {
      return null;
    }

    return await apiResponse.blob();
  } catch (error) {
    console.error('Error removing background via API:', error);
    return null;
  }
};

// Utility to get image dimensions from data URL
export const getImageDimensions = (imageSrc: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = imageSrc;
  });
};
