import React from 'react';
import { Box, Typography } from '@mui/material';

interface TitleProps {
  mainText: string;
  highlightText: string;
}

const Title: React.FC<TitleProps> = ({ mainText, highlightText }) => {
  return (
    <Typography
      variant="h1"
      sx={{
        textAlign: 'center',
        fontWeight: 900,
        letterSpacing: '-0.02em',
        fontSize: { xs: '2rem', md: '2.8125rem' },
        lineHeight: 1.1,
        color: '#0B1220',
      }}
    >
      {mainText}{' '}
      <Box
        component="span"
        sx={{
          background: 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {highlightText}
      </Box>
      .
    </Typography>
  );
};

export default Title;
