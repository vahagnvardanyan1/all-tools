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
import CropSidebar from '@/components/ImageCropper/CropSidebar';
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
  marginBottom: theme.spacing(2),
  fontWeight: 900,
  color: '#111827',
  letterSpacing: '-0.02em',
  lineHeight: 1.15,
  fontFamily: 'var(--font-inter), var(--font-open-sans), system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  color: '#4B5563',
  lineHeight: 1.6,
  fontWeight: 400,
  fontFamily: 'var(--font-open-sans), var(--font-inter), system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial',
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
        {/* <StyledTitle variant="h1" as="h1" sx={{ fontSize: { xs: '2rem', md: '2.8125rem' }, lineHeight: { xs: 1.3, md: 1.2 } }}>
          Free online image cropper.
        </StyledTitle > */}
      <Typography
  variant="h1"
  sx={{
    textAlign: 'center',
    fontWeight: 900,
    letterSpacing: '-0.02em',
    // fontSize: { xs: 'clamp(28px,5vw,36px)', md: 'clamp(40px,4vw,56px)' },
    fontSize: { xs: '2rem', md: '2.8125rem'},
    lineHeight: 1.1,
    color: '#0B1220',
  }}
>
  Free online image <Box component="span"
    sx={{
      background:
        'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >cropper</Box>.
</Typography>
<Typography
  component="p"
  sx={{
    mt: 1,
    mx: 'auto',
    maxWidth: 760,
    textAlign: 'center',
    fontSize: { xs: '1rem', md: '1.0625rem' },
    lineHeight: 1.7,
    letterSpacing: '-0.01em',
    color: '#475569',   // slate-600
    opacity: 0.95,
  }}
>
  Crop images in seconds—free, fast, and high-quality.
</Typography>
        
        {/* <StyledDescription variant="body1" as="p" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
          The online Crop image tool which transforms your images into the perfect size in seconds
        </StyledDescription> */}
      </Box>

      {!imageSrc ? (
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <UploadArea 
            onFileSelect={handleFileSelect} 
            error={error}
            buttonText="Upload your photo"
            supportedFormats="File must be JPEG, JPG, PNG or WebP and up to 40MB"
            wide
          />
        </Box>
      ) : (
        <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 360px' }, gap: 3 }}>
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
          </Box>
          <Box>
            <CropSidebar
              aspectRatio={aspectRatio}
              onAspectRatioChange={setAspectRatio}
              onDownload={handleDownload}
              onReset={resetImage}
              canDownload={!!croppedAreaPixels}
            />
          </Box>
        </Box>
      )}

      <ValueItemisation valueItems={cropValueItems} />
      <HowTo {...cropHowToData} />
      <FAQ faqData={cropFaqData} />
    </StyledContainer>
  );
};

export default CropImage;
