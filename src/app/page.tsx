'use client';

import React, { useState, useCallback } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDownloadNotice } from '@/hooks/useDownloadNotice';
import HowTo from '@/components/HowTo';
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

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [error, setError] = useState('');
  const { showDownloaded, DownloadNotice } = useDownloadNotice();

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
      link.download = 'cropped-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showDownloaded('cropped-image.jpg');
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
          id="hero-title"
          variant="h1"
          sx={{
            textAlign: 'center',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            fontSize: { xs: '2rem', md: '2.8125rem' },
            lineHeight: 1.1,
            color: '#0B1220',
            scrollMarginTop: { xs: '80px', md: '100px' },
          }}
        >
          Free online image{' '}
          <Box
            component="span"
            sx={{
              background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            cropper
          </Box>
          .
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
            color: '#475569', // slate-600
            opacity: 0.95,
          }}
        >
          Crop images in seconds—free, fast, and high-quality.
        </Typography>
      </Box>

      {!imageSrc ? (
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <UploadArea onFileSelect={handleFileSelect} error={error} buttonText="Upload your photo" supportedFormats="File must be JPEG, JPG, PNG or WebP and up to 40MB" wide />
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
            <CropSidebar aspectRatio={aspectRatio} onAspectRatioChange={setAspectRatio} onDownload={handleDownload} onReset={resetImage} canDownload={!!croppedAreaPixels} />
          </Box>
        </Box>
      )}
      <ValueItemisation valueItems={cropValueItems} />
      <EditorPreview imagePosition="right" />
      <HowToAccordion
        steps={cropHowToData.steps}
        title={cropHowToData.title}
        subtitle="Open the app, upload, crop, explore tools, and download."
        imageSrc="https://i.ibb.co/CKBCDzjm/Chat-GPT-Image-Sep-25-2025-09-05-22-PM.png"
        imagePosition="left"  
      />
      <EditorPreview
        imagePosition="right"
        imageSrc="https://i.ibb.co/XZkyW2G0/Chat-GPT-Image-Sep-25-2025-09-48-51-PM.webp"
        title="Multiple Aspect Ratios"
        description="Easily crop your photos to any aspect ratio — perfect squares, classic 3:2, wide 16:9, or custom sizes. Quickly adjust and rotate images to create professional-quality visuals for social media, websites, and projects."
      />
      <FAQ faqData={cropFaqData} />
      {DownloadNotice}
    </StyledContainer>
  );
};

export default CropImage;
