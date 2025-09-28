'use client';

import React, { useState, useCallback } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDownloadNotice } from '@/hooks/useDownloadNotice';
import EditorPreview from '@/components/EditorPreview';
import ValueItemisation from '@/components/ValueItemisation';
import FAQ from '@/components/FAQ';
import { resizeFaqData, resizeValueItems, resizeHowToData } from '@/data/resizeImageData';
import UploadArea from '@/components/ImageCropper/UploadArea';
import ResizeControls from '@/components/ImageResizer/ResizeControls';
import { resizeImage, validateImageFile } from '@/components/ImageResizer/utils';
import HowToAccordion from '@/components/HowToAccordion';
// Removed cropper UI here; we use resize controls instead to keep the page focused on resizing

interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
}

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ResizeImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [resizeSettings, setResizeSettings] = useState<ResizeSettings>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { showDownloaded, DownloadNotice } = useDownloadNotice();

  const handleFileSelect = useCallback((file: File) => {
    const validation = validateImageFile(file);

    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError('');
    setResizedImage(null);

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageSrc = reader.result as string;
      setImageSrc(imageSrc);
      setResizedImage(null);

      // Get original image dimensions
      const img = document.createElement('img');
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setResizeSettings(prev => ({
          ...prev,
          width: img.width,
          height: img.height,
        }));
      };
      img.src = imageSrc;
    });
    reader.readAsDataURL(file);
  }, []);

  const handleResize = useCallback(async () => {
    if (!imageSrc) return;

    setIsProcessing(true);
    try {
      const resizedImageBlob = await resizeImage(imageSrc, resizeSettings.width, resizeSettings.height);
      if (!resizedImageBlob) {
        setError('Failed to resize image. Please try again.');
        return;
      }

      const resizedImageUrl = URL.createObjectURL(resizedImageBlob);
      setResizedImage(resizedImageUrl);
    } catch {
      setError('Failed to resize image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [imageSrc, resizeSettings]);

  const handleDownload = useCallback(async () => {
    if (!resizedImage) return;

    try {
      const response = await fetch(resizedImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'resized-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showDownloaded('resized-image.jpg');
    } catch {
      setError('Failed to download image. Please try again.');
    }
  }, [resizedImage]);

  const resetImage = useCallback(() => {
    setImageSrc(null);
    setResizedImage(null);
    setOriginalDimensions(null);
    setResizeSettings({
      width: 800,
      height: 600,
      maintainAspectRatio: true,
    });
    setError('');
    setIsProcessing(false);
  }, []);

  const handleResizeSettingsChange = useCallback(
    (newSettings: Partial<ResizeSettings>) => {
      setResizeSettings(prev => {
        const updated = { ...prev, ...newSettings };

        // Handle aspect ratio maintenance
        if (updated.maintainAspectRatio && originalDimensions && newSettings.width && !newSettings.height) {
          const aspectRatio = originalDimensions.width / originalDimensions.height;
          updated.height = Math.round(updated.width / aspectRatio);
        } else if (updated.maintainAspectRatio && originalDimensions && newSettings.height && !newSettings.width) {
          const aspectRatio = originalDimensions.width / originalDimensions.height;
          updated.width = Math.round(updated.height * aspectRatio);
        }

        return updated;
      });
    },
    [originalDimensions],
  );

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
            resizer
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
            color: '#475569',
            opacity: 0.95,
          }}
        >
          Resize images quickly and easily. Change dimensions while maintaining quality for posts, websites, and more.
        </Typography>
      </Box>

      {!imageSrc ? (
        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <UploadArea onFileSelect={handleFileSelect} error={error} buttonText="Upload your TikTok content" supportedFormats="File must be JPEG, JPG, PNG or WebP and up to 40MB" wide />
        </Box>
      ) : (
        <Box>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Original Image
            </Typography>
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 2,
                maxWidth: '100%',
                height: 400,
                backgroundColor: '#f5f5f5',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt="Original image"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Box>
            {originalDimensions && (
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {originalDimensions.width} × {originalDimensions.height} pixels
              </Typography>
            )}
          </Box>

          {resizedImage && (
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Resized Preview ({resizeSettings.width} × {resizeSettings.height})
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 2,
                  maxWidth: '100%',
                  height: 400,
                  backgroundColor: '#000',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resizedImage}
                  alt="Resized preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Box>
            </Box>
          )}

          <ResizeControls
            resizeSettings={resizeSettings}
            originalDimensions={originalDimensions}
            resizedImage={resizedImage}
            isProcessing={isProcessing}
            onResizeSettingsChange={handleResizeSettingsChange}
            onResize={handleResize}
            onDownload={handleDownload}
            onReset={resetImage}
          />
        </Box>
      )}

      <ValueItemisation valueItems={resizeValueItems} />
      <EditorPreview
        imagePosition="right"
        imageSrc="https://i.ibb.co/6jB6RSJ/2025-09-23-21-16-31.jpg"
        title="Resize images online — fast and high‑quality"
        description="Set exact width and height, keep aspect ratio, and preview instantly. Perfect sizes for web, social media, and more."
      />
      <HowToAccordion
        steps={resizeHowToData.steps}
        title={resizeHowToData.title}
        subtitle="Open the app, upload, crop, explore tools, and download."
        imageSrc="https://i.ibb.co/CKBCDzjm/Chat-GPT-Image-Sep-25-2025-09-05-22-PM.png"
        imagePosition="left"
      />
      <FAQ faqData={resizeFaqData} />
      {DownloadNotice}
    </StyledContainer>
  );
};

export default ResizeImage;
