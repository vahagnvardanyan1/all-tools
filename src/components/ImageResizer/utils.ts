// File validation utility
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'Please select a valid image file.' };
  }

  if (file.size > 40 * 1024 * 1024) {
    return { isValid: false, error: 'File size must be less than 40MB.' };
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

// Utility function to resize image using resize-img package (client-side only)
export const resizeImage = async (imageSrc: string, width: number, height: number): Promise<Blob | null> => {
  try {
    // Only run on client side to avoid SSR issues
    if (typeof window === 'undefined') {
      return null;
    }

    // Dynamic import to ensure it only runs on client side
    const resizeImg = (await import('resize-img')).default;

    // Convert data URL to buffer
    const response = await fetch(imageSrc);
    const buffer = await response.arrayBuffer();

    // Resize the image using resize-img
    const resizedBuffer = await resizeImg(Buffer.from(buffer), {
      width,
      height,
    });

    // Convert back to blob
    // Ensure resizedBuffer is an ArrayBuffer or Uint8Array for Blob compatibility
    const blobPart = resizedBuffer instanceof ArrayBuffer ? resizedBuffer : resizedBuffer.buffer instanceof ArrayBuffer ? resizedBuffer.buffer : new Uint8Array(resizedBuffer);

    return new Blob([blobPart], { type: 'image/jpeg' });
  } catch (error) {
    console.error('Error resizing image:', error);

    // Fallback to canvas-based resizing if resize-img fails
    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return null;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);

      return new Promise(resolve => {
        canvas.toBlob(resolve, 'image/jpeg', 0.9);
      });
    } catch (fallbackError) {
      console.error('Fallback canvas resize also failed:', fallbackError);
      return null;
    }
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
