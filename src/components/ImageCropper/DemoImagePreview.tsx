import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DemoImagePreviewProps {
  show: boolean;
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

const DemoImagePreview: React.FC<DemoImagePreviewProps> = ({ show }) => {
  if (!show) return null;

  return (
    <DemoImageContainer>
      <DemoImage src="https://pastatic.picsart.com/cms-pastatic/fdddd077-f0b2-4011-8025-4f2469de9b92.png?type=webp&to=min&r=1200&q=90" alt="Demo image for cropping" loading="lazy" />
    </DemoImageContainer>
  );
};

export default DemoImagePreview;
