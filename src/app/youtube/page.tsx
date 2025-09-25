'use client';

import React, { useState, useCallback } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ValueItemisation from '@/components/ValueItemisation';
import FAQ from '@/components/FAQ';
import EditorPreview from '@/components/EditorPreview';
import { cropFaqData, cropValueItems, cropHowToData } from '@/data/cropImageData';
import UploadArea from '@/components/ImageCropper/UploadArea';
import ImageCropper from '@/components/ImageCropper/ImageCropper';
import CropSidebar from '@/components/ImageCropper/CropSidebar';
import { getCroppedImg, validateImageFile } from '@/components/ImageCropper/utils';
import HowToAccordion from '@/components/HowToAccordion';

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

const YouTubeCropTool = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(16 / 9); // Default to 16:9 for thumbnails
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
      link.download = 'youtube-cropped-image.jpg';
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
  }, []);

  return (
    <StyledContainer maxWidth="lg">
      <Box textAlign="center">
        <Typography
          variant="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            fontSize: { xs: '2rem', md: '2.8125rem' },
            lineHeight: 1.1,
            color: '#0B1220',
          }}
        >
          Crop Images for YouTube Thumbnails & Shorts – Free YouTube Crop Tool
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
            color: '#475569',
            opacity: 0.95,
          }}
        >
          Our YouTube Crop Tool helps creators make perfect visuals for their channel. Create eye-catching thumbnails in the standard 1280×720 (16:9) format, or crop vertical images for YouTube Shorts
          at 9:16. Get professional results in seconds — no design skills needed.
        </Typography>
      </Box>

      {!imageSrc ? (
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <UploadArea onFileSelect={handleFileSelect} error={error} buttonText="Upload your YouTube image" supportedFormats="File must be JPEG, JPG, PNG or WebP and up to 40MB" wide />
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
              platformPresets={{
                thumbnail: { label: 'Thumbnail (16:9)', ratio: 16 / 9 },
                shorts: { label: 'YouTube Shorts (9:16)', ratio: 9 / 16 },
                profile: { label: 'Profile Picture (1:1)', ratio: 1 },
                community: { label: 'Community Post (4:3)', ratio: 4 / 3 },
              }}
            />
          </Box>
        </Box>
      )}
      <ValueItemisation valueItems={cropValueItems} />
      <EditorPreview
        title="Crop Images for YouTube Thumbnails & Shorts – Free YouTube Crop Tool"
        description="Resize and crop images for YouTube thumbnails (16:9) and YouTube Shorts (9:16). Perfect visuals for creators, free and online."
      />
      <HowToAccordion
        steps={cropHowToData.steps}
        title={cropHowToData.title}
        subtitle="Open the app, upload, crop, explore tools, and download."
        imageSrc="https://i.ibb.co/CKBCDzjm/Chat-GPT-Image-Sep-25-2025-09-05-22-PM.png"
        imagePosition="left"  
      />
      <EditorPreview
        imageSrc="https://i.ibb.co/d0Byk3Yj/ratios.png"
        title="YouTube Creator Formats"
        description="Optimize your YouTube channel with professional visuals. Create compelling thumbnails (16:9) that drive clicks, vertical content for Shorts (9:16), and perfect channel branding elements."
      />
      <FAQ faqData={cropFaqData} />
    </StyledContainer>
  );
};

export default YouTubeCropTool;
