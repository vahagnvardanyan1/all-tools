import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HowToContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  maxWidth: '800px',
  margin: '0 auto',
}));

const StepItem = styled(Box)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  borderLeft: `4px solid ${isActive ? theme.palette.primary.main : '#e0e0e0'}`,
  paddingLeft: theme.spacing(3),
  paddingTop: theme.spacing(3),
  paddingBottom: isActive ? theme.spacing(6) : theme.spacing(3),
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.6s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: isActive ? '#f8f9fa' : 'transparent',
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: '#1f2937',
  marginBottom: theme.spacing(1),
}));

const StepDescription = styled(Typography)({
  fontSize: '1rem',
  color: '#6b7280',
  lineHeight: 1.6,
});

const StepDetails = styled(Box)<{ isVisible?: boolean }>(({ theme, isVisible }) => ({
  marginTop: theme.spacing(2),
  opacity: isVisible ? 1 : 0,
  maxHeight: isVisible ? '200px' : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
  transition: 'all 0.6s ease-in-out',
  overflow: 'hidden',
}));

const DetailsList = styled('ul')(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(2),
  color: '#6b7280',
  '& li': {
    marginBottom: theme.spacing(0.5),
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
}));

const CropImageLink = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#fff',
  backgroundColor: '#8b5cf6',
  cursor: 'pointer',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 3),
  borderRadius: '50px',
  display: 'inline-block',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 14px rgba(139, 92, 246, 0.4)',
  '&:hover': {
    backgroundColor: '#7c3aed',
    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.6)',
    transform: 'translateY(-2px)',
  },
}));

interface HowToStep {
  iconName: string;
  title: string;
  description: string;
  details: string[];
}

interface HowToProps {
  steps: HowToStep[];
  title: string;
  subtitle?: string;
  videoSrc?: string;
  videoPoster?: string;
  proTip?: string;
}

const HowTo: React.FC<HowToProps> = ({ steps, title, subtitle, proTip }) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredStep(index);
  };

  const handleMouseLeave = () => {
    setHoveredStep(null);
  };

  const handleCropImageClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <HowToContainer>
      <Box mb={6} textAlign="center">
        <Typography variant="h2" component="h2" sx={{ fontWeight: 700, color: '#1f2937', fontSize: { xs: '2rem', md: '2.5rem' }, marginBottom: subtitle ? 2 : 4 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={{ width: '100%', mb: 6 }}>
        {steps.map((step, index) => {
          const isActive = hoveredStep === null ? index === 0 : hoveredStep === index;

          return (
            <StepItem key={index} isActive={isActive} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
              <StepDetails isVisible={isActive}>
                <DetailsList>
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </DetailsList>
              </StepDetails>
            </StepItem>
          );
        })}
      </Box>

      <Box textAlign="center">
        <CropImageLink onClick={handleCropImageClick}>Crop image</CropImageLink>
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
