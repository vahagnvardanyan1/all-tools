'use client';

import React, { useState, useCallback } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HowTo from '@/components/HowTo';
import ValueItemisation from '@/components/ValueItemisation';
import FAQ from '@/components/FAQ';
import EditorPreview from '@/components/EditorPreview';
import { cropFaqData, cropValueItems, cropHowToData } from '@/data/cropImageData';
import UploadArea from '@/components/ImageCropper/UploadArea';
import ImageCropper from '@/components/ImageCropper/ImageCropper';
import CropSidebar from '@/components/ImageCropper/CropSidebar';
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

const TikTokCropTool = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(9 / 16); // Default to 9:16 for TikTok
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
      link.download = 'tiktok-cropped-image.jpg';
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
          Crop Images & Videos for TikTok – Free TikTok Crop Tool
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
          Stand out on TikTok with properly cropped visuals. Our TikTok Crop Tool makes it easy to resize photos and videos to the ideal 9:16 ratio for TikTok feeds, ads, and profile covers. Upload
          once, crop with precision, and download ready-to-share content that looks flawless on every screen.
        </Typography>
      </Box>

      {!imageSrc ? (
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <UploadArea onFileSelect={handleFileSelect} error={error} buttonText="Upload your TikTok content" supportedFormats="File must be JPEG, JPG, PNG or WebP and up to 40MB" wide />
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
                video: { label: 'TikTok Video (9:16)', ratio: 9 / 16 },
                profile: { label: 'Profile Picture (1:1)', ratio: 1 },
                landscape: { label: 'Landscape Video (16:9)', ratio: 16 / 9 },
                story: { label: 'Story Format (4:5)', ratio: 4 / 5 },
              }}
            />
          </Box>
        </Box>
      )}
      <ValueItemisation valueItems={cropValueItems} />
      <EditorPreview
        title="Crop Images & Videos for TikTok – Free TikTok Crop Tool"
        description="Free TikTok crop tool to resize images and videos for TikTok posts, profile, and ads. Get the perfect 9:16 ratio in seconds."
      />
      <HowTo {...cropHowToData} />
      <EditorPreview
        imageSrc="https://i.ibb.co/d0Byk3Yj/ratios.png"
        title="TikTok Vertical Format"
        description="Perfect your TikTok content with the signature 9:16 vertical format. Create engaging videos, profile covers, and ads that capture attention in the TikTok feed with our precision cropping tool."
      />
      <FAQ faqData={cropFaqData} />
    </StyledContainer>
  );
};

export default TikTokCropTool;
