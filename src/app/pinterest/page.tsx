'use client';

import React, { useState, useCallback } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDownloadNotice } from '@/hooks/useDownloadNotice';
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

const PinterestCropTool = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(2 / 3); // Default to 2:3 for Pinterest pins
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
      link.download = 'pinterest-cropped-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showDownloaded('pinterest-cropped-image.jpg');
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
          Crop Images for Pinterest – Free Pinterest Crop Tool
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
          Pinterest loves vertical images — and our Pinterest Crop Tool helps you create them. Crop pins to 1000×1500 (2:3) or stories to 9:16. Upload your design, crop, and get stunning visuals ready
          to share.
        </Typography>
      </Box>

      {!imageSrc ? (
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <UploadArea onFileSelect={handleFileSelect} error={error} buttonText="Upload your Pinterest image" supportedFormats="File must be JPEG, JPG, PNG or WebP and up to 40MB" wide />
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
                pin: { label: 'Pinterest Pin (2:3)', ratio: 2 / 3 },
                story: { label: 'Story Pin (9:16)', ratio: 9 / 16 },
                square: { label: 'Square Pin (1:1)', ratio: 1 },
                wide: { label: 'Wide Pin (3:2)', ratio: 3 / 2 },
              }}
            />
          </Box>
        </Box>
      )}
      <ValueItemisation valueItems={cropValueItems} />
      <EditorPreview
        title="Crop Images for Pinterest – Free Pinterest Crop Tool"
        description="Resize and crop images for Pinterest pins (2:3) and story pins (9:16). Free, fast, and perfect for creators."
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
        title="Pinterest Vertical Formats"
        description="Create Pinterest-perfect content with the ideal vertical formats. Design stunning pins (2:3), engaging story pins (9:16), and eye-catching visuals that drive traffic and engagement on Pinterest."
      />
      <FAQ faqData={cropFaqData} />
      {DownloadNotice}
    </StyledContainer>
  );
};

export default PinterestCropTool;
