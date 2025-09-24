import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DemoImagePreviewProps {
  show: boolean;
  imageSrc: string;
  altText: string;
}

const DemoImageContainer = styled(Box)({
  overflow: 'hidden',
});

const DemoImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  display: 'block',
});

const DemoImagePreview: React.FC<DemoImagePreviewProps> = ({ show, imageSrc, altText }) => {
  if (!show) return null;

  return (
    <DemoImageContainer>
      <DemoImage src={imageSrc} alt={altText} loading="lazy" fetchPriority="high" />
    </DemoImageContainer>
  );
};

export default DemoImagePreview;
