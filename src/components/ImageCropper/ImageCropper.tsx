import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Cropper from 'react-easy-crop';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageCropperProps {
  imageSrc: string;
  crop: { x: number; y: number };
  zoom: number;
  rotation: number;
  aspectRatio: number | null;
  onCropChange: (crop: { x: number; y: number }) => void;
  onCropComplete: (croppedArea: CropArea, croppedAreaPixels: CropArea) => void;
  onZoomChange: (zoom: number) => void;
  onRotationChange: (rotation: number) => void;
}

const CropContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 400,
  backgroundColor: '#E5E7EB',
  border: '1px solid #D1D5DB',
  borderRadius: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    height: 400,
  },
  [theme.breakpoints.up('md')]: {
    height: 400,
  },
}));

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, crop, zoom, rotation, aspectRatio, onCropChange, onCropComplete, onZoomChange, onRotationChange }) => {
  const theme = useTheme();
  const handleCropComplete = useCallback(
    (croppedArea: CropArea, croppedAreaPixels: CropArea) => {
      onCropComplete(croppedArea, croppedAreaPixels);
    },
    [onCropComplete],
  );

  return (
    <CropContainer>
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={aspectRatio || undefined}
        rotation={rotation}
        onCropChange={onCropChange}
        onCropComplete={handleCropComplete}
        onZoomChange={onZoomChange}
        onRotationChange={onRotationChange}
        showGrid
        style={{
          containerStyle: {
            width: '100%',
            height: '100%',
            position: 'relative',
          },
          cropAreaStyle: {
            boxShadow: '0 0 0 9999em rgba(0,0,0,0)',
            border: `3px dashed ${theme.palette.primary.main}`,
            borderRadius: 18,
          },
        }}
      />

    </CropContainer>
  );
};

export default ImageCropper;
