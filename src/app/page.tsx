'use client';

import React, { useState, useCallback } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HowTo from '@/components/HowTo';
import ValueItemisation from '@/components/ValueItemisation';
import FAQ from '@/components/FAQ';
import { cropFaqData, cropValueItems, cropHowToData } from '@/data/cropImageData';
import UploadArea from '@/components/ImageCropper/UploadArea';
import ImageCropper from '@/components/ImageCropper/ImageCropper';
import CropControls from '@/components/ImageCropper/CropControls';
import DemoImagePreview from '@/components/ImageCropper/DemoImagePreview';
import { getCroppedImg, validateImageFile } from '@/components/ImageCropper/utils';

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  color: theme.palette.primary.main,
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showDemoImage, setShowDemoImage] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [error, setError] = useState('');

  const onCropComplete = useCallback((croppedArea: CropArea, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    const validation = validateImageFile(file);

    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError('');
    setShowDemoImage(false);

    const reader = new FileReader();
    reader.addEventListener('load', () => setImageSrc(reader.result as string));
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      if (!croppedImage) {
        setError('Failed to crop image. Please try again.');
        return;
      }
      const url = URL.createObjectURL(croppedImage);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'cropped-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setError('Failed to crop image. Please try again.');
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const resetImage = useCallback(() => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setError('');
    setShowDemoImage(true);
  }, []);

  return (
    <StyledContainer maxWidth="lg">
      <Box textAlign="center">
        <StyledTitle variant="h1" as="h1" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, lineHeight: { xs: 1.3, md: 1.2 } }}>
          Free image cropper: Easily crop images online
        </StyledTitle>
        <StyledDescription variant="body1" as="p" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
          Cropping images can take time and effort, but it doesn&apos;t have to. Effortlessly crop images online with Picart&apos;s free image cropper for stunning, quality visuals.
        </StyledDescription>
      </Box>

      {!imageSrc ? (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={8} alignItems={{ xs: 'center', md: 'center' }} sx={{ minHeight: { md: '400px' } }}>
          <Box flex={1} sx={{ order: { xs: 2, md: 1 } }}>
            <DemoImagePreview show={showDemoImage} imageSrc="https://i.ibb.co/6jB6RSJ/2025-09-23-21-16-31.jpg" altText="Demo image for cropping" />
          </Box>
          <Box flex={1} display="flex" justifyContent="center" alignItems="center" sx={{ order: { xs: 1, md: 2 } }}>
            <UploadArea onFileSelect={handleFileSelect} error={error} />
          </Box>
        </Box>
      ) : (
        <Box>
          <ImageCropper
            imageSrc={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspectRatio={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />

          <CropControls
            zoom={zoom}
            rotation={rotation}
            aspectRatio={aspectRatio}
            croppedAreaPixels={croppedAreaPixels}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onAspectRatioChange={setAspectRatio}
            onDownload={handleDownload}
            onReset={resetImage}
          />
        </Box>
      )}

      <ValueItemisation valueItems={cropValueItems} />
      <HowTo {...cropHowToData} />
      <FAQ faqData={cropFaqData} />
    </StyledContainer>
  );
};

export default CropImage;
