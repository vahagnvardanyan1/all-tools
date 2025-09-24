import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

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
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: 400,
  },
  [theme.breakpoints.up('md')]: {
    height: 400,
  },
}));

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, rotation, aspectRatio, onCropComplete }) => {
  const theme = useTheme();
  const cropperRef = useRef<ReactCropperElement>(null);

  // Sync aspect ratio
  useEffect(() => {
    const instance = cropperRef.current?.cropper;
    if (instance) {
      if (aspectRatio) instance.setAspectRatio(aspectRatio);
      else instance.setAspectRatio(NaN);
      instance.rotateTo(rotation || 0);
    }
  }, [aspectRatio, rotation]);

  return (
    <CropContainer>
      <Cropper
        ref={cropperRef}
        src={imageSrc}
        viewMode={1}
        dragMode="move"
        autoCropArea={1}
        background={false}
        guides={true}
        responsive
        checkOrientation={false}
        style={{ width: '100%', height: '100%' }}
        cropend={() => {
          const instance = cropperRef.current?.cropper;
          if (!instance) return;
          const data = instance.getData(true);
          const pixels = { x: Math.round(data.x), y: Math.round(data.y), width: Math.round(data.width), height: Math.round(data.height) };
          onCropComplete(pixels, pixels);
        }}
      />

      <style jsx global>{`
        /* Minimal, clean crop styling scoped to this component */
        .cropper-view-box,
        .cropper-face {
          border-radius: 12px;
        }
        /* Solid border and large handles for easier grabbing */
        .cropper-view-box {
          border: 2px solid ${theme.palette.primary.main};
          outline: none;
        }
        .cropper-point {
          background-color: ${theme.palette.primary.main};
          opacity: 1;
        }
        /* Hide edge midpoints; show only corner handles */
        .cropper-point.point-e,
        .cropper-point.point-n,
        .cropper-point.point-w,
        .cropper-point.point-s {
          width: 0;
          height: 0;
          opacity: 0;
        }
        /* Big, easy-to-grab corner handles */
        .cropper-point.point-ne,
        .cropper-point.point-nw,
        .cropper-point.point-se,
        .cropper-point.point-sw {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.18);
        }
      `}</style>
    </CropContainer>
  );
};

export default ImageCropper;
