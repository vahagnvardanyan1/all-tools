'use client';

import React, { useState, useCallback } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import HowToResize from '@/components/ImageResizer/HowToResize';
import ValueItemisation from '@/components/ValueItemisation';
import FAQResize from '@/components/ImageResizer/FAQResize';
import UploadAreaResize from '@/components/ImageResizer/UploadAreaResize';
import ResizeControls from '@/components/ImageResizer/ResizeControls';
import DemoImagePreviewResize from '@/components/ImageResizer/DemoImagePreviewResize';
import { resizeImage, validateImageFile } from '@/components/ImageResizer/utils';

interface ResizeSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
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

const ResizeImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showDemoImage, setShowDemoImage] = useState(true);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [resizeSettings, setResizeSettings] = useState<ResizeSettings>({
    width: 800,
    height: 600,
    maintainAspectRatio: true,
  });
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    const validation = validateImageFile(file);

    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError('');
    setShowDemoImage(false);
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
    setShowDemoImage(true);
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
        <StyledTitle variant="h1" as="h1" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, lineHeight: { xs: 1.3, md: 1.2 } }}>
          Free image resizer: Easily resize images online
        </StyledTitle>
        <StyledDescription variant="body1" as="p" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
          Resize images quickly and easily with our free online image resizer. Change dimensions while maintaining quality for all your image resizing needs.
        </StyledDescription>
      </Box>

      {!imageSrc ? (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={8} alignItems={{ xs: 'center', md: 'center' }} sx={{ minHeight: { md: '400px' } }}>
          <Box flex={1} sx={{ order: { xs: 2, md: 1 } }}>
            <DemoImagePreviewResize show={showDemoImage} />
          </Box>
          <Box flex={1} display="flex" justifyContent="center" alignItems="center" sx={{ order: { xs: 1, md: 2 } }}>
            <UploadAreaResize onFileSelect={handleFileSelect} error={error} />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              Original Image
            </Typography>
            <Box
              sx={{
                display: 'inline-block',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 2,
                maxWidth: '100%',
                height: 400,
                backgroundColor: '#f5f5f5',
              }}
            >
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
                  display: 'inline-block',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 2,
                  maxWidth: '100%',
                  height: 400,
                  backgroundColor: '#000',
                }}
              >
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

      <ValueItemisation />
      <HowToResize />
      <FAQResize />
    </StyledContainer>
  );
};

export default ResizeImage;
