'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Typography, Container, Box, Button, Paper, Slider, FormControl, InputLabel, Select, MenuItem, Grid, IconButton, Alert, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload, Download, RotateLeft, RotateRight } from '@mui/icons-material';
import Cropper from 'react-easy-crop';
import HowTo from '@/components/HowTo';
import ValueItemisation from '@/components/ValueItemisation';
import FAQ from '@/components/FAQ';

interface UploadAreaProps {
  isDragActive?: boolean;
}

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

const UploadArea = styled(Paper, {
  shouldForwardProp: prop => prop !== 'isDragActive',
})<UploadAreaProps>(({ theme, isDragActive }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.grey[300]}`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6),
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: isDragActive ? theme.palette.action.hover : 'transparent',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const CropContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 400,
  backgroundColor: '#000',
  borderRadius: 8,
});

const ControlsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
}));

const HiddenInput = styled('input')({
  display: 'none',
});

const DemoImageContainer = styled(Box)({
  overflow: 'hidden',
});

const DemoImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  display: 'block',
});

// Utility function to create image from URL
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

// Utility function to get cropped image
const getCroppedImg = async (imageSrc: string, pixelCrop: CropArea, rotation = 0): Promise<Blob | null> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x), Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y));

  return new Promise(resolve => {
    canvas.toBlob(resolve, 'image/jpeg', 0.9);
  });
};

const aspectRatios = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:2', value: 3 / 2 },
];

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showDemoImage, setShowDemoImage] = useState(true);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((croppedArea: CropArea, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = useCallback((file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }

    setError('');
    setShowDemoImage(false); // Hide demo image when user uploads
    const reader = new FileReader();
    reader.addEventListener('load', () => setImageSrc(reader.result as string));
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragActive(false);
      const file = e.dataTransfer.files[0];
      handleFileChange(file);
    },
    [handleFileChange],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileChange(file);
    },
    [handleFileChange],
  );

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

  const resetImage = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAspectRatioChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setAspectRatio(value === '' ? null : parseFloat(value));
  };

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

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!imageSrc ? (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={8} alignItems="center">
          {showDemoImage && (
            <Box flex={1} sx={{ order: { xs: 2, md: 1 } }}>
              <DemoImageContainer>
                <DemoImage src="https://pastatic.picsart.com/cms-pastatic/fdddd077-f0b2-4011-8025-4f2469de9b92.png?type=webp&to=min&r=1200&q=90" alt="Demo image for cropping" />
              </DemoImageContainer>
            </Box>
          )}
          <Box flex={1} display="flex" justifyContent="center" alignItems="center" sx={{ order: { xs: 1, md: 2 } }}>
            <UploadArea
              isDragActive={isDragActive}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: { xs: '100%', md: 500 },
                minHeight: { xs: 250, md: 400 },
                width: '100%',
                maxWidth: { xs: '100%', md: 600 },
              }}
            >
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drag & drop your image here
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                or click to select from your device
              </Typography>
              <Button variant="contained" startIcon={<CloudUpload />}>
                Choose Image
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Supports: JPG, PNG, GIF (Max 10MB)
              </Typography>
              <HiddenInput ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} />
            </UploadArea>
          </Box>
        </Box>
      ) : (
        <Box>
          <CropContainer>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio || undefined}
              rotation={rotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          </CropContainer>

          <ControlsContainer>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3} alignItems="center">
              <Box flex={1} sx={{ width: { xs: '100%', md: 'auto' } }}>
                <Typography gutterBottom>Zoom</Typography>
                <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, value) => setZoom(value as number)} />
              </Box>

              <Box flex={1} sx={{ width: { xs: '100%', md: 'auto' } }}>
                <Typography gutterBottom>Rotation</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton onClick={() => setRotation(rotation - 90)}>
                    <RotateLeft />
                  </IconButton>
                  <Slider value={rotation} min={-180} max={180} step={1} onChange={(_, value) => setRotation(value as number)} sx={{ mx: 1 }} />
                  <IconButton onClick={() => setRotation(rotation + 90)}>
                    <RotateRight />
                  </IconButton>
                </Box>
              </Box>

              <Box flex={1} sx={{ width: { xs: '100%', md: 'auto' }, minWidth: { xs: '200px', md: 'auto' } }}>
                <FormControl fullWidth sx={{ minHeight: { xs: '56px', md: 'auto' } }}>
                  <InputLabel sx={{ fontSize: { xs: '1rem', md: '0.875rem' } }}>Aspect Ratio</InputLabel>
                  <Select
                    value={aspectRatio?.toString() || ''}
                    label="Aspect Ratio"
                    onChange={handleAspectRatioChange}
                    sx={{
                      height: { xs: '56px', md: 'auto' },
                      fontSize: { xs: '1rem', md: '0.875rem' },
                    }}
                  >
                    {aspectRatios.map(ratio => (
                      <MenuItem key={ratio.label} value={ratio.value?.toString() || ''}>
                        {ratio.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box display="flex" gap={1} sx={{ width: { xs: '100%', md: 'auto' }, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Button variant="contained" startIcon={<Download />} onClick={handleDownload} disabled={!croppedAreaPixels}>
                  Download
                </Button>
                <Button variant="outlined" onClick={resetImage}>
                  New Image
                </Button>
              </Box>
            </Box>
          </ControlsContainer>
        </Box>
      )}

      <ValueItemisation />
      <HowTo />
      <FAQ />
    </StyledContainer>
  );
};

export default CropImage;
