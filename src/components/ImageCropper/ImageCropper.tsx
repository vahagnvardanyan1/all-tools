import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  backgroundColor: '#000',
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    height: 400,
  },
  [theme.breakpoints.up('md')]: {
    height: 400,
  },
}));

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, crop, zoom, rotation, aspectRatio, onCropChange, onCropComplete, onZoomChange, onRotationChange }) => {
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
        style={{
          containerStyle: {
            width: '100%',
            height: '100%',
            position: 'relative',
          },
        }}
      />
    </CropContainer>
  );
};

export default ImageCropper;
