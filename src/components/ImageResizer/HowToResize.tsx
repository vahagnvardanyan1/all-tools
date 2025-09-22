import React from 'react';
import { Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload, PhotoSizeSelectLarge, Tune, AspectRatio, CropFree, Download, CheckCircle } from '@mui/icons-material';

const HowToContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(4),
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
}));

const StyledVideo = styled('video')({
  width: '100%',
  height: 'auto',
  display: 'block',
});

const StepCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: 80,
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    height: 100,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    height: 200,
  },
}));

const StepIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginBottom: 0,
  fontSize: 20,
  transition: 'all 0.3s ease-in-out',
  flexShrink: 0,
  [theme.breakpoints.down('md')]: {
    width: 50,
    height: 50,
    fontSize: 22,
  },
  '.step-card:hover &': {
    width: 60,
    height: 60,
    fontSize: 24,
    marginBottom: theme.spacing(2),
  },
}));

const StepNumber = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '0.875rem',
  zIndex: 2,
}));

const HoverContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 0,
  transform: 'translateY(100%)',
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
  '.step-card:hover &': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

const steps = [
  {
    icon: <CloudUpload />,
    title: 'Open image resizer',
    description: 'Use the button below to go to Picsart Photo Editor',
    details: ['Click on the upload area', 'Drag and drop your image', 'Select from your device'],
  },
  {
    icon: <PhotoSizeSelectLarge />,
    title: 'Upload a photo',
    description: 'Upload a photo or several photos you want to resize.',
    details: ['Supports JPG, PNG, and GIF formats', 'Maximum file size: 10MB', 'Works with photos, graphics, and screenshots'],
  },
  {
    icon: <Tune />,
    title: 'Pick a size',
    description: 'Select Resize from the left sidebar and set a custom size.',
    details: ['Enter custom width and height', 'Choose from preset sizes', 'Maintain aspect ratio option'],
  },
  {
    icon: <AspectRatio />,
    title: 'Resize image',
    description: 'Adjust the image to the new size by dragging its corners. Click the apply button. Then, use the Apply button to save.',
    details: ['Real-time preview of changes', 'Maintain quality during resize', 'Apply button to confirm changes'],
  },
  {
    icon: <CropFree />,
    title: 'Change canvas size',
    description: 'Click on an empty space in the editor to deselect your photo, and use the Canvas Crop button on top to edit canvas size.',
    details: ['Adjust canvas dimensions', 'Crop to specific aspect ratios', 'Fine-tune the final output'],
  },
  {
    icon: <Download />,
    title: 'Save',
    description: 'Use the Download button on the top right corner to download your resized image.',
    details: ['High-quality output', 'Instant download', 'Ready to use immediately'],
  },
];

const HowToResize: React.FC = () => {
  return (
    <HowToContainer>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '1.75rem', md: '3rem' } }}>
          How to Use the Image Resizer
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Follow these simple steps to resize your images professionally in just a few clicks
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={6} alignItems={{ xs: 'center', md: 'center' }} sx={{ minHeight: { md: '400px' } }}>
        <Box
          flex={1}
          sx={{
            order: { xs: 2, md: 1 },
            width: '100%',
            mx: { xs: 'auto', md: 0 },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <VideoContainer sx={{ width: '100%' }}>
            <StyledVideo autoPlay loop muted playsInline poster="https://pastatic.picsart.com/cms-pastatic/1d739fd1-bc0d-40b4-a247-cc208561f3c1.png?type=webp&to=min&r=-1" preload="metadata">
              <source src="https://pastatic.picsart.com/cms-pastatic/1594a2da-c5c7-4e33-906b-736e32d069e4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </StyledVideo>
          </VideoContainer>
        </Box>

        <Box flex={1} sx={{ order: { xs: 1, md: 2 }, display: 'flex', alignItems: 'center', width: { xs: '100%', md: 'auto' } }}>
          <Box display="flex" flexDirection="column" gap={4} sx={{ width: '100%' }}>
            {steps.map((step, index) => (
              <StepCard className="step-card" key={index}>
                <CardContent
                  sx={{
                    position: 'relative',
                    textAlign: 'center',
                    p: 2,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    gap: { xs: 1, md: 3 },
                  }}
                >
                  <StepNumber>{index + 1}</StepNumber>
                  <StepIcon sx={{ flexShrink: 0, mb: { xs: 1, md: 0 } }}>{step.icon}</StepIcon>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      flex: 1,
                      textAlign: { xs: 'center', md: 'left' },
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      transition: 'all 0.3s ease-in-out',
                      '.step-card:hover &': {
                        fontSize: { xs: '1.1rem', md: '1.5rem' },
                      },
                    }}
                  >
                    {step.title}
                  </Typography>

                  <HoverContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ textAlign: 'center', mb: 1, fontSize: '0.8rem' }}>
                      {step.description}
                    </Typography>
                    <List dense sx={{ width: '100%' }}>
                      {step.details.map((detail, detailIndex) => (
                        <ListItem key={detailIndex} sx={{ px: 0, py: 0.25 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <CheckCircle sx={{ fontSize: 14, color: 'inherit' }} />
                          </ListItemIcon>
                          <ListItemText primary={detail} primaryTypographyProps={{ fontSize: '0.7rem', color: 'inherit' }} />
                        </ListItem>
                      ))}
                    </List>
                  </HoverContent>
                </CardContent>
              </StepCard>
            ))}
          </Box>
        </Box>
      </Box>

      <Box textAlign="center" mt={6}>
        <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          💡 <strong>Pro Tip:</strong> For best results, use high-resolution images and experiment with different sizes to find the perfect dimensions for your needs.
        </Typography>
      </Box>
    </HowToContainer>
  );
};

export default HowToResize;
