import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const EditorContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  marginBottom: theme.spacing(8),
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(4),
  minHeight: '500px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: '0 0 55%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    flex: '1',
  },
}));

const EditorImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  height: 'auto',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('md')]: {
    maxWidth: '400px',
  },
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: '0 0 40%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    flex: '1',
    textAlign: 'center',
    gap: theme.spacing(1.5),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 700,
  color: '#1f2937',
  lineHeight: 1.2,
  marginBottom: theme.spacing(2),
  letterSpacing: '-0.02em',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.25rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#6b7280',
  lineHeight: 1.8,
  fontWeight: 400,
  marginBottom: 0,
  [theme.breakpoints.down('md')]: {
    fontSize: '0.95rem',
  },
}));

interface EditorPreviewProps {
  imageSrc?: string;
  title?: string;
  description?: string;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({
  imageSrc = '/images/editor.jpg',
  title = 'Crop, cut, clip',
  description = "Get flawlessly cropped photos every time with Canva. Skip the guesswork and crop to a range of aspect ratios to effortlessly tailor your images. Make a perfect square clip, go for the classic 3:2, or find your own fit. While you're at it, quickly rotate your image with a slider or precise degree input to change its orientation. Now, you can nail that perfect Facebook cover or YouTube thumbnail.",
}) => {
  return (
    <EditorContainer>
      <LeftPanel>
        <EditorImage src={imageSrc} alt="Image editor interface" loading="eager" crossOrigin="anonymous" />
      </LeftPanel>

      <RightPanel>
        <Box>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Box>
      </RightPanel>
    </EditorContainer>
  );
};

export default EditorPreview;
