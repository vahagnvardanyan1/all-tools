import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CheckCircle, CloudUpload, CropRotate, Tune, Download, PhotoSizeSelectLarge, AspectRatio, CropFree } from '@mui/icons-material';

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

interface HowToStep {
  iconName: string;
  title: string;
  description: string;
  details: string[];
}

const iconMap: Record<string, React.ReactNode> = {
  CloudUpload: <CloudUpload />,
  CropRotate: <CropRotate />,
  Tune: <Tune />,
  Download: <Download />,
  PhotoSizeSelectLarge: <PhotoSizeSelectLarge />,
  AspectRatio: <AspectRatio />,
  CropFree: <CropFree />,
};

interface HowToProps {
  steps: HowToStep[];
  title: string;
  subtitle: string;
  videoSrc: string;
  videoPoster: string;
  proTip?: string;
}

const HowTo: React.FC<HowToProps> = ({ steps, title, subtitle, videoSrc, videoPoster, proTip }) => {
  return (
    <HowToContainer>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '1.75rem', md: '3rem' } }}>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          {subtitle}
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={6} alignItems={{ xs: 'center', md: 'center' }} sx={{ minHeight: { md: '400px' } }}>
        <Box
          flex={1}
          sx={{
            order: { xs: 2, md: 1 },
            width: '100%',
            // maxWidth: { xs: '300px', md: '100%' },
            mx: { xs: 'auto', md: 0 },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <VideoContainer sx={{ width: '100%' }}>
            <StyledVideo autoPlay loop muted playsInline poster={videoPoster} preload="metadata">
              <source src={videoSrc} type="video/mp4" />
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
                  <StepIcon sx={{ flexShrink: 0, mb: { xs: 1, md: 0 } }}>{iconMap[step.iconName]}</StepIcon>
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

      {proTip && (
        <Box textAlign="center" mt={6}>
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            💡 <strong>Pro Tip:</strong> {proTip}
          </Typography>
        </Box>
      )}
    </HowToContainer>
  );
};

export default HowTo;
