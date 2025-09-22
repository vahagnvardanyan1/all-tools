import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DemoImagePreviewResizeProps {
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

const DemoImagePreviewResize: React.FC<DemoImagePreviewResizeProps> = ({ show }) => {
  if (!show) return null;

  return (
    <DemoImageContainer>
      <DemoImage src="https://pastatic.picsart.com/cms-pastatic/d9087e1d-8802-4a43-8587-c30d9f877b8b.png?type=webp&to=min&r=1200&q=90" alt="Demo image for resizing" loading="lazy" />
    </DemoImageContainer>
  );
};

export default DemoImagePreviewResize;
